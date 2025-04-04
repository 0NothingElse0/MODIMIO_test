import { UserDto } from "../models/userDto.js";
import usersDbServiceBase from "./dbServicesBase/usersDbServiceBase.js";


export class AdminServiceBase {
  async getAllUsers(page : number, limit : number, query?) {
    const userList = (await usersDbServiceBase.getAllUser(page, limit, query)).data;
    return userList.map((user : UserDto) => new UserDto(user));
  }

}

export default new AdminServiceBase();
