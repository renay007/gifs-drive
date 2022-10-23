import { Prisma, Tag } from "@prisma/client";
import { UploadedFile } from "express-fileupload";
import mime from "mime-types";
import path from "path";
import util from "util";

import { encrypt } from "./../../utils";

const processTags = (data: Prisma.FileUpdateInput, tags: Tag[]) => {
  if (tags.length === 0) return;

  data["tags"] = {};
  data["tags"]["connectOrCreate"] = [];

  for (const tag of tags) {
    const name = tag.name.toLowerCase();
    if (name && name !== "") {
      const where = { name };
      const create = { name };
      data["tags"]["connectOrCreate"].push({ where, create });
    }
  }
};

const getUploadPath = ({
  userId,
  resourceId,
  file,
}: {
  userId: string;
  resourceId: string;
  file: { mimetype: string };
}): string => {
  const dir = path.resolve("..", "private", "uploads");
  const { mimetype } = file;
  const extension = mime.extension(mimetype) || "";
  const type = mime.types[extension].split("/")[0];
  const fileName = `${resourceId}.${extension}`;
  return `${dir}/${userId}/${type}/${fileName}`;
};

const createSecureUrl = ({
  resourceId,
  file,
  secret,
}: {
  resourceId: string;
  file: { mimetype: string };
  secret: string;
}): string => {
  return encrypt(`${resourceId}:${file.mimetype}`, secret);
};

const createPublicUrl = ({
  resourceId,
  file,
  secret,
}: {
  resourceId: string;
  file: { mimetype: string };
  secret: string;
}): string => {
  return encrypt(`${resourceId}:${file.mimetype}`, secret);
};

const uploadFile = async ({
  userId,
  resourceId,
  file,
}: {
  userId: string;
  resourceId: string;
  file: UploadedFile;
}): Promise<void> => {
  const path = getUploadPath({ userId, resourceId, file });
  const moveTo = util.promisify(file.mv);
  try {
    await moveTo(path);
  } catch (error) {
    throw new Error("Failed to upload file. Please try again");
  }
};

export {
  createPublicUrl,
  createSecureUrl,
  getUploadPath,
  processTags,
  uploadFile,
};
