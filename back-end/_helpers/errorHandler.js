const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  res.status(err.status || 500);
  res.json({ message: err.message, ...err });

  return "Something went wrong with the error handler.";
};

export default errorHandler;
