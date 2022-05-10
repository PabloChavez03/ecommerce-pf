const { Router } = require("express");
const { Users, Role } = require("../db");
const router = Router();
// const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
  const {
    legajo_user,
    user_name,
    user_password,
    rol,
    phone,
    dni_client,
    email,
    name,
    lastname,
    address,
  } = req.body;
  try {
    // const saltRam = 10;
    // const passwordHash = await bcrypt.hash(user_password, saltRam)
    
    const [user, created] = await Users.findOrCreate({
      where: {
        legajo_user,
        user_name,
        user_password /*passwordHash*/,
        phone,
        dni_client,
        email,
        name,
        lastname,
        address,
      },
    });

    if (rol) {
      const foundRol = await Role.findOne({ where: { name: rol } });
      await user.setRole(foundRol);
    } else {
      const roleClient = await Role.findOne({ where: { name: "client" } });
      await user.setRole(roleClient);
    }
   

    await user.save();

    created ? res.status(201).json(user + "creado") : res.status(409).json({message: "user exists"});
     
  } catch (error) {
    console.log(error);
    res.status(409).json({ error });
  }
});

module.exports = router;
