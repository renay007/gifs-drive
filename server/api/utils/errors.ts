type ErrorType = {
  success?: boolean;
  code: string;
  message: string;
};

export class CustomError extends Error {
  constructor(private error: ErrorType) {
    super(error.message);
  }

  public toJson() {
    return {
      success: false,
      code: this.error.code,
      message: this.message,
      data: null,
    };
  }
}

export class ValidationError extends CustomError {
  constructor(error: ErrorType, message?: string) {
    super({
      code: "@validation/" + error.code,
      message: message || error.message,
    });
  }
}

export class AuthError extends CustomError {
  constructor(error: ErrorType, message?: string) {
    super({
      code: "@auth/" + error.code,
      message: message || error.message,
    });
  }
}

export class HttpError extends CustomError {
  constructor(error: ErrorType, message?: string) {
    super({
      code: "@http/" + error.code,
      message: message || error.message,
    });
  }
}

export class ValidationErrorCode {
  public static MISSING_REQUIRED_INFO = {
    code: "missing-required-info",
    message: "Please provide all required info.",
  };
  public static EMPTY_STRING = {
    code: "empty-string",
    message: "The field provided should be a non-empty string.",
  };
  public static INVALID_EMAIL = {
    code: "invalid-email",
    message: "The email provided is invalid. Please provide a valid email.",
  };
  public static WEAK_PASSWORD = {
    code: "weak-password",
    message:
      "The password provided is too weak. Please provide a stronger password.",
  };
}

export class HttpErrorCode {
  public static BAD_REQUEST = {
    code: "bad-request",
    message: "Bad Request",
  };
  public static UNAUTHORIZED = {
    code: "unauthorized",
    message: "Unauthorized",
  };
  public static FORBIDDEN = {
    code: "forbidden",
    message: "Forbidden",
  };
  public static NOT_FOUND = {
    code: "not-found",
    message: "Not Found",
  };
  public static INTERNAL_ERROR = {
    code: "internal-error",
    message: "An internal error has occurred.",
  };
}

export class AuthErrorCode {
  public static EMAIL_ALREADY_EXISTS = {
    code: "email-already-exists",
    message:
      "The email provided is already being used. Please provide a new email.",
  };
  public static TOKEN_EXPIRED = {
    code: "token-expired",
    message: "The token provided is expired. Please try again",
  };
  public static INVALID_TOKEN = {
    code: "invalid-token",
    message: "The token provided is not valid.",
  };
  public static USER_NOT_FOUND = {
    code: "user-not-found",
    message: "User not found. Please try again.",
  };
  public static WRONG_PASSWORD = {
    code: "wrong-password",
    message: "Wrong password. Please try again.",
  };
  public static INTERNAL_ERROR = {
    code: "internal-error",
    message: "An internal error has occurred.",
  };
}
