const responseWithData = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

const ok = (res, data) => {
  return responseWithData(res, 200, data);
};

const created = (res, data) => {
  return responseWithData(res, 201, data);
};

const badRequest = (res, message) => {
  return responseWithData(res, 400, {
    status: 400,
    message,
  });
};

const unauthorized = res => {
  return responseWithData(res, 401, {
    status: 401,
    message: 'Unauthorized',
  });
};

const forbidden = res => {
  return responseWithData(res, 403, {
    status: 403,
    message: 'Forbidden',
  });
};

const notFound = (res, message) => {
  return responseWithData(res, 404, {
    status: 404,
    message,
  });
};

const error = res => {
  return responseWithData(res, 500, {
    status: 500,
    message: 'Oops! Something wrong from server!',
  });
};

export default {
  ok,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  error,
};
