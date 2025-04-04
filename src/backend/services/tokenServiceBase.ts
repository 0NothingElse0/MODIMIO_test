import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Token } from "../models/tokenModel.js";
import apiError from "../exceptions/apiError.js";
import tokensDbServiceBase from "./dbServicesBase/tokensDbServiceBase.js";
import { tokenConfig } from "../configs/tokenConfig.js";

dotenv.config();

export class TokenServiceBase {
  sign(payload : any) {
    payload = JSON.parse(JSON.stringify(payload));
    const accessToken = jwt.sign(
      payload,
      tokenConfig.accessToken.secret,
      tokenConfig.accessToken.options
    );
    const refreshToken = jwt.sign(
      payload,
      tokenConfig.refreshToken.secret,
      tokenConfig.refreshToken.options
    );

    const token = new Token({
      accessToken,
      refreshToken,
    });
    return token;
  }

  verifyAccessToken(token : string) {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  }

  verifyRefreshToken(token : string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    } catch (e) {
      throw apiError.BadRequest("Invalid token");
    }
  }

  async saveRefreshToken(userId : number, refreshToken : string) {
    await tokensDbServiceBase.addRefreshToken(userId, refreshToken);
  }

  async saveAccessToken(userId : number, accessToken : string) {
    await tokensDbServiceBase.addAccessToken(userId, accessToken);
  }

  async findRefreshToken(refreshToken : string) {
    const findedUser = await tokensDbServiceBase.findUserByRefreshToken(
      refreshToken
    );
    if (!findedUser) throw apiError.UnauthorizedError();
    return findedUser.refreshToken;
  }

  async findAccessToken(accessToken : string) {
    const findedUser = await tokensDbServiceBase.findUserByAccessToken(
        accessToken
    );
    if (!findedUser) throw apiError.UnauthorizedError();
    return findedUser.accessToken;
  }
}

export default new TokenServiceBase();
