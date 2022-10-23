import { Prisma, Tag } from "@prisma/client";
import { UploadedFile } from "express-fileupload";
import { encrypt, decrypt } from "./../../utils";
import crypto from "crypto";
import mime from "mime-types";
import path from "path";

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

const getUploadPath = (
  resourceId: string,
  file: { mimetype: string }
): string => {
  const dir = path.resolve("..", "private", "uploads");
  const { mimetype } = file;
  const extension = mime.extension(mimetype) || "";
  const type = mime.types[extension].split("/")[0];
  const fileName = `${resourceId}.${extension}`;
  return `${dir}/${type}/${fileName}`;
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

const uploadFile = async (
  resourceId: string,
  file: UploadedFile
): Promise<void> => {
  const path = getUploadPath(resourceId, file);
  throw new Error("Just for fun");
};

export { createSecureUrl, getUploadPath, processTags, uploadFile };
