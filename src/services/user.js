const UserRepository = require("../repositories/user");
const userRepository = new UserRepository();

const BaseSerializer = require("../helpers/serializers/base.serializer");

class UserService {
  async create(user) {
    if (user) {
      const foundedUser = await userRepository.findOne({ email: user.email });

      if (foundedUser) {
        throw new Error(
          `User with this email (${user.email}) is already exist.`
        );
      } else {
        return await userRepository.create(user);
      }
    }
    throw new Error(`There isn't any data for creating.`);
  }

  async getUser(id) {
    const userById = await userRepository.findById(id);
    return new BaseSerializer(userById).serialize("courses");
  }
}

module.exports = UserService;
