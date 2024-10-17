import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import express from 'express';

const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'docker';
const isProd = process.env.NODE_ENV === 'production';

export default app => {
  if (isProd) {
    app.use(compression());
    app.use(helmet());
  }

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
  app.use(express.json());
  app.use(passport.initialize());

  if (isDev) {
    app.use(morgan('dev'));
  }
};
