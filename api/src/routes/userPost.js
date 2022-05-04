const { Router } = require("express");
const { Users } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// SECRET_KEY

//   SANTEAGUEÑO VIGILANTE

router.post("/", async (req, res) => {
  const { legajo_user, user_name, user_password, rol } = req.body;
  // const user = await Users.findOne({user_name})
  // const passwordCorrect = user === null ? false : await bcrypt.compare(user_password, user.passwordHash)
  try {
    const saltRam = 10;
    const passwordHash = await bcrypt.hash(user_password, saltRam);

    const user = await Users.create({
      legajo_user,
      user_name,
      user_password: passwordHash,
      rol,
    });

    const createdUser = await user.save();

    createdUser
      ? res.status(200).json(createdUser + "creado")
      : res.sendStatus(404);
  } catch (error) {
    res.status(500).json({ error: error.parent.detail})
  }
    
});

module.exports = router;
