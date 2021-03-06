const { Router } = require("express");
const { Cliente } = require("../src/db");
const router = Router();
// const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const {
    phone,
    dni_client,
    email,
    login_name,
    name,
    lastname,
    address,
    isRegistered,
  } = req.body;
  console.log(req.body);



  try {
    // const saltRam = 10;
    // const passwordHash = await bcrypt.hash(login_password, saltRam);

    const client = await Cliente.create({
      phone,
      dni_client,
      email,
      login_name,
      name,
      lastname,
      address,
      isRegistered,
    });

    const createdUser = await client.save();

    createdUser
      ? res.status(200).json(createdUser + "creado")
      : res.sendStatus(404);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
