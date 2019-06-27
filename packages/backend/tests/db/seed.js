const { User, UserRole } = require('../../src/model/User');

const db = require('../../src/model/db');
const logger = require('../../src/middleware/logger');
const config = require('../../config');

const usr = {
  login: 'user',
  name: 'John Snow',
  password: '123',
  role: UserRole.User,
};

const mgr = {
  login: 'owner',
  name: 'Iaroslav Sobolev',
  password: '123',
  role: UserRole.Manager,
};

const ensureUserExists = async userData => {
  const existing = await User.findOne({ login: userData.login }).exec();
  if (existing) {
    logger.info(`user ${userData.login} exists`);
    return existing;
  }
  const user = new User(userData);
  logger.info(`creating ${userData.login}`);
  await user.save();
  return user;
};

async function seed() {
  logger.info(`setup db. env: ${config.get('APP_ENV')}`);

  const mongoose = db.setup(config.get('db'), logger);

  try {
    const users = [usr, mgr];
    await Promise.all(users.map(u => ensureUserExists(u)));
  } catch (e) {
    logger.error(e.toString());
  }
  mongoose.connection.close();
}

seed();
