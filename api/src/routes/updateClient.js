const { Router } = require("express");
const { Users, Role } = require("../db");
// const bcrypt = require("bcrypt");
const router = Router();

router.patch("", async (req, res) => {
	const { user_name, rol } = req.body;

	try {
		const user = await Users.findOne({
			where: { user_name },
		}).catch((e) => console.log(e));

		if (rol) {
			const role = await Role.findOne({ where: { name: rol } });
			console.log("role", role);
			await user.setRole(role);
		}

		await user.save();

		const userModified = await Users.findOne({
			where: { user_name },
			include: { model: Role },
		}).catch((e) => console.log(e));

		res.status(200).send(userModified);
	} catch (error) {
		return res.status(409).json({ conflitcs: error });
	}
});

module.exports = router;
