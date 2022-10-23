import { randomUUID } from "crypto";
import type { Router } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import { isEmpty as _isEmpty, rest } from "lodash";
import path from "path";
import { Prisma, PrismaClient } from "@prisma/client";

import {
  createPublicUrl,
  createSecureUrl,
  getUploadPath,
  processTags,
  uploadFile,
} from "./helper";
import type { FileInput } from "./types";

import {
  badRequest,
  decrypt,
  emptyString,
  errorMessage,
  forbidden,
  getFullUrl,
  invalidFileFormat,
  notFound,
  noUpdate,
  success,
} from "../../utils";
import * as config from "../../../config";

export default (router: Router) => {
  router.get("/cdn/private/view/files/:file_id_hash", async (req, res) => {
    const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
    let prisma;
    try {
      prisma = new PrismaClient({ ...config.prisma });

      const { params } = req;
      const { file_id_hash: fileIdHash } = params;

      if (!fileIdHash) throw badRequest();

      if (fileIdHash.length !== 172) throw badRequest();

      const decrypted = decrypt(fileIdHash, process.env.SECURE_URL_KEY || "");
      const [fileId, _] = decrypted.split(":");

      const where: Prisma.FileWhereUniqueInput = { file_id: fileId };

      const resource = await prisma.file.findUnique({ where });
      if (!resource) throw notFound();
      if (resource?.user_id !== userId) throw forbidden();

      const path = getUploadPath({
        userId,
        resourceId: fileId,
        file: { mimetype: resource.mimetype },
      });

      res.setHeader("Content-Type", resource.mimetype);
      res.setHeader("Content-Disposition", `filename=${resource.name}`);
      return res.sendFile(path);
    } catch (error) {
      return res.status(404).send("No such file.");
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });

  router.get("/cdn/public/view/files/:file_id_hash", async (req, res) => {
    let prisma;
    try {
      prisma = new PrismaClient({ ...config.prisma });

      const { params } = req;
      const { file_id_hash: fileIdHash } = params;

      if (!fileIdHash) throw badRequest();

      if (fileIdHash.length !== 172) throw badRequest();

      const decrypted = decrypt(fileIdHash, process.env.PUBLIC_URL_KEY || "");
      const [fileId, _] = decrypted.split(":");
      const fullUrl = getFullUrl(req);

      const where: Prisma.FileWhereUniqueInput = { file_id: fileId };

      const resource = await prisma.file.findUnique({ where });
      if (!resource) throw notFound();
      if (resource.public_url !== fullUrl) throw new Error();

      const path = getUploadPath({
        userId: resource.user_id,
        resourceId: fileId,
        file: { mimetype: resource.mimetype },
      });

      res.setHeader("Content-Type", resource.mimetype);
      res.setHeader("Content-Disposition", `filename=${resource.name}`);
      return res.sendFile(path);
    } catch (error) {
      return res.status(404).send("No such file.");
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });

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

      const ext = path.extname(name);
      const allowed = [".gif"];

      const message = `Invalid file format. Use one of: ${allowed}`;

      if (!allowed.includes(ext)) throw invalidFileFormat(message);

      prisma = new PrismaClient({ ...config.prisma });
      const response = await prisma.$transaction(async (tx) => {
        const date = new Date().toISOString();
        const resourceId = randomUUID();
        const urlParams = {
          resourceId,
          file,
          secret: process.env.SECURE_URL_KEY || "",
        };
        const secureUrl = createSecureUrl(urlParams);

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
          processTags(data, tags);
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

  router.post("/api/files/:file_id/link", async (req, res) => {
    const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
    let prisma;
    try {
      const { params } = req;
      const { file_id: fileId } = params;

      if (!fileId) throw badRequest();

      prisma = new PrismaClient({ ...config.prisma });
      const where: Prisma.FileWhereUniqueInput = { file_id: fileId };
      const resource = await prisma.file.findUnique({ where });

      if (!resource) throw notFound();
      if (resource?.user_id !== userId) throw forbidden();

      const urlParams = {
        resourceId: resource.file_id,
        file: { mimetype: resource.mimetype },
        secret: process.env.PUBLIC_URL_KEY || "",
      };
      const publicUrl = createPublicUrl(urlParams);
      const host = `${req.protocol}://${req.hostname}`;
      const path = "cdn/public/view/files";

      const data: Prisma.FileUpdateInput = {};
      const include: Prisma.FileInclude = {};

      data["public_url"] = `${host}/${path}/${publicUrl}`;
      include["tags"] = true;

      const response = await prisma.file.update({ where, data, include });

      return res
        .status(200)
        .send(success(response, "Success creating public link."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });

  router.delete("/api/files/:file_id/link", async (req, res) => {
    const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
    let prisma;
    try {
      const { params } = req;
      const { file_id: fileId } = params;

      if (!fileId) throw badRequest();

      prisma = new PrismaClient({ ...config.prisma });
      const where: Prisma.FileWhereUniqueInput = { file_id: fileId };
      const resource = await prisma.file.findUnique({ where });

      if (!resource) throw notFound();
      if (resource?.user_id !== userId) throw forbidden();

      const data: Prisma.FileUpdateInput = {};
      const include: Prisma.FileInclude = {};

      data["public_url"] = null;
      include["tags"] = true;

      const response = await prisma.file.update({ where, data, include });

      return res
        .status(200)
        .send(success(response, "Success deleting public link."));
    } catch (error) {
      const { statusCode, ...rest } = errorMessage(error);
      return res.status(statusCode || 400).send(rest);
    } finally {
      if (prisma) await prisma.$disconnect();
    }
  });
};
