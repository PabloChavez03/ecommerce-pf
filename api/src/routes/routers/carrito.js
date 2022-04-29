const { Router } = require('express');
const { Carrito, Cliente } = require("../../db");
const { getCarrito, updateCarrito, deleteCarrito } = require("../../controllers/Carrito");

const router = Router();

router.put('/:id', async (req, res) => {

    let { carrito_product } = req.body;
    let { id } = req.params;

    try {
      
        let response = await updateCarrito(carrito_product, id);
        return response ? res.status(200).json(response) : res.status(404);


    } catch (e) {
        console.log(e);
        return res.status(500).json('Error en el servidor')
    }



}

);

module.exports = router;