import adminServiceBase from "../services/adminServiceBase.js";
import responseServiceBase from "../services/responseServiceBase.js";
import { pagginate } from "../helpers/pagginationHelper.js";
import catchAsync from "../utils/catchAsync.js";
import usersDbServiceBase from "../services/dbServicesBase/usersDbServiceBase.js";
import {NextFunction} from "express";

export class AdminControllerBase {
  getAllUsers = catchAsync(async (req : any, res : Response, next : NextFunction) => {
    req.errorMsg = `Error to get users by admin ID ${req.user.id}`;
    req.result = req.user;

    const { page, limit, query } = pagginate(req);

    const userList = await adminServiceBase.getAllUsers(page, limit, query);
    const totalCount = await usersDbServiceBase.countUsers();

    responseServiceBase.response200(res, {
      users: userList,
      page: page,
      limit: limit,
      totalCount: totalCount,
      currentCount: userList.length,
    });
  });
}

export default new AdminControllerBase();
