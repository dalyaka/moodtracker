const express = require('express');
const path = require('path');

const auth = require('./auth');

function routes(app) {
  const publicRoot = path.join(__dirname, '..', '..', 'public');
  app.use('/', express.static(publicRoot, { index: false }));

  const v1 = new express.Router();

  v1.use(auth);

  app.use('/api/v1', v1);

  app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
  });
}

module.exports = routes;
