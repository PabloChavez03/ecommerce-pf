const getDDBBproducts = require("./services/productsDB.getter.service");

const { Router } = require("express");
const router = Router();

router.get("/:categoryId", async (req, res) => {
	// const { categoryId } = req.query;
	//brayan lo pasa por query yo (pablo) por params
	const { categoryId } = req.params
	// console.log(categoryId)
	
	const productsFound = await getDDBBproducts(categoryId);

	res.json(productsFound);
});

module.exports = router;
