const { Router } = require("express");
const router = Router();
const { Users, Role, Product } = require("../db");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	const { user_name, user_password } = req.body;
	console.log(req.body)
	try {
		const user = await Users.findOne({
			where: { user_name },
			include: [{ model: Role }, { model: Product }],
		});
		// const roleOfUser = await Role.findOne({
		// 	where: { UserUserName: user.user_name },
		// }).catch((e) => console.log(e));
		// console.log(roleOfUser.id);
		// console.log(JSON.stringify(user, null, 2));

		const passwordCorrect =
			user === null
				? false
				: user_password ===
				  user.user_password; /*await bcrypt.compare(user_password, user.user_password);*/

		const userForToken = {
			// id: user.legajo_user,
			role: user.Role?.id,
			username: user.user_name,
		};

		const token = jwt.sign(userForToken, process.env.SECRET);

		if (!(user && passwordCorrect)) {
			res.status(401).json({
				error: "invalid user or password",
			});
		} else {
			res.status(200).send({
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
	} catch (error) {
		res.status(409).json({ error: error });
	}
});

module.exports = router;
