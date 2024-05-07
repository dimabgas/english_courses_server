require("dotenv").config();

const database = require("./database");
const server = require("./server");

(async () => {
  try {
    await database.connection();
    server.start();
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
})();
