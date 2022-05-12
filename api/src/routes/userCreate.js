const { Router } = require("express");
const { Users, Role } = require("../db");
const router = Router();
// const bcrypt = require("bcrypt");

router.post("", async (req, res) => {
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

	console.log(req.body);

	var newLegajo = function () {
		return parseInt((Math.random() + Date.now()).toString().substring(7));
	};
	const legajo = newLegajo();

	const [user, created] = await Users.findOrCreate({
		where: {
			legajo_user: legajo_user
				? typeof legajo_user === "string"
					? Number(legajo_user)
					: legajo_user
				: legajo,
			user_name,
			user_password /*passwordHash*/,
			phone: phone ? phone : null,
			dni_client: dni_client
				? typeof dni_client === "string"
					? Number(dni_client)
					: dni_client
				: null,
			email: email ? email : null,
			name: name ? name : null,
			lastname: lastname ? lastname : null,
			address: address ? address : null,
		},
	}).catch((e) => console.log(e));

	if (rol) {
		const foundRol = await Role.findOne({ where: { name: rol } });
		await user.setRole(foundRol);
	} else {
		const roleClient = await Role.findOne({ where: { name: "client" } });
		await user.setRole(roleClient);
	}

	await user.save();

	created
		? res.status(201).json(user + "creado")
		: res.status(409).json({ message: "user exists" });
	} catch (error) {
		res.status(409).json({ error: error });
	}
});

module.exports = router;
