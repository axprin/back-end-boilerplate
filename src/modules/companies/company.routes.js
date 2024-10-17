import { Router } from 'express';
import * as companyController from './company.controllers';
import { authJwt } from '../../services/auth.services';

const routes = new Router();

routes.post(
  '/',
  authJwt,
  companyController.createCompany
);

routes.get(
  '/',
  authJwt,
  companyController.getCompanies
);

routes.get(
  '/:symbol',
  authJwt,
  companyController.getCompanyBySymbol
);

routes.patch(
  '/:id',
  authJwt,
  companyController.updateCompany
);

routes.delete(
  '/:id',
  authJwt,
  companyController.removeCompany
);

export default routes;
