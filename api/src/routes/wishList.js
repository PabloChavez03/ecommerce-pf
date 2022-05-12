const { Router } = require("express");
const { Review, Users, ProductDetail, Role } = require("../db");

const router = Router();

router.post("/:user_name", async (req, res) => {
	// try {
	const { user_name, product } = req.params;

	const user = await Users.findByPk(user_name);

	user.wishList;

	res.send(clientFound);
	// } catch (e) {
	// 	console.log(e);
	// }
});

module.exports = router;
