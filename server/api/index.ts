import type { Router } from "express";
import { AuthCtrl, GifCtrl, TagCtrl, UserCtrl } from "./controllers";

export default (router: Router) => {
  AuthCtrl(router);
  GifCtrl(router);
  TagCtrl(router);
  UserCtrl(router);
};
