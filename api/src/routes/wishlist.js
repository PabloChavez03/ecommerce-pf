const { Router } = require("express");
const { Users, Product } = require("../db");
const router = Router();
// const bcrypt = require("bcrypt");

router.post("/:user_name", async (req, res) => {
	const { user_name } = req.params;
	const { productId, action } = req.body;

	console.log(user_name);
	console.log(productId);

	const user = await Users.findByPk(user_name);
	const product = await Product.findByPk(productId);

	if (action === "add") {
		user.addProduct(product);

		res
			.status(200)
			.json(
				`Producto con id ${productId} agregado a la wishlist de ${user_name}`,
			);
	}

	if (action === "remove") {
		user.removeProduct(product);

		res
			.status(200)
			.json(
				`Producto con id ${productId} eliminado de la wishlist de ${user_name}`,
			);
	}
});

module.exports = router;
