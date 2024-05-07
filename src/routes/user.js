const router = require("express").Router();
const isAuthenticated = require("../middlewares/is-authenticated");

const UserController = require("../controllers/user");
const userController = new UserController();

router.use(isAuthenticated);

router.get("/api/user", userController.getUser);

module.exports = router;
