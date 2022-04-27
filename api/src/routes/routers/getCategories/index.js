const getDDBBcategories = require("./services/categoriesDB.getter.service");

const { Router } = require("express");
const router = Router();

router.get("", async (req, res) => {
	const categoriesFound = await getDDBBcategories();

	res.status(200).send(categoriesFound);
});

module.exports = router;
