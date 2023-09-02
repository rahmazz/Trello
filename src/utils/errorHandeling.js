import { StatusCodes } from "http-status-codes";

export const asyncHandeller = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((error) => {
      return next(new Error(error, { cause: 500 }));
      // =return next(new Error(err, { cause: StatusCodes.INTERNAL_SERVER_ERROR}));
    });
  };
};

export const globalErrorHandelling = (error, req, res, next) => {
  return res.status(error.cause || 500 ).json({
    msgError: error.message,
    stack: error.stack,
  });
};
