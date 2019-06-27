const nconf = require('nconf');
const path = require('path');
const fs = require('fs');

const defaults = require('./defaults');

nconf.argv().env();

const envName = nconf.get('APP_ENV');
if (envName) {
  nconf.file({
    file: fs.existsSync(envName)
      ? envName
      : path.join(__dirname, 'env', `${envName}.json`),
  });
}

nconf.defaults(defaults);

module.exports = nconf;
