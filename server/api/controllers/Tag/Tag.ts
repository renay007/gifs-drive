import { PrismaClient } from "@prisma/client";
import type { Router } from "express";

import { errorMessage, success } from "../../utils";

export default (prisma: PrismaClient, router: Router) => {
  router.get("/api/tags", async (req, res) => {
    try {
      const tags = await prisma.tag.findMany();

      return res.status(200).send(success(tags, "Success retrieving tags."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    }
  });
};
