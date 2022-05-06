const route = require("express").Router();
const {
  addClient,
} = require("../src/controllers/client");

route.post("/", addClient);


module.exports = route;