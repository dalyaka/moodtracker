const { User } = require('../model/User');
const { ApiError } = require('../api/common');

class AuthService {
  static async login(login, password) {
    const user = await User.findOne({ login })
      .select('+password')
      .exec();

    if (!user) {
      throw new ApiError('User is not registered', 200);
    }
    const matched = await user.comparePassword(password);
    if (!matched) {
      throw new ApiError('Invalid password', 200);
    }
    return user.toDTO();
  }

  static async signup(login, password) {
    const existing = await User.findOne({ login }).exec();
    if (existing) {
      throw new ApiError('User with this login already exists', 200);
    }
    const user = new User({
      login,
      password,
    });
    await user.save();
    return user.toDTO();
  }

  static async find(id) {
    const user = await User.findById(id).exec();
    if (!user) {
      throw new ApiError('User not found', 400);
    }
    return user.toDTO();
  }
}

module.exports = AuthService;
