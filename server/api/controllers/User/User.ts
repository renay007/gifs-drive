import type { Router } from "express";
import { PrismaClient } from "@prisma/client";

import { badRequest, errorMessage, success, userNotFound } from "../../utils";
import * as config from "../../../config";

export default (router: Router) => {
  router.get("/api/users/:user_id", async (req, res) => {
    const ID = "972646b0-d56c-409e-9404-783dbcf9c618";
    let prisma;
    try {
      const { user_id: userId } = req.params;

      if (!userId || userId !== "me") return res.status(400).send(badRequest());

      prisma = new PrismaClient({ ...config.prisma });
      const user = await prisma.user.findUnique({ where: { user_id: ID } });

      if (!user) return res.status(400).send(userNotFound());

      const { hashed_password, ...rest } = user;

      return res.status(200).send(success(rest, "Success retrieving user."));
    } catch (error) {
      return res.status(400).send(errorMessage(error));
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });
};
