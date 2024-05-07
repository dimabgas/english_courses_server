module.exports = (route) => {
  return async (request, response, next) => {
    try {
      await route(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};
