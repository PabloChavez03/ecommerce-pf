const getDDBBproductDetail = require("./services/productsDetailDB.getter.service");

const { Router } = require("express");
const router = Router();

router.get("/:productId", async (req, res) => {
	const { productId } = req.params;

	const productsDetailFound = await getDDBBproductDetail(productId);

	res.status(200).send(productsDetailFound);
});

module.exports = router;
