import { Router } from 'express';
import * as submissionController from './submission.controllers';
import { authJwt } from '../../services/auth.services';

const routes = new Router();

routes.post(
  '/',
  submissionController.createSubmission
);

routes.get(
  '/',
  authJwt,
  submissionController.getAllSubmissions
);

routes.get(
  '/survey/counts',
  authJwt,
  submissionController.getSubmissionCounts
);

routes.get(
  '/survey/:survey',
  authJwt,
  submissionController.getSubmissionsBySurvey
);

routes.delete(
  '/:id',
  authJwt,
  submissionController.deleteSubmission
);

// routes.delete(
//   '/:id',
//   // authJwt,
//   submissionController.deleteSubmissionsById
// );

// routes.delete(
//   '/event/:event',
//   // authJwt,
//   submissionController.deleteSubmissionsByEvent
// );

export default routes;
