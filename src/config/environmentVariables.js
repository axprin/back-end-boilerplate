require('dotenv').config();

module.exports = {
  dbName: process.env.DATABASE,
  dbUser: process.env.USERNAME,
  dbPass: process.env.PASSWORD,
  dbHost: process.env.DBHOST,
};

