import type { Router } from "express";
import { PrismaClient } from "@prisma/client";

import { AuthErrorCode, HttpError, HttpErrorCode } from "../../utils/errors";

export default (router: Router) => {
  router.get("/api/users/:user_id", async (req, res) => {
    const { user_id: userId } = req.params;

    if (!userId || userId !== "me")
      return res
        .status(400)
        .send(new HttpError(HttpErrorCode.BAD_REQUEST).toJson());

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { user_id: "972646b0-d56c-409e-9404-783dbcf9c618" },
    });

    if (!user)
      return res
        .status(400)
        .send(new HttpError(AuthErrorCode.USER_NOT_FOUND).toJson());

    const { hashed_password, ...userInfo } = user;

    return res.status(200).send({
      success: true,
      message: "Successfully retrieved user info.",
      data: userInfo,
    });
  });
};
