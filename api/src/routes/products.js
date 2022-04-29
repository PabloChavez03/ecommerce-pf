const getDDBBproducts = require("../controllers/productsDbGetter");
const getAPIproducts = require("../controllers/productsByNameApiGetter");

const { Router } = require("express");
const router = Router();

router.get("", async (req, res) => {
	const { categoryId, productName } = req.query;

	if (productName) {
		const productsFound = await getAPIproducts(productName);
		res.json(productsFound);
	}

	if (categoryId) {
		const productsFound = await getDDBBproducts(categoryId);
		res.json(productsFound);
	}
});

module.exports = router;
