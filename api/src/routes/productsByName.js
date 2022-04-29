// const getDDBBproducts = require("./services/productsDB.getter.service");
const getAPIproducts = require("../controllers/productsByNameApiGetter");

const { Router } = require("express");
const router = Router();

router.get("", async (req, res) => {
	const { productName } = req.query;

	console.log(productName);

	if (productName) {
		const productsFound = await getAPIproducts(productName);

		res.json(productsFound);
	}
});

module.exports = router;
