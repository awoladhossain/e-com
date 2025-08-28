export const successResponse = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, statusCode, message, error = null) => {
  console.error("Error:", error); // for server logs only
  return res.status(statusCode).json({
    success: false,
    message, // human-friendly message
    error: error ? error.message : null, // developer-focused error detail
  });
};

