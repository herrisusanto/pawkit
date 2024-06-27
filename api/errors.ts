// Base custom error class
export class CustomError extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Specific custom error types

export class BadRequestError extends CustomError {
  constructor(message: string = "Bad Request", details?: any) {
    super(message, 400, details);
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string = "Authentication Failed", details?: any) {
    super(message, 401, details);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = "Unauthorized", details?: any) {
    super(message, 401, details);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = "Forbidden", details?: any) {
    super(message, 403, details);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = "Not Found", details?: any) {
    super(message, 404, details);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string = "Conflict", details?: any) {
    super(message, 409, details);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = "Internal Server Error", details?: any) {
    super(message, 500, details);
  }
}

export class InvalidResponseError extends CustomError {
  constructor(message: string = "Invalid Response", details?: any) {
    super(message, 502, details);
  }
}

export class ServiceUnavailableError extends CustomError {
  constructor(message: string = "Service Unavailable", details?: any) {
    super(message, 503, details);
  }
}
