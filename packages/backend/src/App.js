const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const { passport } = require('./middleware/passport');
const logger = require('./middleware/logger');
const db = require('./model/db');
const api = require('./api');

class App {
  constructor() {
    this.app = express();
    this.init(this.app);
  }

  init(app) {
    app.set('port', config.get('server:port'));
    app.locals.pretty = true;
    app.set('json spaces', 2);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    db.setup(config.get('db'), logger);

    app.use(passport.initialize());

    api(app);
  }

  run() {
    this.server = this.app.listen(this.app.get('port'), () => {
      const { port } = this.server.address();
      const env = config.get('APP_ENV');
      logger.info(
        `[API Backend] port ${port}, env: ${env} (http://0.0.0.0:${port}/)`
      );
    });
  }
}

module.exports = App;
