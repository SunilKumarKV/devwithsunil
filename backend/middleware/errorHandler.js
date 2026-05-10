const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const isServerError = status >= 500;
  const message = isServerError
    ? process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error"
    : err.message || "Internal server error";
  const stack = process.env.NODE_ENV === "production" ? undefined : err.stack;

  logger.error("Unhandled error", {
    status,
    message: err.message,
    path: req.originalUrl,
    method: req.method,
    stack,
  });

  return res.status(status).json({
    status: "error",
    message,
    errors: process.env.NODE_ENV === "production" ? null : err.errors || null,
    stack,
  });
};
