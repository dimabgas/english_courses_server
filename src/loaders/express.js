const express = require("express");
const cors = require("cors");

var corsOptions = {
  // origin: "http://localhost:3000/",
  credentials: true,
};

module.exports = (app) => {
  app.use(express.urlencoded({ extended: false })).use(express.json());
  app.use(cors(corsOptions));
};
