const UserService = require("../services/user");
const userService = new UserService();

class AuthController {
  async register(request, response) {
    try {
      await userService.create(request.body);

      response.status(200).send({ success: true });
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async login(request, response) {
    try {
      const user = await userService.getUser(request.user.id);

      response.status(200).send(user);
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async logout(request, response) {
    request.logout();
    response.status(204).end();
  }

  async checkIsAuth(request, response) {
    try {
      response.status(200).send({ success: true });
    } catch (error) {
      response.sendStatus(401);
    }
  }
}

module.exports = AuthController;
