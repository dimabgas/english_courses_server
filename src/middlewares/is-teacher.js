const constants = require("../config/constants");

module.exports = (request, response, next) => {
  if (request.user.roles.includes(constants.user.roles.teacher)) {
    return next();
  } else {
    response.status(403).send({ error: "You can not create a course." });
  }
};
