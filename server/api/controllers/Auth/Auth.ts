import type { Router } from "express";
import { isEmpty as _isEmpty } from "lodash";
import { PrismaClient } from "@prisma/client";
import validator from "validator";

import { encryptPassword, isValidPassword } from "./helper";
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
import * as config from "../../../config";

const { isEmail, isStrongPassword: isStrong } = validator;

export default (router: Router) => {
  router.post("/api/signup", async (req, res) => {
    let prisma;
    try {
      const { body } = req;
      if (_isEmpty(body)) return res.status(400).send(badRequest());

      const required: (keyof SignupInput)[] = [
        "first_name",
        "last_name",
        "email",
        "password",
      ];
      let validation = validateBody(required, body);
      let { isValid, message } = validation;

      if (!isValid) return res.status(400).send(missingInfo(message));

      validation = checkForNonEmptyString(required, body);
      ({ isValid, message } = validation);

      if (!isValid) return res.status(400).send(emptyString(message));

      const {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }: SignupInput = body;

      if (!isEmail(email)) return res.status(400).send(invalidEmail());

      if (!isStrong(password)) return res.status(400).send(weakPassword());

      prisma = new PrismaClient({ ...config.prisma });
      let user = await prisma.user.findUnique({ where: { email } });

      if (user) return res.status(400).send(emailExists());

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
      return res.status(200).send(success(rest, "Successfully registered."));
    } catch (error) {
      return res.status(400).send(errorMessage(error));
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });

  router.post("/api/signin", async (req, res) => {
    let prisma;
    try {
      const { body } = req;
      if (_isEmpty(body)) return res.status(400).send(badRequest());

      const required: (keyof SigninInput)[] = ["email", "password"];
      let validation = validateBody(required, body);
      let { isValid, message } = validation;

      if (!isValid) return res.status(400).send(missingInfo(message));

      validation = checkForNonEmptyString(required, body);
      ({ isValid, message } = validation);

      if (!isValid) return res.status(400).send(emptyString(message));

      const { email, password }: SigninInput = body;

      if (!isEmail(email)) return res.status(400).send(invalidEmail());

      prisma = new PrismaClient({ ...config.prisma });
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) return res.status(400).send(userNotFound());

      const valid = await isValidPassword(password, user.hashed_password);

      if (!valid) return res.status(400).send(wrongPassword());

      const { hashed_password: hashedPassword, ...rest } = user;

      return res.status(200).send(success(rest, "Successfully logged in."));
    } catch (error) {
      return res.status(400).send(errorMessage(error));
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });
};
