const getDDBBcategories = require("../controllers/categoriesDbGetter");

const { Router } = require("express");
const router = Router();

router.get("", async (_req, res) => {
	const categoriesFound = await getDDBBcategories();

	res.json(categoriesFound);
});

module.exports = router;
