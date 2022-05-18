const getDDBBproductDetail = require("../controllers/productsDetailDbGetter");

const { Router } = require("express");
const router = Router();

router.get("/:productId", async (req, res) => {
	const { productId } = req.params;

	const productsDetailFound = await getDDBBproductDetail(productId);

	productsDetailFound
		? res.status(200).send(productsDetailFound)
		: res.status(404).send("Not found");
});

module.exports = router;
