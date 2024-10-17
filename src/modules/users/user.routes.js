import { Router } from 'express';
import validate from 'express-validation';
import { authJwt, authLocal } from '../../services/auth.services';

import * as userController from './user.controllers';
import userValidation from './user.validations';

const routes = new Router();

routes.post(
  '/signup',
  validate(userValidation.signup),
  userController.signUp
);

routes.post(
  '/login',
  authLocal,
  userController.login
);

routes.get(
  '/all',
  authJwt,
  userController.getAllUsers
);

routes.post(
  '/validate',
  userController.validate
);

// routes.post(
//   '/forgotpw',
//   userController.forgotpw
// );

// routes.post(
//   '/pwreset',
//   userController.pwreset
// );

routes.get(
  '/:id',
  authJwt,
  userController.getUserById
);

routes.patch(
  '/:id',
  authJwt,
  userController.updateUser
);

routes.delete(
  '/:id',
  authJwt,
  userController.deleteUser
);

export default routes;
