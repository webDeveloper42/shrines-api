const isProd = () => process.env.NODE_ENV === "production";

const errorHandler = (err, req, res, _next) => {
  const status = err.statusCode || err.status || 500;

  if (status >= 500) {
    console.error(
      `[${new Date().toISOString()}] ERROR ${status} ${req.method} ${req.originalUrl}`,
      isProd() ? err.message : err
    );
  }

  res.status(status).json({
    error: isProd() && status === 500 ? "Internal server error" : err.message,
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
};

module.exports = { errorHandler, notFoundHandler };
