import responseServiceBase from "../../services/responseServiceBase.js";
import {NextFunction} from "express";
import {Schema} from "joi";

export async function validate(req, res, next, schema) {
  let data = req.body;

  if (!data) return responseServiceBase.response400(res, "Bad request");

  try {
    const options = {
      errors: {
        wrap: {
          label: "",
        },
      },
    };

    let verifiedData = await schema.validateAsync(data, options);

    if (!verifiedData)
      return responseServiceBase.response400(res, "Bad request");

    next();
  } catch (error) {
    return responseServiceBase.response400(
      res,
      error.details[0].message.charAt(0).toUpperCase() + error.details[0].message.slice(1)
    );
  }
}
