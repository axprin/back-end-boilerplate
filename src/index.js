import express from 'express';
import constants from './config/constants';
import './config/database';
import middlewaresConfig from './config/middlewares';
import apiRoutes from './modules';

process.env.VUE_DEV = true;

const app = express();

middlewaresConfig(app);

apiRoutes(app);

app.set('User', false);
const server = app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      Server running on port: ${constants.PORT}
      ---
      Running on ${process.env.NODE_ENV}
      ---
      Make something great
    `);
  }
});
server.setTimeout(360000);
