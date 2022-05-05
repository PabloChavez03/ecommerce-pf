const jwt = require('jsonwebtoken');

const authMaster = (req,res,next) => {
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

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token is missing or invalid!" });
  }
  //------------------------------------------------------------------------------------

  next();
}



module.exports = authMaster;