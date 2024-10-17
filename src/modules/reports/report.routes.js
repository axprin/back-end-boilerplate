import { Router } from 'express';
import * as reportController from './report.controllers';
import { authJwt } from '../../services/auth.services';

const routes = new Router();

routes.post(
  '/',
  authJwt,
  reportController.createReport
);

routes.get(
  '/',
  authJwt,
  reportController.getReports
);

routes.get(
  '/client',
  authJwt,
  reportController.getReportsClient
);

routes.get(
  '/by-company',
  authJwt,
  reportController.getReportsByCompany
);

routes.get(
  '/:id',
  authJwt,
  reportController.getReport
);

routes.patch(
  '/:id',
  authJwt,
  reportController.updateReport
);

routes.delete(
  '/:id',
  authJwt,
  reportController.removeReport
);

export default routes;
