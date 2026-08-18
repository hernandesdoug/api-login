import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error.js';
export const errorMiddleware = (
  error: AppError | Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error);

  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const message = error.message || 'Internal server error';
  return response.status(statusCode).json({
    message,
    type: 'error',
  });
};
