import Joi from "joi";
import userRolesConfing from "../../configs/userRolesConfing.js";
import { validate } from "./validation.js";

const registerSchemaBase = Joi.object({
  id: Joi.number(),
  login: Joi.string().alphanum().min(1).max(30),
  password: Joi.string().min(8),
  email: Joi.string().email()
});

const loginSchemaBase = Joi.object({
  id: Joi.number(),
  login: Joi.string().alphanum().min(1).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(8).required(),
});

export async function validateRegisterUserBase(req, res, next) {
  validate(req, res, next, registerSchemaBase);
}

export async function validateLoginUserBase(req, res, next) {
  validate(req, res, next, loginSchemaBase);
}