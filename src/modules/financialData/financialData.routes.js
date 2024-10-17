import { Router } from 'express';
// import validate from 'express-validation';
import { authJwt } from '../../services/auth.services';

import * as financialDataController from './financialData.controllers';
import * as polygonController from './externalAPIs/polygon.controllers';
import * as finnhubController from './externalAPIs/finnhub.controllers';
import * as financialModelingPrepController from './externalAPIs/financialModelingPrep.controllers';

const routes = new Router();

routes.get(
  '/fmpc',
  authJwt,
  financialModelingPrepController.searchTerm
);

routes.get(
  '/profile/:ticker',
  authJwt,
  financialModelingPrepController.getCompanyProfile
);

routes.get(
  '/news/:ticker',
  authJwt,
  financialModelingPrepController.getCompanyNews
);

routes.get(
  '/history/:ticker',
  authJwt,
  financialModelingPrepController.getCompanyPriceHistory
);

export default routes;
