const jwt = require("jsonwebtoken");
const { Users, Role } = require("../db");

const authMaster = async (req, res, next) => {
  //----------------------------AUTHORIZATION--------------------------------------------------------
  const authorization = req.get("authorization");

  let token = null;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodedToken = {};

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log(error);
  }

  req.userName = decodedToken.username;
  req.role = decodedToken.role;

  // const user = await Users.findByPk(req.userId);
  // console.log(decodedToken.id)
  // console.log(user)
  // if (!user) {
  //   return res.status(401).son({ message: "user not found" });
  // }

  if (!token || !decodedToken.username) {
    return res.status(401).json({ error: "token is missing or invalid!" });
  }
  //------------------------------------------------------------------------------------

  next();
};

const isAdmin = async (req, res, next) => {
  // const user = await Users.findByPk(req.userId);
  const role = await Role.findByPk(req.role);
  // console.log(role.name);
  if (role.name === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "require admin role" });
  }

  // console.log(role)
};

const isClient = async (req, res, next) => {
  const role = await Role.findByPk(req.role);
  if (role.name === "client") {
    next();
  }

  return res.status(403).json({ message: "" });
};

module.exports = {
  authMaster,
  isAdmin,
};
