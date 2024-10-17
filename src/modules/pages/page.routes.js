import { Router } from 'express';
import * as pageController from './page.controllers';
import { authJwt } from '../../services/auth.services';

const routes = new Router();

routes.post(
  '/',
  authJwt,
  pageController.createPage
);

routes.get(
  '/',
  // authJwt,
  pageController.getPages
);

routes.get(
  '/:id',
  authJwt,
  pageController.getPage
);

routes.get(
  '/slug/:slug',
  // authJwt,
  pageController.getPageBySlug
);

routes.patch(
  '/:id',
  authJwt,
  pageController.updatePage
);

export default routes;
