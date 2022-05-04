const getDDBBproducts = require("../controllers/productsDbGetter");
const getDDBBproductsByName = require("../controllers/productsByNameDbGetter");

const { Router } = require("express");
const router = Router();

router.get("", async (req, res) => {
	const { categoryId, productName } = req.query;

	if (productName) {
		const productsFound = await getDDBBproductsByName(productName);
		res.json(productsFound);
	}

	if (categoryId) {
		const productsFound = await getDDBBproducts(categoryId);
		res.json(productsFound);
	}
});

module.exports = router;
