import { Router } from 'express';
import * as contentController from './content.controllers';
import { authJwt } from '../../services/auth.services';

const routes = new Router();

routes.post(
  '/new',
  // authJwt,
  contentController.createContent
);

routes.get(
  '/public/:page',
  contentController.getContentPublic
);

routes.get(
  '/private/:page',
  contentController.getContentPrivate
);

routes.patch(
  '/:page',
  // authJwt,
  contentController.updateContent
);

export default routes;
