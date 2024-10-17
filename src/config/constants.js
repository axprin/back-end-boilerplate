// const envtvars = require('../config/environmentVariables');

const config = {
  PORT: process.env.PORT || 2000,
};

const dbObj = {
  dbUser: '',
  dbPass: '',
  dbHost: '',
};

config.MONGO_URL = 'mongodb://0.0.0.0:27017/';
config.JWT_SECRET = 'secret';

export default config;
