const route = require("express").Router();
const {
  addClient,
} = require("../controllersClient/index");

route.post("/", addClient);


module.exports = route;