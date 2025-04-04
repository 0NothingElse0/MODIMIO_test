import responseServiceBase from "../services/responseServiceBase.js";
import tokenServiceBase from "../services/tokenServiceBase.js";
import apiError from "../exceptions/apiError.js";

export default async function verifyUserToken(req, res, next) {
  let token = req.headers.authorization;
  if (!token) return responseServiceBase.response401(res);

  try {
    token = token.split(" ")[1];

    if (token === "null" || !token) return responseServiceBase.response401(res);

    let verifiedUser = tokenServiceBase.verifyAccessToken(token);
    const findedToken = await tokenServiceBase.findAccessToken(token);
    if (!findedToken) {
      throw apiError.UnauthorizedError();
    }
    if (!verifiedUser) return responseServiceBase.response401(res);
    if(!Number.isInteger(verifiedUser['id'])){
      return responseServiceBase.response400(res, "Id must be a number");
    }
    
    req.user = verifiedUser;
    next();
  } catch (error) {
    return responseServiceBase.response401(res);
  }
}
