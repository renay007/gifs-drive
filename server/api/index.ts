import type { Router } from 'express';
import { AuthCtrl } from './controllers';

export default (router: Router) => {
  AuthCtrl(router);
}