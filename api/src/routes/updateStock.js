const { Router } = require("express");
const { Product, ProductDetail, Category } = require("../db");
const router = Router();

router.patch("/restar", async (req, res) => {
	const { productsChanged } = req.body;
	// productsChanged = [
	// 	{
	// 		id: 0,
	// 		brandSize: "",
	// 		quantity: 0,
	// },
	// {
	// 		"id": 200324673,
	//    "brandSize": "US 5",
	//    "quantity": 10
	// 	},
	// ];

	for (let product of productsChanged) {
		const { id, brandSize, quantity } = product;
		let productFound = await Product.findByPk(id);
		let productDetailFound = await ProductDetail.findByPk(id);

		console.log("Anterior", productDetailFound.variants);

		productDetailFound.variants = productDetailFound.variants.map((variant) => {
			if (variant.brandSize === brandSize) {
				return {
					...variant,
					stock: variant.stock - quantity,
					isInStock: variant.stock - quantity > 0 ? true : false,
				};
			}

			return variant;
		});

		await productDetailFound.save();

		const isThereProducts = productDetailFound.variants.reduce(
			(totalStock, variant) => totalStock + variant.stock,
			0,
		);

		if (isThereProducts < 1) {
			await productFound.update({ isInStock: false });
			await productFound.save();
		}
	}

	res.status(200).send("Stock actualizado");
});

router.patch("/sumar", async (req, res) => {
	const { productsChanged } = req.body;

	for (let product of productsChanged) {
		const { id, brandSize, quantity } = product;

		let productFound = await Product.findByPk(id);
		let productDetailFound = await ProductDetail.findByPk(id);

		productDetailFound.variants = await productDetailFound.variants.map(
			(variant) => {
				if (variant.brandSize === brandSize) {
					return {
						...variant,
						stock: variant.stock + quantity,
						isInStock: variant.stock + quantity > 0 ? true : false,
					};
				}

				return variant;
			},
		);

		await productDetailFound.save();

		const isThereProducts = productDetailFound.variants.reduce(
			(totalStock, variant) => totalStock + variant.stock,
			0,
		);

		if (isThereProducts > 1) {
			await productFound.update({ isInStock: true });
			await productFound.save();
		}
	}

	res.status(200).send("Stock actualizado");
});

module.exports = router;
