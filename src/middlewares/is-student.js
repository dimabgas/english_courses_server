const constants = require("../config/constants");

module.exports = (request, response, next) => {
  if (request.user.roles.includes(constants.user.roles.student)) {
    return next();
  } else {
    response.status(403).send({
      error: "You can't be a member of this course. Maybe you are a teacher...",
    });
  }
};
