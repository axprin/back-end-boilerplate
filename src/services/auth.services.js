import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '../modules/users/user.model';
import constants from '../config/constants';

// local strategy
const localOpts = {
  usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  await User.findOne({ email }, (err, user) => {
    if (err) return done(err, false);

    if (!user) {
      return done(null, false);
    } else if (!user.authenticateUser(password)) {
      return done(null, false);
    }

    return done(null, user);
  });
});

// Jwt strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  console.log('test')
  await User.findById(payload._id, (err, user) => {
    if (err) return done(err, false);
    if (!user) return done(null, false);
    return done(null, user);
  });
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
