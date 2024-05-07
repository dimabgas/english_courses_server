const authRoute = require("../routes/auth");
const courseRoute = require("../routes/course");
const userRoute = require("../routes/user");
const lessonRoute = require("../routes/lesson");

module.exports = (app) => {
  app.use(authRoute);
  app.use(courseRoute);
  app.use(userRoute);
  app.use(lessonRoute);
};
