const { Router } = require("express");
const router = Router();
const { Users } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { user_name, user_password } = req.body;

  try {
    const user = await Users.findOne({ where: { user_name } });

    //   console.log(user)

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(user_password, user.user_password);

    const userForToken = {
      id: user.legajo_user,
      username: user.user_name,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: "invalid user or password",
      });
    } else {
      res.status(200).send({
        rol: user.rol,
        username: user.user_name,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
