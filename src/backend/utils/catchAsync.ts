import apiError from "../exceptions/apiError.js";
import responseServiceBase from "../services/responseServiceBase.js";

export default (fn : any) => (req, res, next) =>
  fn(req, res, next).catch((e : any) => {
    console.log(e);

    if (e.errno === 1054) e = apiError.BadRequest(e.sqlMessage);

    responseServiceBase.responseError(res, e.status, e.message);
  });
