import type { Router } from "express";
import { isEmpty as _isEmpty } from "lodash";
import { Prisma, PrismaClient } from "@prisma/client";

import type { GifInput } from "./types";
import * as helper from "./helper";

import {
  badRequest,
  checkForNonEmptyString,
  emptyString,
  errorMessage,
  missingInfo,
  success,
  validateBody,
} from "../../utils";
import * as config from "../../../config";

export default (router: Router) => {
  router.get("/api/gifs", async (req, res) => {
    const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
    let prisma;

    try {
      prisma = new PrismaClient({ ...config.prisma });

      const where: Prisma.GifWhereInput = { user_id: userId };
      const include: Prisma.GifInclude = { tags: true };

      const gifs = await prisma.gif.findMany({ where, include });

      return res.status(200).send(success(gifs, "Success retrieving gifs."));
    } catch (error) {
      return res.status(400).send(errorMessage(error));
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });

  router.post("/api/gifs", async (req, res) => {
    const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
    let prisma;
    try {
      const { body } = req;
      if (_isEmpty(body)) return res.status(400).send(badRequest());

      const required: (keyof GifInput)[] = ["name"];
      let validation = validateBody(required, body);
      let { isValid, message } = validation;

      if (!isValid) return res.status(400).send(missingInfo(message));

      validation = checkForNonEmptyString(required, body);
      ({ isValid, message } = validation);

      if (!isValid) return res.status(400).send(emptyString(message));

      const { name }: GifInput = body;
      const date = new Date().toISOString();

      const data: Prisma.GifCreateInput = {
        name: name,
        user: { connect: { user_id: userId } },
        created_at: date,
        updated_at: date,
      };

      prisma = new PrismaClient({ ...config.prisma });
      const gif = await prisma.gif.create({ data });

      return res.status(200).send(success(gif, "Successfully created gif."));
    } catch (error) {
      return res.status(400).send(errorMessage(error));
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });

  router.put("/api/gifs/:gif_id", async (req, res) => {
    let prisma;
    try {
      const { params, body } = req;
      const { gif_id: gifId } = params;

      if (!gifId) return res.status(400).send(badRequest());

      if (_isEmpty(body)) return res.status(400).send(badRequest());

      const { name, tags }: GifInput = body;

      const required: (keyof GifInput)[] = ["name", "tags"];
      let validation = validateBody(required, body);
      let { isValid, message } = validation;

      if (!isValid) return res.status(400).send(missingInfo(message));

      message = "name should be a non-empty string";
      if (!name) return res.status(400).send(emptyString(message));

      prisma = new PrismaClient({ ...config.prisma });
      const transactions = [];

      const result = await prisma.$transaction(async (tx) => {
        const where: Prisma.GifWhereUniqueInput = {};
        const data: Prisma.GifUpdateInput = {};
        const include: Prisma.GifInclude = {};

        where["gif_id"] = gifId;
        data["tags"] = { set: [] };

        await tx.gif.update({ where, data });

        data["name"] = name;
        data["tags"] = {};
        helper.processTags(data, tags);
        include["tags"] = true;
        data["updated_at"] = new Date().toISOString();

        return await tx.gif.update({ where, data, include });
      });
      return res.status(200).send(success(result, "Successfully updated gif."));
    } catch (error) {
      return res.status(400).send(errorMessage(error));
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });

  router.delete("/api/gifs/:gif_id", async (req, res) => {
    let prisma;
    try {
      const { gif_id: gifId } = req.params;

      if (!gifId) return res.status(400).send(badRequest());

      prisma = new PrismaClient({ ...config.prisma });
      await prisma.gif.delete({ where: { gif_id: gifId } });

      return res.status(200).send(success(null, "Successfully deleted gif."));
    } catch (error) {
      return res.status(400).send(errorMessage(error));
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });
};
