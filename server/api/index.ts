import type { Router } from "express";
import { AuthCtrl, FileCtrl, TagCtrl, UserCtrl } from "./controllers";

export default (router: Router) => {
  AuthCtrl(router);
  FileCtrl(router);
  TagCtrl(router);
  UserCtrl(router);
};
