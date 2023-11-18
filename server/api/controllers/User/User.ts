import type { Router } from "express";
import { PrismaClient, User } from "@prisma/client";

import { errorMessage, success, userNotFound } from "../../utils";
import { authenticate } from "../../utils/passport";

export default (prisma: PrismaClient, router: Router) => {
  router.get("/api/users/me", authenticate(), async (req, res) => {
    const { user_id: userId } = req.user as User;
    try {
      const user = await prisma.user.findUnique({ where: { user_id: userId } });

      if (!user) throw userNotFound();

      const { hashed_password, ...rest } = user;

      return res.status(200).send(success(rest, "Success retrieving user."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    }
  });
};
