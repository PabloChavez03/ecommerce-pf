const { Router } = require("express");
const { Users, Product, Role } = require("../db");
const router = Router();
// const bcrypt = require("bcrypt");

router.post("/:user_name", async (req, res) => {
	const { user_name } = req.params;
	const { productId, action, token } = req.body;

	let user = await Users.findByPk(user_name);
	const product = await Product.findByPk(productId);

	if (action === "add") {
		await user.addProduct(product);

		user = await Users.findByPk(user_name, {
			include: [{ model: Product }, { model: Role }],
		});

		// console.log(JSON.stringify(user, null, 2));

		res.status(200).json({
			rol: user.Role?.name,
			username: user.user_name,
			password: user.user_password,
			phone: user.phone,
			legajo: user.legajo_user,
			dni: user.dni_client,
			email: user.email,
			name: user.name,
			lastname: user.lastname,
			address: user.address,
			isRegistered: user.isRegistered,
			Products: user.Products,
			token,
		});
	}

	if (action === "remove") {
		await user.removeProduct(product);

		user = await Users.findByPk(user_name, {
			include: [{ model: Product }, { model: Role }],
		});

		// console.log(JSON.stringify(user, null, 2));

		res.status(200).json({
			rol: user.Role?.name,
			username: user.user_name,
			password: user.user_password,
			phone: user.phone,
			legajo: user.legajo_user,
			dni: user.dni_client,
			email: user.email,
			name: user.name,
			lastname: user.lastname,
			address: user.address,
			isRegistered: user.isRegistered,
			Products: user.Products,
			token,
		});
	}
});

module.exports = router;
