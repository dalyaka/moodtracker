const { User } = require('../model/User');
const { ApiError } = require('../api/common');

class UserService {
  static perm(user, message) {
    if (!User.isManager(user)) {
      throw ApiError.forbidden(message);
    }
  }

  static async list(user) {
    UserService.perm(user, 'You are not allowed to fetch users list');
    const accounts = await User.find().exec();
    return accounts.map(account => account.toDTO());
  }

  static async create(user, login, password, name, role) {
    UserService.perm(user, 'You are not allowed to create new users');

    const existing = await User.findOne({ login }).exec();
    if (existing) {
      throw new ApiError(`User with login ${login} already exists`, 409);
    }

    const props = { login, password, name, role };

    const account = new User(props);
    await account.save();

    return account.toDTO();
  }

  static async update(user, id, login, password, name, role) {
    UserService.perm(user, 'You are not allowed to modify user');

    const account = await User.findById(id);
    const data = {};
    if (login) {
      data.login = login;
    }
    if (name) {
      data.name = name;
    }
    if (role) {
      data.role = role;
    }
    if (password) {
      data.password = password;
    }

    account.set(data);
    await account.save();

    return account.toDTO();
  }

  static async delete(user, id) {
    UserService.perm(user, 'You are not allowed to delete user');
    if (user.id === id) {
      throw new ApiError(`You can not delete your own account`, 409);
    }

    const account = await User.findById(id);
    await account.remove();
    return id;
  }
}

module.exports = UserService;
