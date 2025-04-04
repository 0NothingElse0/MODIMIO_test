import userServiceBase from "../services/userServiceBase.js";
import dotenv from "dotenv";
import responseServiceBase from "../services/responseServiceBase.js";
import { UserDto } from "../models/userDto.js";
import { User } from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import {NextFunction} from "express";

dotenv.config();

export class UserControllerBase {
  register = catchAsync(async (req : any, res : Response, next : NextFunction) => {
    req.errorMsg = `Error to register user "${req.body.username}"`;
    req.result = req.body;
    const user = new User({ ...req.body, role: "user", isActivate: false });
    const result = await userServiceBase.register(user);

    responseServiceBase.response200(res, result);

  });

  login = catchAsync(async (req : any, res : Response, next : NextFunction) => {
    req.errorMsg = `Error to login user ${req.body.username}`;
    req.result = req.body;

    const user = new User(req.body);
    const result = await userServiceBase.login(user);

    responseServiceBase.response200(res, result);
  });

  getUser = catchAsync(async (req : any, res : Response, next : NextFunction) => {
    req.errorMsg = `Error to get user ID "${req.user.id}"`;
    req.result = req.user;

    const id = req.user.id;
    const user = new UserDto(await userServiceBase.getUser(id));

    responseServiceBase.response200(res, { user: user });
  });

  logout = catchAsync(async (req : any, res : Response, next : NextFunction) => {
    req.errorMsg = `Error to logout user ID "${req.user.id}"`;
    req.result = req.user;

    const id = req.user.id;

    await userServiceBase.logout(id);

    responseServiceBase.response200(res, {
      message: "logout successfully",
    });
  });

  refresh = catchAsync(async (req : any, res : Response, next : NextFunction) => {
    req.errorMsg = `Error to refresh token "${req.headers.authorization}"`;
    req.result = `"${req.headers.authorization}"`;

    let refreshToken = req.headers.authorization;

    const tokens = await userServiceBase.refresh(refreshToken);

    responseServiceBase.response200(res, { tokens: tokens });
  });
}

export default new UserControllerBase();
