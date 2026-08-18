export class AppError extends Error {
  type = 'error';
  constructor(
    message: string,
    public statusCode: number = 400
  ) {
    super(message);
  }
}
