const mongoose = require('mongoose');

// const bcrypt = require('bcrypt');

// const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "login can't be empty"],
    index: true,
  },
  password: {
    type: String,
    required: [true, "password can't be empty"],
    select: false,
  },
  name: {
    type: String,
    required: [true, "user name can't be empty"],
  },
});

// UserSchema.pre('save', function preSave(next) {
//   if (!this.isModified('password') && !this.isNew) {
//     next();
//   } else {
//     bcrypt.genSalt(SALT_WORK_FACTOR, (getSaltError, salt) => {
//       if (getSaltError) {
//         next(getSaltError);
//       } else {
//         bcrypt.hash(this.password, salt, (hashError, hash) => {
//           if (hashError) {
//             next(hashError);
//           } else {
//             this.password = hash;
//             next();
//           }
//         });
//       }
//     });
//   }
// });

UserSchema.methods.comparePassword = function comparer(password) {
  const userPassword = this.password;
  return new Promise((resolve /* , reject */) => {
    resolve(password === userPassword);
    // bcrypt.compare(password, userPassword, (compareError, match) => {
    //   if (compareError) {
    //     reject(compareError);
    //   } else {
    //     resolve(match);
    //   }
    // });
  });
};

UserSchema.methods.toDTO = function toDTO() {
  return {
    id: this._id,
    login: this.login,
    name: this.name,
  };
};

UserSchema.methods.smallDTO = function smallDTO() {
  return {
    id: this._id,
    login: this.login,
    name: this.name,
  };
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
