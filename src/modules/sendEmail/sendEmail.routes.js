import { Router } from 'express';
import * as sendEmailController from './sendEmail.controllers';

const routes = new Router();

routes.post(
  '/newsletter',
  sendEmailController.sendNewsletterEmail
);

routes.post(
  '/contact-us',
  sendEmailController.sendContactUsEmail
);

export default routes;
