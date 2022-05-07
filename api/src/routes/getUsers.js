const { Router } = require("express");
const { Users, Role } = require("../db");
const router = Router();

router.get("", async (req, res) => {
	let allProducts = await Users.findAll();

	try {
		allProducts
			? res.status(200).send(allProducts)
			: res.status(404).send("Productos no encontrados");
	} catch (error) {
		return new TypeError(error);
	}
});




// const getAllDbInfo = async () => {
// 	let allInfo = await Product.findAll({
// 		include: {
// 			model: Category,
// 		},
// 	});
// 	return allInfo;
// };

module.exports = router;