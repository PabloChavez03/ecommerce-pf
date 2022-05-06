const { Router } = require("express");
const router = Router();
const { Users,Role } = require("../db");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { user_name, user_password } = req.body;

  try {
    const user = await Users.findOne({ where: { user_name } });
    const roleOfUser = await Role.findOne({where: {UserUserName: user.user_name}})
      // console.log(roleOfUser.id)
      // console.log(user)

    const passwordCorrect =
      user === null
        ? false
        : user_password === user.user_password/*await bcrypt.compare(user_password, user.user_password);*/

    const userForToken = {
      // id: user.legajo_user,
      role: roleOfUser.id,
      username: user.user_name,
    };

    console.log(userForToken)

    const token = jwt.sign(userForToken, process.env.SECRET);

    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: "invalid user or password",
      });
    } else {
      res.status(200).send({
        rol: roleOfUser.name,
        username: user.user_name,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
