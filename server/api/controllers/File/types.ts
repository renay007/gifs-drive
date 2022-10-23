import { Prisma } from "@prisma/client";

const fileData = Prisma.validator<Prisma.FileArgs>()({
  select: { name: true, tags: true },
});

export type FileInput = Prisma.FileGetPayload<typeof fileData>;
