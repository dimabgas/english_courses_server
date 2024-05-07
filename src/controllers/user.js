const UserService = require("../services/user");
const userService = new UserService();

class UserController {
  async getUser(request, response) {
    try {
      const user = await userService.getUser(request.user.id);

      response.status(200).send(user);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }
}

module.exports = UserController;
