class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.type = 'error';
  }
}

module.exports = AppError;
