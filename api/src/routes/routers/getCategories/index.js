const getDDBBcategories = require("./services/categoriesDB.getter.service");
// const getAPIcategories = require("./services/categoriesApi.getter.service");

const { Router } = require("express");
const router = Router();

router.get("", async (_req, res) => {
	const categoriesFound = await getDDBBcategories();

	res.json(categoriesFound);
});

module.exports = router;
