import type { Router } from "express";
import {
  AuthCtrl,
  FileCtrl,
  TagCtrl,
  UploadCtrl,
  UserCtrl,
} from "./controllers";

export default (router: Router) => {
  AuthCtrl(router);
  FileCtrl(router);
  TagCtrl(router);
  UploadCtrl(router);
  UserCtrl(router);
};
