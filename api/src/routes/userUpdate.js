const { Router } = require("express");
const { Users } = require("../db");
const bcrypt = require("bcrypt");
const router = Router();

router.patch("/:legajo_user", async (req, res) => {
  const { user_name, user_password, rol } = req.body;
  let { legajo_user } = req.params;

  try {
   const modified = Users.update({ legajo_user, user_name, user_password, rol}, {
        where: {legajo_user}
    });
    res.status(200).send(`${modified} Usuario modificado`)
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
