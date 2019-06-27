const mongoose = require('mongoose');

const setup = (dbConfig, logger) => {
  logger.info(`cs: ${dbConfig.connectionString}`);

  mongoose.connect(dbConfig.connectionString);

  mongoose.connection.on('connected', () => {
    logger.info(
      `Mongoose default connection open to ${dbConfig.connectionString}`
    );
  });

  mongoose.connection.on('error', err => {
    logger.error(err.toString());
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });
  return mongoose;
};

module.exports = { setup };
