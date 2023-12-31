import crypto from "crypto";
import { Request } from "express";
import url from "url";

import {
  AuthError,
  AuthErrorCode,
  CustomError,
  ErrorType,
  HttpError,
  HttpErrorCode,
  ValidationError,
  ValidationErrorCode,
} from "./errors";

export type ValidationType = {
  isValid: boolean;
  message?: string;
};

export const validateBody = (
  required: Array<string>,
  object: any
): ValidationType => {
  for (const field of required) {
    if (!(field in object))
      return {
        isValid: false,
        message: `Missing required field: ${field}`,
      };
  }
  return { isValid: true };
};

export const checkForNonEmptyString = (
  fields: Array<string>,
  object: { [key: string]: string }
): ValidationType => {
  for (const field of fields) {
    if (field in object && object[field] === "") {
      return {
        isValid: false,
        message: `${field} must be a non-empty string.`,
      };
    }
  }
  return { isValid: true };
};

export const getFullUrl = (req: Request) => {
  return url.format({
    protocol: req.protocol,
    host: req.hostname,
    pathname: req.originalUrl,
  });
};

export const encrypt = (message: string, secret: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secret), iv);
  let encrypted = cipher.update(message);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const final = iv.toString("hex") + ":" + encrypted.toString("hex");
  return Buffer.from(final).toString("base64");
};

export const decrypt = (message: string, secret: string) => {
  const data = Buffer.from(message, "base64").toString("ascii");
  const messageParts = data.split(":");
  const iv = Buffer.from(messageParts.shift() || "", "hex");
  const encryptedMessage = Buffer.from(messageParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secret),
    iv
  );
  let decrypted = decipher.update(encryptedMessage);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

export const errorMessage = (error: unknown): ErrorType => {
  let message = "";
  if (error instanceof CustomError) {
    return error.toJson();
  } else if (error instanceof Error) {
    message = error.message;
  }
  return new HttpError(HttpErrorCode.INTERNAL_ERROR, message).toJson();
};

export const missingInfo = (message = "") => {
  return new ValidationError(
    ValidationErrorCode.MISSING_REQUIRED_INFO,
    message
  );
};

export const emptyString = (message = "") => {
  return new ValidationError(ValidationErrorCode.EMPTY_STRING, message);
};

export const emailExists = (message = "") => {
  return new AuthError(AuthErrorCode.EMAIL_ALREADY_EXISTS, message);
};

export const invalidFileFormat = (message = "") => {
  return new ValidationError(ValidationErrorCode.INVALID_FILE_FORMAT, message);
};

export const invalidEmail = (message = "") => {
  return new ValidationError(ValidationErrorCode.INVALID_EMAIL, message);
};

export const weakPassword = (message = "") => {
  return new ValidationError(ValidationErrorCode.WEAK_PASSWORD, message);
};

export const userNotFound = (message = "") => {
  return new AuthError(AuthErrorCode.USER_NOT_FOUND, message);
};

export const wrongPassword = (message = "") => {
  return new AuthError(AuthErrorCode.WRONG_PASSWORD, message);
};

export const badRequest = (message = "") => {
  return new HttpError(HttpErrorCode.BAD_REQUEST, message);
};

export const notFound = (message = "") => {
  return new HttpError(HttpErrorCode.NOT_FOUND, message);
};

export const forbidden = (message = "") => {
  return new HttpError(HttpErrorCode.FORBIDDEN, message);
};

export const noUpdate = (data: unknown, message = "") => {
  return {
    success: true,
    message: message || "Nothing to update!",
    data: data || null,
  };
};

export const success = (data: unknown, message = "") => {
  return {
    success: true,
    message: message || "Success!",
    data: data || null,
  };
};
