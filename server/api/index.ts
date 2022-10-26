import { PrismaClient } from "@prisma/client";
import type { Router } from "express";
import { AuthCtrl, FileCtrl, TagCtrl, UserCtrl } from "./controllers";

export default (prisma: PrismaClient, router: Router) => {
  AuthCtrl(prisma, router);
  FileCtrl(prisma, router);
  TagCtrl(prisma, router);
  UserCtrl(prisma, router);
};
