import type { Prisma } from "@prisma/client";

type PrismaConfigType = {
  errorFormat: Prisma.ErrorFormat;
};

const config: PrismaConfigType = {
  errorFormat: "minimal",
};

export default config;
