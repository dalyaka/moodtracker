const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('../../config');

const { passport, jwtAuth } = require('../middleware/passport');
const { setErrorResponse, handleApiError } = require('./common');

const jwtSecret = config.get('auth:secret');

const authRoute = new express.Router();

const signingOptions = {
  expiresIn: config.get('auth:expiresIn'),
};

const handleAuthError = (authError, res) => {
  if (authError.name === 'ApiError') {
    handleApiError(authError, res);
  } else {
    setErrorResponse(res, authError.message, 500);
  }
};

authRoute.get('/auth/user', jwtAuth, (req, res) => {
  res.json({ user: req.user });
});

authRoute.post('/auth/login', (req, res, next) => {
  passport.authenticate(
    'local-signin',
    { session: false },
    (error, user, authError) => {
      if (error || authError) {
        handleAuthError(error || authError, res);
      } else {
        req.login(user, { session: false }, loginError => {
          if (loginError) {
            next(loginError);
          } else {
            const token = jwt.sign(user, jwtSecret, signingOptions);
            res.json({ user, token });
          }
        });
      }
    }
  )(req, res, next);
});

authRoute.post('/auth/signup', (req, res, next) => {
  passport.authenticate(
    'local-signup',
    { session: false },
    (error, user, authError) => {
      if (error || authError) {
        handleAuthError(error || authError, res);
      } else {
        req.login(user, { session: false }, signupError => {
          if (signupError) {
            next(signupError);
          } else {
            const token = jwt.sign(user, jwtSecret, signingOptions);
            res.json({ user, token });
          }
        });
      }
    }
  )(req, res, next);
});

authRoute.post('/auth/logout', jwtAuth, (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
  }
  res.json({ user: null, token: null });
});

module.exports = authRoute;
