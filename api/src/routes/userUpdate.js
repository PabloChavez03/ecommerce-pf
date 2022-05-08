const { Router } = require("express");
const { Users,Role } = require("../db");
// const bcrypt = require("bcrypt");
const router = Router();

router.patch("/:user_name", async (req, res) => {
  const {
    user_password,
    phone,
    email,
    lastname,
    address,
    isRegistered,
    name,
    rol,
    legajo_user,
  } = req.body;

  let { user_name } = req.params;

  //rol?

  // const saltRounds = 10;
  // let newPassword = await bcrypt.hash(user_password, saltRounds);

  try {

    const user = await Users.findOne({where : { user_name }});

    console.log(user)

    await user.update({ legajo_user, user_password, phone, email, lastname, address, isRegistered, name });

    if (rol) {
    const role = await Role.findOne({where : {name: rol}});
    await user.setRole(role);
    }

    // console.log(role);


    await user.save();

    res.status(200).send(`${user.user_name} Usuario modificado`)
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
