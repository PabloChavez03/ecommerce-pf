const getDDBBproducts = require("./services/productsDB.getter.service");

const { Router } = require("express");
const router = Router();

router.get("", async (req, res) => {
	const { name } = req.query;

	const countriesFound = name
		? await getDDBBproducts(name)
		: await getDDBBproducts();

	countriesFound.length > 0
		? res.status(200).send(countriesFound)
		: res.send("Not found");
});

module.exports = router;
