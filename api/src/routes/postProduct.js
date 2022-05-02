const { Router } = require("express");
const { Product, Category, ProductDetail } = require("../db");
const router = Router();

router.post("", async (req, res) => {
	let {
		name,
		description,
		info,
		gender,
		brandName,
		images,
		previousPrice,
		isOffertPrice,
		currentPrice,
		colour,
		variants,
		category,
	} = req.body;

	var newId = function () {
		return parseInt((Math.random() + Date.now()).toString().substring(7));
	};

	const id = newId();

	try {
		let [productCreated, created] = await Product.findOrCreate({
			where: {
				id,
				name,
				image: `https://${images[0]}`,
				previousPrice,
				isOffertPrice,
				currentPrice,
				brandName,
				colour,
			},
		});

		category.forEach(async (el) => {
			let categoryDDBB = await Category.findByPk(el);
			await productCreated.addCategory(categoryDDBB);
		});

		// if (created) {
		// 	res.status(200).send("Creado con exito en tabla Product!");
		// } else {
		// 	res.status(404).send("Producto existente");
		// }
	} catch (e) {
		console.log(e.message);
	}

	try {
		let [productCreated, created] = await ProductDetail.findOrCreate({
			where: {
				id,
				name,
				description,
				info,
				gender,
				brand: brandName,
				images,
				previousPrice,
				isOffertProduct: isOffertPrice,
				currentPrice,
				variants: variants.map((el) => {
					return { ...el, colour: colour };
				}),
			},
		});

		category.forEach(async (el) => {
			let productDDBB = await Product.findByPk(id);
			await productCreated.setProduct(productDDBB);
		});

		if (created) {
			res.status(200).send("Detalles creados exitosamente!");
		} else {
			res.status(404).send("Producto existente");
		}
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
