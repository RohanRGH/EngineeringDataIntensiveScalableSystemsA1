// utils/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // Get status code from error object or default to 500
    const statusCode = err.statusCode || 500;
    
    // Get error message or provide default
    const message = err.message || 'Internal Server Error';
    
    console.error(`Error: ${statusCode} - ${message}`);
    if (err.stack) {
      console.error(err.stack);
    }
  
    // If headers already sent, delegate to Express's default error handler
    if (res.headersSent) {
      return next(err);
    }
  
    // Send error response
    res.status(statusCode).json({
      status: 'error',
      message: message,
      // Only include stack trace in development environment
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  module.exports = { errorHandler };
  