import type { Router } from "express";
import { AuthCtrl, UserCtrl } from "./controllers";

export default (router: Router) => {
  AuthCtrl(router);
  UserCtrl(router);
};
