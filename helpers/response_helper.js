module.exports = class ResponseHelper {
  /**
   * Generic responses
   */

  // send validation error response
  static validationResponse(res, errors) {
      const statusCode = 422;
    const response = {
        message: "Validation error!",
        errors: errors
      };
    if(!('status' in res)) {
        response.status = statusCode;
        return res(response);
    }
    return res.status(statusCode).json(response);
  }

  static response500(res, data = null, message = "Internal Server Error") {
    const statusCode = 500;
    const response = {};

    response.message = message;
    if (data) {
      response.data = data;
    }
    if(!('status' in res)) {
        response.status = statusCode;
        return res(response);
    }
    return res.status(statusCode).json(response);
  }

  static response200(res, data = null, message = "Ok") {
    const statusCode = 200;
    const response = {};

    response.message = message;
    if (data) {
      response.data = data;
    }
    if(!('status' in res)) {
        response.status = statusCode;
        return res(response);
    }
    return res.status(statusCode).json(response);
  }

  static response400(res, errors = null, message = "Bad Request") {
    const statusCode = 400;
    const response = {};

    response.message = message;
    if (errors) {
      response.errors = errors;
    }

    if(!('status' in res)) {
        response.status = statusCode;
        return res(response);
    }
    return res.status(statusCode).json(response);
  }

  static response401(res, errors = null, message = "Unauthenticated") {
    const statusCode = 401;
    const response = {};

    response.message = message;
    if (errors) {
      response.errors = errors;
    }

    if(!('status' in res)) {
        response.status = statusCode;
        return res(response);
    }
    return res.status(statusCode).json(response);
  }

  static response403(res, errors = null, message = "Forbidden") {
    const statusCode = 403;
    const response = {};

    response.message = message;
    if (errors) {
      response.errors = errors;
    }

    if(!('status' in res)) {
        response.status = statusCode;
        return res(response);
    }
    return res.status(statusCode).json(response);
  }

  static response404(res, errors = null, message = "Not found") {
    const statusCode = 404;
    const response = {};

    response.message = message;
    if (errors) {
      response.errors = errors;
    }

    if(!('status' in res)) {
        response.status = statusCode;
        return res(response);
    }
    return res.status(statusCode).json(response);
  }

  static response422(res, errors = null, message = "Unprocessable entity!") {
    const statusCode = 422;
    const response = {};

    response.message = message;
    if (errors) {
      response.errors = errors;
    }

    if(!('status' in res)) {
        response.status = statusCode;
        return res(response);
    }
    return res.status(statusCode).json(response);
  }
};
