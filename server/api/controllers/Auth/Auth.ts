import type { CookieOptions, Router } from "express";
import { isEmpty as _isEmpty } from "lodash";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import validator from "validator";

import { encryptPassword, generateToken, isValidPassword } from "./helper";
import type { SigninInput, SignupInput } from "./types";

import {
  badRequest,
  checkForNonEmptyString,
  emailExists,
  emptyString,
  errorMessage,
  invalidEmail,
  missingInfo,
  success,
  userNotFound,
  validateBody,
  weakPassword,
  wrongPassword,
} from "../../utils";

const { isEmail, isStrongPassword: isStrong } = validator;

export default (prisma: PrismaClient, router: Router) => {
  router.post("/api/signup", async (req, res) => {
    try {
      const body = req.body as SignupInput;
      if (_isEmpty(body)) throw badRequest();

      const required: (keyof SignupInput)[] = [
        "first_name",
        "last_name",
        "email",
        "password",
      ];
      let validation = validateBody(required, body);
      let { isValid, message } = validation;

      if (!isValid) throw missingInfo(message);

      validation = checkForNonEmptyString(required, body);
      ({ isValid, message } = validation);

      if (!isValid) throw emptyString(message);

      const {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }: SignupInput = body;

      if (!isEmail(email)) throw invalidEmail();

      if (!isStrong(password)) throw weakPassword();

      let user = await prisma.user.findUnique({ where: { email } });

      if (user) throw emailExists();

      const hashedPassword = await encryptPassword(password);
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

      const { hashed_password, ...rest } = user;

      const token = generateToken(user);

      const secured = process.env.IS_COOKIE_SECURE === "true";
      res.cookie("jwt", token, {
        httpOnly: secured,
        sameSite: secured,
        signed: secured,
        secure: secured,
      });

      return res.status(200).send(success(rest, "Successfully registered."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    }
  });

  router.post("/api/signin", async (req, res) => {
    try {
      const body = req.body as SigninInput;
      if (_isEmpty(body)) throw badRequest();

      const required: (keyof SigninInput)[] = ["email", "password"];
      let validation = validateBody(required, body);
      let { isValid, message } = validation;

      if (!isValid) throw missingInfo(message);

      validation = checkForNonEmptyString(required, body);
      ({ isValid, message } = validation);

      if (!isValid) throw emptyString(message);

      const { email, password }: SigninInput = body;

      if (!isEmail(email)) throw invalidEmail();

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) throw userNotFound();

      const valid = await isValidPassword(password, user.hashed_password);

      if (!valid) throw wrongPassword();

      const { hashed_password: hashedPassword, ...rest } = user;

      const token = generateToken(user);

      const secured = process.env.IS_COOKIE_SECURE === "true";
      res.cookie("jwt", token, {
        httpOnly: secured,
        sameSite: secured,
        signed: secured,
        secure: secured,
      });

      return res.status(200).send(success(rest, "Successfully logged in."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    }
  });

  router.post("/api/signout", async (_, res) => {
    try {
      res.clearCookie("jwt");
      return res.status(200).send(success(null, "Successfully logged out."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    }
  });
};
