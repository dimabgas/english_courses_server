const User = require("../models/user");

class UserRepository {
  create(userData) {
    const user = new User(userData);

    return user.save();
  }

  findOne(condition) {
    return User.findOne(condition);
  }
  findById(id) {
    return User.findById(id);
  }
}

module.exports = UserRepository;
