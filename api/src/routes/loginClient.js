const { Router } = require("express");
const router = Router();
const { Cliente } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { login_name, login_password } = req.body;
  try {
    const client = await Cliente.findOne({ where: { login_name } });

    //   console.log(user)

    const passwordCorrect =
      client === null
        ? false
        : await bcrypt.compare(login_password, client.login_password);

    const userForToken = {
      id: client.phone,
      login_name: client.login_name,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    if (!(client && passwordCorrect)) {
      res.status(401).json({
        error: "invalid user or password",
      });
    } else {
      res.status(200).send({
        login_name: client.login_name,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
});

module.exports = router;
