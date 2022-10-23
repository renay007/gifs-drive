import type { Router } from "express";
import { isEmpty as _isEmpty } from "lodash";
import { Prisma, PrismaClient } from "@prisma/client";

import type { FileInput } from "./types";
import * as helper from "./helper";

import {
  badRequest,
  checkForNonEmptyString,
  emptyString,
  errorMessage,
  forbidden,
  missingInfo,
  notFound,
  noUpdate,
  success,
  validateBody,
} from "../../utils";
import * as config from "../../../config";
import { FileArray, UploadedFile } from "express-fileupload";
import { uploadFile } from "./helper";
import { randomUUID } from "crypto";
import { send } from "process";

export default (router: Router) => {
  // router.get("/cdn/private/view/files/:file_id", async (req, res) => {
  //   const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
  //   let prisma;
  //   try {
  //     prisma = new PrismaClient({ ...config.prisma });

  //     const where: Prisma.FileWhereUniqueInput = {};
  //     const where: Prisma.FileWhereInput = { user_id: userId };
  //     const include: Prisma.FileInclude = { tags: true };
  //     where["file_id"] = fileId;

  //     const resource = await prisma.file.findUnique({ where });
  //     if (!resource) throw notFound();
  //     if (resource?.user_id !== userId) throw forbidden();

  //     return send.file();
  //     const files = await prisma.file.findMany({ where, include });

  //     const result = await prisma.$transaction(async (tx) => {
  //       const data: Prisma.FileUpdateInput = {};
  //       const include: Prisma.FileInclude = {};

  //       include["tags"] = true;

  //       if (tags && tags !== null && tags !== undefined) {
  //         hasUpdate = true;
  //         data["tags"] = { set: [] };
  //         await tx.file.update({ where, data });
  //         data["tags"] = {};
  //         helper.processTags(data, tags);
  //       }

  //       if (name) {
  //         hasUpdate = true;
  //         data["name"] = name;
  //         data["updated_at"] = new Date().toISOString();
  //       }
  //       if (!hasUpdate) return resource;
  //       else return await tx.file.update({ where, data, include });
  //     });

  //     return res.status(200).send(success(files, "Success retrieving files."));
  //   } catch (error) {
  //     const { statusCode, ...rest } = errorMessage(error);
  //     return res.status(statusCode || 400).send(rest);
  //   } finally {
  //     if (prisma) await prisma.$disconnect();
  //   }
  // });
  router.get("/api/files", async (req, res) => {
    const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
    let prisma;

    try {
      prisma = new PrismaClient({ ...config.prisma });

      const where: Prisma.FileWhereInput = { user_id: userId };
      const include: Prisma.FileInclude = { tags: true };

      const files = await prisma.file.findMany({ where, include });

      return res.status(200).send(success(files, "Success retrieving files."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });

  router.post("/api/files/upload", async (req, res) => {
    const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
    let prisma;
    try {
      const files = req.files as FileArray;
      if (_isEmpty(files)) throw badRequest();

      const file = files.file as UploadedFile;
      const { name, size, mimetype, md5 } = file;

      prisma = new PrismaClient({ ...config.prisma });
      const response = await prisma.$transaction(async (tx) => {
        const date = new Date().toISOString();
        const resourceId = randomUUID();
        const urlParams = {
          resourceId,
          file,
          secret: process.env.SECURE_URL_KEY || "",
        };
        const secureUrl = helper.createSecureUrl(urlParams);

        const host = `${req.protocol}://${req.hostname}`;
        const path = "cdn/private/view/files";
        const data: Prisma.FileCreateInput = {
          file_id: resourceId,
          name,
          size,
          mimetype,
          md5,
          secure_url: `${host}/${path}/${secureUrl}`,
          user: { connect: { user_id: userId } },
          created_at: date,
          updated_at: date,
        };
        const response = await tx.file.create({ data });
        await uploadFile({ userId, resourceId, file });
        return response;
      });

      return res.status(200).send(success(response, "Success uploading file."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });

  router.patch("/api/files/:file_id", async (req, res) => {
    const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
    let prisma;
    try {
      const { params, body } = req;
      const { file_id: fileId } = params;

      if (!fileId || _isEmpty(body)) throw badRequest();

      const { name, tags }: FileInput = body;

      let message = "name should be a non-empty string";
      if (name && name === "") throw emptyString(message);

      prisma = new PrismaClient({ ...config.prisma });

      let hasUpdate = false;
      const result = await prisma.$transaction(async (tx) => {
        const where: Prisma.FileWhereUniqueInput = {};
        const data: Prisma.FileUpdateInput = {};
        const include: Prisma.FileInclude = {};

        where["file_id"] = fileId;
        include["tags"] = true;
        const resource = await tx.file.findUnique({ where, include });

        if (!resource) throw notFound();
        if (resource?.user_id !== userId) throw forbidden();

        if (tags && tags !== null && tags !== undefined) {
          hasUpdate = true;
          data["tags"] = { set: [] };
          await tx.file.update({ where, data });
          data["tags"] = {};
          helper.processTags(data, tags);
        }

        if (name) {
          hasUpdate = true;
          data["name"] = name;
          data["updated_at"] = new Date().toISOString();
        }
        if (!hasUpdate) return resource;
        else return await tx.file.update({ where, data, include });
      });
      if (!hasUpdate) return res.status(200).send(noUpdate(result));
      else
        return res.status(200).send(success(result, "Success updating file."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });

  router.delete("/api/files/:file_id", async (req, res) => {
    const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
    let prisma;
    try {
      const { file_id: fileId } = req.params;

      if (!fileId) throw badRequest();

      prisma = new PrismaClient({ ...config.prisma });
      const where: Prisma.FileWhereInput = {};
      where["file_id"] = fileId;
      where["user_id"] = userId;
      const response = await prisma.file.deleteMany({ where });

      if (!response.count) throw notFound();

      return res.status(200).send(success(null, "Successfully deleted file."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });
};
