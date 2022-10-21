import type { Router } from "express";
import { isEmpty as _isEmpty } from "lodash";
import { PrismaClient } from "@prisma/client";
import validator from "validator";

import type { SigninInput, SignupInput } from "./types";
import * as helper from "./helper";

import { checkForNonEmptyString, validateBody } from "../../utils";
import {
  AuthError,
  AuthErrorCode,
  HttpError,
  HttpErrorCode,
  ValidationError,
  ValidationErrorCode,
} from "../../utils/errors";

export default (router: Router) => {
  router.post("/api/signup", async (req, res) => {
    const { body } = req;
    if (_isEmpty(body))
      return res
        .status(400)
        .send(new HttpError(HttpErrorCode.BAD_REQUEST).toJson());

    const required: (keyof SignupInput)[] = [
      "first_name",
      "last_name",
      "email",
      "password",
    ];
    let validation = validateBody(required, body);

    if (!validation.isValid)
      return res
        .status(400)
        .send(
          new ValidationError(
            ValidationErrorCode.MISSING_REQUIRED_INFO,
            validation.message
          ).toJson()
        );

    validation = checkForNonEmptyString(required, body);
    if (!validation.isValid)
      return res
        .status(400)
        .send(
          new ValidationError(
            ValidationErrorCode.EMPTY_STRING,
            validation.message
          ).toJson()
        );

    const {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    } = body as SignupInput;

    if (!validator.isEmail(email || ""))
      return res
        .status(400)
        .send(new ValidationError(ValidationErrorCode.INVALID_EMAIL).toJson());

    if (!validator.isStrongPassword(password || ""))
      return res
        .status(400)
        .send(new ValidationError(ValidationErrorCode.WEAK_PASSWORD).toJson());

    const prisma = new PrismaClient();
    let user = await prisma.user.findUnique({ where: { email } });

    if (user)
      return res
        .status(400)
        .send(new AuthError(AuthErrorCode.EMAIL_ALREADY_EXISTS).toJson());

    const hashedPassword = await helper.encryptPassword(password);
    const date = new Date().toISOString();

    user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        hashed_password: hashedPassword,
        created_at: date,
        updated_at: date,
      },
    });

    return res.status(200).send({
      success: true,
      message: "Successfully signed up user",
      data: user,
    });
  });

  /**
   * Sign in
   */
  router.post("/api/signin", async (req, res) => {
    const prisma = new PrismaClient();
    const { body }: { body: SigninInput } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user) return;
  });
};
