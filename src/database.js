const mongoose = require("mongoose");
const config = require("./config");

exports.connection = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.mongoDB.databaseUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    mongoose.connection.on("connected", () => {
      console.log(`Connection has been established successfully.`);
      resolve();
    });

    mongoose.connection.on("error", (err) => {
      console.log(`Unable to connect to the database: ${err}`);
      reject(err);
    });
  });
};
