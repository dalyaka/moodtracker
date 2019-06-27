const express = require('express');

const { jwtAuth } = require('../middleware/passport');
const { handleApiError } = require('./common');
const UserService = require('../services/UserService');

const usersRoute = new express.Router();
usersRoute.use(jwtAuth);

usersRoute.get('/users', (req, res) => {
  UserService.list(req.user)
    .then(users => res.json({ users }))
    .catch(error => handleApiError(error, res));
});

usersRoute.get('/users/:id', (req, res) => {
  UserService.get(req.user, req.params.id)
    .then(user => res.json({ user }))
    .catch(error => handleApiError(error, res));
});

usersRoute.post('/users', (req, res) => {
  const { login, password, name } = req.body;
  UserService.create(req.user, login, password, name)
    .then(user => res.json({ user }))
    .catch(error => handleApiError(error, res));
});

usersRoute.post('/users/:id/edit', (req, res) => {
  const { login, password, name } = req.body;
  UserService.update(req.user, req.params.id, login, password, name)
    .then(user => res.json({ user }))
    .catch(error => handleApiError(error, res));
});

usersRoute.delete('/users/:id', (req, res) => {
  UserService.delete(req.user, req.params.id)
    .then(userId => res.json({ userId }))
    .catch(error => handleApiError(error, res));
});

module.exports = usersRoute;
