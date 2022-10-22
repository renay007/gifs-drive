import { PrismaClient } from "@prisma/client";
import type { Router } from "express";

import * as config from "../../../config";
import { errorMessage, success } from "../../utils";

export default (router: Router) => {
  router.get("/api/tags", async (req, res) => {
    let prisma;
    try {
      prisma = new PrismaClient({ ...config.prisma });
      const tags = await prisma.tag.findMany();

      return res.status(200).send(success(tags, "Success retrieving tags."));
    } catch (error) {
      return res.status(400).send(errorMessage(error));
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });
};
