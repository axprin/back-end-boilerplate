import mongoose from 'mongoose';
import constants from './constants';

mongoose.set('useCreateIndex', true);

// Connect the db with the url provide
try {
  console.log('trying');
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'docker') {
    mongoose.connect(constants.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    console.log(`error with mongoose connection ${e}`);

    throw e;
  });

