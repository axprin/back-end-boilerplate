import HTTPStatus from 'http-status';
import User from './user.model';
// import emailController from '../../services/email.services';

export async function signUp(req, res) {
  await User.create(req.body, (err, user) => {
    if (err) {
      console.log(`error creating user signUp: ${err.message}`);
      return res.status(HTTPStatus.BAD_REQUEST).json(err);
    }

    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  });
}

export function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
  return next();
}

export async function validate(req, res) {
  await User.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      console.log(`error validating user: ${error.message}`);

      return res.status(HTTPStatus.BAD_REQUEST).json(error);
    }

    if (user) {
      return res.status(HTTPStatus.OK).json(user);
    }

    return res.status(HTTPStatus.OK).json({ msg: 'no user', user: req.body.email });
  });
}

export async function forgotpw(req, res) {
  const environment = req.body.environment;

  await User.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      console.log(`error with forgot password user: ${error.message}`);

      return res.status(HTTPStatus.BAD_REQUEST).json(error);
    }

    if (user) {
      // emailController(user, environment, 'pwreset');
      return res.status(HTTPStatus.OK).json(user);
    }

    return res.status(HTTPStatus.OK).json({ msg: 'no user', user: req.body.email });
  });
}

export async function pwreset(req, res) {
  const environment = req.body.environment;

  if (req.header('password-reset-token') === '7PxbGgGmWmPtArjX0AEA') {
    await User.findById(req.body.user, (error, user) => {
      if (error) {
        console.log(`error resetting password: ${error.message}`);

        return res.status(HTTPStatus.BAD_REQUEST).json(error);
      }

      user.password = req.body.password;

      user.save((err, updatedUser) => {
        if (err) {
          console.log(`error saving user password reset: ${err.message}`);
          return res.status(HTTPStatus.BAD_REQUEST).json(err);
        }

        // emailController(user, environment, 'pwHasBeenReset');

        return res.status(HTTPStatus.OK).json(updatedUser);
      });
    });
  } else {
    res.status(HTTPStatus.UNAUTHORIZED).json({ msg: 'Unauthorized' });
  }
}

export async function updateUser(req, res) {
  await User.findById(req.params.id, (err, user) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    });

    user.save((error, updatedUser) => {
      if (error) {
        console.log(`error saving user updateUser: ${error.message}`);

        return res.status(HTTPStatus.BAD_REQUEST).json(error);
      }

      res.status(HTTPStatus.OK).json(updatedUser);
    });
  });
}

export async function getAllUsers(req, res) {
  await User.find({}, (error, users) => {
    if (error) return res.status(HTTPStatus.BAD_REQUEST).json(error);

    return res.status(HTTPStatus.OK).json(users);
  });
}

export async function getUserById(req, res) {
  await User.findById(req.params.id, (error, user) => {
    if (error) return res.status(HTTPStatus.BAD_REQUEST).json(error);

    return res.status(HTTPStatus.OK).json(user);
  });
}

export async function deleteUser(req, res) {
  console.log('getting here', req.user);
  if (req.user.role !== 'admin') return res.status(HTTPStatus.UNAUTHORIZED);

  await User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.status(HTTPStatus.BAD_REQUEST).json(err);

    return res.sendStatus(HTTPStatus.OK);
  });
}
