const { Router } = require("express");
const { Product, ProductDetail } = require("../db");
const router = Router();

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	console.log(req.params);

	const deleted = await Product.destroy({
		where: {
			id,
		},
	});

	await ProductDetail.destroy({
		where: {
			id,
		},
	});

	await res.status(200).send(`${deleted} Eliminado`);
});

module.exports = router;
