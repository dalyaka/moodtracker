class ApiError extends Error {
  constructor(error, httpStatus = 500) {
    super();
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ApiError);
    } else {
      this.stack = new Error(error).stack;
    }
    this.name = 'ApiError';
    this.error = error;
    this.httpStatus = httpStatus;
  }

  static forbidden(message) {
    return new ApiError(message, 403);
  }
}

const setErrorResponse = (res, error, status = 500) => {
  res.status(status).json({ error });
};

function handleApiError(error, res, customStatus = 500) {
  if (!error) {
    setErrorResponse(res, 'Internal server error');
  } else if (error.name === 'ApiError') {
    res.status(error.httpStatus).json({ error: error.error });
  } else {
    setErrorResponse(res, error.message, customStatus);
  }
}

module.exports = { setErrorResponse, handleApiError, ApiError };
