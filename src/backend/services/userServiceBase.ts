import tokenServiceBase from "./tokenServiceBase.js";
import bcrypt from "bcrypt";
import apiError from "../exceptions/apiError.js";
import { tokenPayload } from "../models/tokenPayloadModel.js";
import tokensHelper from "../helpers/tokensHelper.js";
import { UserDto } from "../models/userDto.js";
import usersDbServiceBase from "./dbServicesBase/usersDbServiceBase.js";
import tokensDbServiceBase from "./dbServicesBase/tokensDbServiceBase.js";
import {User} from "../models/userModel.js";

export class UserServiceBase {
  async register(user: User) {
    user.password = await bcrypt.hash(
        user.password,
        +process.env.PASSWORD_SALT
    );
    const createdUser = new UserDto(await usersDbServiceBase.createUser(user));
    let payload = new tokenPayload({id: createdUser.id});
    const token = await tokensHelper.signAndRefreshToken(
        payload,
        createdUser.id
    );
    return {tokens: token, user: createdUser};
  }

  async login(user: User) {
    let findedUser = await usersDbServiceBase.getUser(user);
    if (!findedUser)
      throw apiError.BadRequest("The user was not found");
    
    const isPassEquals = await bcrypt.compare(
        user.password,
        findedUser.password
    );

    if (!isPassEquals)
      throw apiError.BadRequest("The password or login/email is incorrect");

    findedUser = new UserDto(findedUser);

    const payload = new tokenPayload({id: findedUser.id});
    const tokens = await tokensHelper.signAndRefreshToken(
        payload,
        findedUser.id
    );
    return {tokens, user: findedUser};
  }

  async getUser(id: number) {
    const user = await usersDbServiceBase.getUserById(id);
    if (!user) throw apiError.BadRequest(`The user with ${id} was not found`);
    return user;
  }

  async logout(id: number) {
    await tokensDbServiceBase.deleteRefreshToken(id);
    await tokensDbServiceBase.deleteAccessToken(id);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken)
      throw apiError.BadRequest("The refresh token must be defined");

    refreshToken = refreshToken.split(" ")[1];

    if (!refreshToken)
      throw apiError.BadRequest("The refresh token must be defined");

    const verifiedToken = tokenServiceBase.verifyRefreshToken(refreshToken);
    const payload = new tokenPayload({id: verifiedToken['id']});
    const findedToken = await tokenServiceBase.findRefreshToken(refreshToken);
    const findedUser = new UserDto(await this.getUser(payload.id));

    if (!payload || !findedToken) {
      throw apiError.UnauthorizedError();
    }

    const tokens = await tokensHelper.signAndRefreshToken(
        payload,
        verifiedToken['id']
    );
    return {...tokens, user: findedUser};
  }

}

export default new UserServiceBase();
