class HttpError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HttpError'; // Optional: gives a specific name to the error
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpError;
