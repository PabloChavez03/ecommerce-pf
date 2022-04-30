const { Router } = require("express");
const { Product, Category } = require("../../db");
const router = Router();

router.post("", async (req, res) => {
	let {
		name,
		image,
		previousPrice,
		isOffertPrice,
		currentPrice,
		brandName,
		colour,
		Categories,
	} = req.body;

	var newId = function () {
		return Number(Math.random() + Date.now());
	};

	const id = newId();
	console.log(id);

	try {
		let [productCreated, created] = await Product.findOrCreate({
			where: {
				name,
				image,
				previousPrice,
				isOffertPrice,
				currentPrice,
				brandName,
				colour,
			},
			defaults: {
				id,
			},
		});

		console.log(productCreated);

		if (created) {
			res.status(200).send("Producto creado con exito!");
		} else {
			res.status(404).send("Producto existente");
		}
	} catch (e) {
		console.log(e.message);
	}

	// let categoriDb = await Category.findAll({
	// 	where: { id: Categories },
	// });
	// await productCreated.addCategory(categoriDb);

	// } catch (error) {
	// 	return new TypeError(error);
	// }
});

module.exports = router;
