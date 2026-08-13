const appError = require('../errors/app.error');

const errorMiddleware = (error, request, response, next) => {
  console.error(error);

  return response.status(error.statusCode || 500).json({
    message: error.message || 'Internal server error',
    type: 'error',
  });
};

module.exports = errorMiddleware;
