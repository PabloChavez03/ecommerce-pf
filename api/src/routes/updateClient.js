const { Router } = require("express");
const { Cliente } = require("../db");
const bcrypt = require("bcrypt");
const router = Router();

router.patch("/:dni_client", async (req, res) => {
  const {
    phone,
    email,
    login_name,
    login_password,
    lastname,
    address,
    isRegistered,
    name,
  } = req.body;

  const { dni_client } = req.params;
  console.log(req.params);
  console.log(req.body);

  const saltRounds = 10;
  let newPassword = await bcrypt.hash(login_password, saltRounds);
  try {
    const modified = Cliente.update(
      {
        phone,
        dni_client,
        email,
        login_name,
        login_password: newPassword,
        lastname,
        address,
        isRegistered,
        name,
      },
      {
        where: { dni_client },
      }
    );
    res.status(200).json(`${modified} Cliente actualizado con Éxito`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
