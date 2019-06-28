const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');

const AuthService = require('../services/AuthService');
const config = require('../../config');

const { setErrorResponse, handleApiError } = require('../api/common');

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, login, password, done) => {
      AuthService.signup(login, password)
        .then(registered => {
          if (registered) {
            done(null, registered);
          } else {
            done(null, false);
          }
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

passport.use(
  'local-signin',
  new LocalStrategy(
    { usernameField: 'login', passwordField: 'password' },
    (login, password, done) => {
      AuthService.login(login, password)
        .then(response => {
          if (response) {
            done(null, response);
          } else {
            done(null, false, response);
          }
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

const jwtSecret = config.get('auth:secret');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  passReqToCallback: true,
};
//
passport.use(
  'jwt',
  new JwtStrategy(opts, (req, payload, done) => {
    AuthService.find(payload.id)
      .then(user => done(null, user || false))
      .catch(error => done(error));
  })
);

const jwtAuth = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (error, user, authError) => {
    if (error) {
      handleApiError(error, res);
    } else if (!user) {
      if (authError) {
        setErrorResponse(res, authError.message, 401);
      } else {
        setErrorResponse(res, 'User not found', 401);
      }
    } else {
      req.logIn(user, { session: false }, loginError => {
        if (loginError) {
          handleApiError(loginError, res);
        } else {
          next();
        }
      });
    }
  })(req, res, next);

module.exports = { passport, jwtAuth };
