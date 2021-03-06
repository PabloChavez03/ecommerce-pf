const { Router } = require("express");
const { Product, ProductDetail, Category } = require("../db");
const router = Router();

router.patch("/:id", async (req, res) => {
	let {
		name,
		description,
		info,
		gender,
		brandName,
		images,
		isOffertPrice,
		previousPrice,
		currentPrice,
		color,
		variants,
		CategoryId,
	} = req.body;

	let { id } = req.params;

	let product = await Product.findByPk(id);
	let productDetail = await ProductDetail.findByPk(id);

	const isThereProducts = variants.reduce(
		(totalStock, variant) => totalStock + variant.stock,
		0,
	);

	if (product) {
		await product
			.update({
				id,
				name,
				image: images[0],
				isOffertPrice,
				previousPrice,
				currentPrice,
				brandName,
				color,
				isInStock: isThereProducts ? true : false,
				CategoryId,
			})
			.catch((e) => e.message);

		let categoryDDBB = await Category.findByPk(CategoryId);
		if (categoryDDBB) await product.setCategory(categoryDDBB);

		// category.forEach(async (el) => {
		// 	let categoryDDBB = await Category.findByPk(el);
		// 	await product.addCategory(categoryDDBB);
		// });

		await product.save();

		if (productDetail) {
			await productDetail
				.update({
					id,
					name,
					description,
					info,
					gender,
					brandName,
					images,
					isOffertProduct: isOffertPrice,
					previousPrice,
					currentPrice,
					color,
					variants,
					CategoryId,
				})
				.catch((e) => e.message);

			await productDetail.save();

			let categoryDDBB = await Category.findByPk(CategoryId);
			if (categoryDDBB) await productDetail.setCategory(categoryDDBB);
		}

		res.status(201).send(`Producto modificado`);
	} else {
		res.statusCode(404);
	}
});

module.exports = router;
