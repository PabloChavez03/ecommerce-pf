const { Router } = require("express");
const { Users, Role } = require("../db");
// const bcrypt = require("bcrypt");
const router = Router();

router.patch("/:user_name", async (req, res) => {
	const {
		username,
		password,
		dni,
		email,
		address,
		name,
		lastname,
		phone,
		rol,
		legajo_user,
		isRegistered,
	} = req.body;

	let { user_name } = req.params;

	//rol?

	// const saltRounds = 10;
	// let newPassword = await bcrypt.hash(user_password, saltRounds);

	// try {
	const user = await Users.findOne({ where: { user_name } }).catch((e) => e);

	await user
		.update({
			user_name: username,
			user_password: password,
			dni_client: dni,
			email,
			address,
			name,
			lastname,
			phone,
			legajo_user,
			isRegistered,
		})
		.catch((e) => e);

	if (rol) {
		const role = await Role.findOne({ where: { name: rol } });
		await user.setRole(role);
	}

	await user.save();

	// const userWithRole = await Users.findOne({
	// 	where: { user_name },
	// 	include: {
	// 		model: Role,
	// 	},
	// });

	res.status(200).send(user);
	// } catch (error) {
	// 	return res.status(409).json({ conflitcs: error });
	// }
});

module.exports = router;
