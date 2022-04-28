// const getDDBBproducts = require("./services/productsDB.getter.service");
const getApiProductsDetail = require("./services/productsDetailApi.getter.service")

const { Router } = require("express");
const router = Router();

router.get("/:productId", async (req, res) => {
	// const { categoryId } = req.query;
	const { productId } = req.params
	// console.log(categoryId)
	
	const productsDetailFound = await getApiProductsDetail(productId);

	res.status(200).send(productsDetailFound);
});

module.exports = router;
