import type { Router } from "express";
import {
  AuthCtrl,
  GifCtrl,
  TagCtrl,
  UploadCtrl,
  UserCtrl,
} from "./controllers";

export default (router: Router) => {
  AuthCtrl(router);
  GifCtrl(router);
  TagCtrl(router);
  UploadCtrl(router);
  UserCtrl(router);
};
