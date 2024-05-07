const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const UserRepository = require("./repositories/user");
const userRepository = new UserRepository();

const BaseSerializer = require("./helpers/serializers/base.serializer");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await userRepository.findOne({ email });

      try {
        if (user) {
          const passwordIsValid = await user.validPassword(password);

          if (passwordIsValid) {
            const serializedUser = new BaseSerializer(user).serialize();

            return done(null, serializedUser);
          } else {
            return done(new Error("Email or password is incorrect!"));
          }
        } else {
          return done(new Error("Email or password is incorrect!"));
        }
      } catch (error) {
        throw new Error("Email or password is incorrect!");
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userRepository.findById(id);
  done(null, user);
});

module.exports = passport;
