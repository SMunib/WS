const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error stack to the console or a logging service

  // Determine the error type and set appropriate status code and message
  if (err.name === "ValidationError") {
    // Handle Joi validation errors
    return res.status(400).json({
      status: "error",
      message: err.details.map((detail) => detail.message).join(", "),
    });
  }

  if (err.name === "CastError") {
    // Handle invalid ObjectId errors (e.g., MongoDB)
    return res.status(400).json({
      status: "error",
      message: "Invalid ID format",
    });
  }

  if (err.name === "SequelizeDatabaseError") {
    // Handle Sequelize database errors
    return res.status(500).json({
      status: "error",
      message: "Database error occurred",
    });
  }

  // Handle other types of errors
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "An unexpected error occurred",
  });
};

module.exports = errorHandler;
