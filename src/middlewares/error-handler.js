module.exports = (error, request, response, next) => {
  console.log(`Something went wrong! Error: ${error.message}`);
  response
    .status(error.status ? error.status : 500)
    .send({ error: error.message });
};
