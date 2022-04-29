const { Router } = require("express");
// const { Carrito, Cliente } = require("../../db");
const {
//   getCarrito,
  updateCarrito,
//   deleteCarrito,
} = require("../controllers/carrito");

const router = Router();

router.patch("/:id", async (req, res) => {
    try {
        let { id } = req.params;    
      let { name } = req.body;

      console.log(id, "mati gato")
      console.log(name,"soyCarrito")
    let response = await updateCarrito(name, id);
    console.log(response)
    return response ? res.status(200).json(response) : res.status(404);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Error en el servidor");
  }
});

module.exports = router;
