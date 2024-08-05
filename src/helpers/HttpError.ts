class HttpError extends Error {
  public statusCode: number;

  constructor(statusCode: number, originalMessage: string) {
    const message = originalMessage.replace(/"/g, '');

    super(message);
    this.statusCode = statusCode;
    this.name = 'HttpError'; // Optional: gives a specific name to the error
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpError;
