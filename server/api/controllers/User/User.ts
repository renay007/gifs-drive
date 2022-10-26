import type { Router } from "express";
import { PrismaClient } from "@prisma/client";

import { badRequest, errorMessage, success, userNotFound } from "../../utils";
import * as config from "../../../config";

export default (prisma: PrismaClient, router: Router) => {
  router.get("/api/users/:user_id", async (req, res) => {
    const ID = "972646b0-d56c-409e-9404-783dbcf9c618";
    // let prisma;
    try {
      const { user_id: userId } = req.params;

      if (!userId || userId !== "me") throw badRequest();

      // prisma = new PrismaClient({ ...config.prisma });
      const user = await prisma.user.findUnique({ where: { user_id: ID } });

      if (!user) throw userNotFound();

      const { hashed_password, ...rest } = user;

      return res.status(200).send(success(rest, "Success retrieving user."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    } finally {
      // if (prisma) await prisma.$disconnect();
    }
  });
};
