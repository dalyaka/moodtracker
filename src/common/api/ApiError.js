export default class ApiError extends Error {
  constructor(message, httpStatus = 500) {
    super(message);
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ApiError);
    } else {
      this.stack = new Error(message).stack;
    }
    this.name = 'ApiError';
    this.httpStatus = httpStatus;
  }
}
