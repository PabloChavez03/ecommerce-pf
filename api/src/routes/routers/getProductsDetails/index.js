const getDDBBproducts = require("./services/productsDB.getter.service");

const { Router } = require("express");
const router = Router();

router.get("/:categoryId", async (req, res) => {
	// const { categoryId } = req.query;
	const { categoryId } = req.params
	// console.log(categoryId)

	const productsFound = await getDDBBproducts(categoryId);

	res.status(200).send(productsFound);
});

module.exports = router;
