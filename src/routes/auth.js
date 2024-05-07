const router = require("express").Router();
const passport = require("passport");
const isAuthenticated = require("../middlewares/is-authenticated");

const requestWrap = require("../middlewares/request-wrap");

const AuthController = require("../controllers/auth");
const authController = new AuthController();

router.post("/api/sign-up", requestWrap(authController.register));
router.post(
  "/api/sign-in",
  passport.authenticate("local"),
  authController.login
);
router.delete("/api/logout", isAuthenticated, authController.logout);

router.get("/api/check-is-auth", isAuthenticated, authController.checkIsAuth);

module.exports = router;
