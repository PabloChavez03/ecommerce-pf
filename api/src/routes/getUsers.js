const { Router } = require("express");
const { Users } = require("../db");
const router = Router();

router.get("", async (req, res) => {
	let allUser = await Users.findAll();

	try {
		allUser
			? res.status(200).send(allUser)
			: res.status(404).send("Usuarios no encontrados");
	} catch (error) {
		return new TypeError(error);
	}
});


module.exports = router;