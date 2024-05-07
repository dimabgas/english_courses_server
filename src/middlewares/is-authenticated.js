module.exports = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  } else {
    response.status(401).send({ error: "You are not authenticate" });
  }
};
