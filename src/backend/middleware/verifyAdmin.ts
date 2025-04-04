import { UserDto } from "../models/userDto.js";
import apiError from "../exceptions/apiError.js";
import usersDbServiceBase from "../services/dbServicesBase/usersDbServiceBase.js";
import responseServiceBase from "../services/responseServiceBase.js";
import {NextFunction} from "express";

export default async function verifyAdmin(req, res, next) {
  try {
    const adminId = req.user.id;
    const admin = new UserDto(await usersDbServiceBase.getUserById(adminId));

    if (admin.role !== "admin") throw apiError.ForbiddenError('Forbidden');

    req.admin = admin;
    next();
  } catch (e) {
    responseServiceBase.responseError(res, e.status, e.message);
  }
}
