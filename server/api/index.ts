import type { Router } from "express";
import { AuthCtrl, GifCtrl, UserCtrl } from "./controllers";

export default (router: Router) => {
  AuthCtrl(router);
  GifCtrl(router);
  UserCtrl(router);
};
