const getDDBBproducts = require("./services/productsDB.getter.service");

const { Router } = require("express");
const router = Router();

router.get("", async (req, res) => {
	const { categoryId } = req.query;

	if (categoryId) {
		const productsFound = await getDDBBproducts(categoryId);

		res.json(productsFound);
	}
});

module.exports = router;
