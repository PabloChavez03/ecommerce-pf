const route = require("express").Router();
const {
  addClient,
} = require("../controllers/client");

route.post("/", addClient);


module.exports = route;