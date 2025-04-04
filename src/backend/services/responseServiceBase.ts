export class ResponseServiceBase {
  response200(res : any, data : any) {
    this.response(res, 200, true, null, data);
  }

  response500(res : any, data : any) {
    res.status(500).json(data);
  }

  response400(res : any, data : any) {
    this.response(res, 400, false, data, null);
  }

  response204(res : any, message : string) {
    if(!message)
      message = "No content"
    this.response(res, 204, true, message, null)
  }

  response404(res : any, message : string) {
    if(!message)
      message = "Not found"
    this.response(res, 404, false, message, null)
  }

  response401(res : any) {
    this.response(res, 401, false, "Unauthorized", null)
  }

  responseError(res : any, status : any, message : string) {
    this.response(res, status, false, message, null);
  }

  response(res : any, status : any, success : boolean, message : string, data : any) {
    if (!status) status = 500;

    const result = {
      status: success ? "success": "error",
      message: message,
      data: data
    };
    
    res.status(status).json(result);
  }
}

export default new ResponseServiceBase();
