import { Prisma, Tag } from "@prisma/client";
import { UploadedFile } from "express-fileupload";
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

const createSecuredUrl = (
  resourceId: string,
  file: { mimetype: string },
  secret: string
): string => {
  return encrypt(`${resourceId}:${file.mimetype}`, secret);
};

const uploadFile = async (
  resourceId: string,
  file: UploadedFile
): Promise<void> => {
  const path = getUploadPath(resourceId, file);
};

const encrypt = (message: string, secret: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secret), iv);
  let encrypted = cipher.update(message);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = (message: string, secret: string) => {
  const messageParts = message.split(":");
  const iv = Buffer.from(messageParts.shift() || "", "hex");
  const encryptedMessage = Buffer.from(messageParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secret),
    iv
  );
  let decrypted = decipher.update(encryptedMessage);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

export { createSecuredUrl, getUploadPath, processTags, uploadFile };
