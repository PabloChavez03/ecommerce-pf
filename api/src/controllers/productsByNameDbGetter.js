const setDDBBproducts = require("./productsDbSetter");

const { Product, Category } = require("../db");

async function getDDBBproducts(categoryId) {
	const products = await Product.findAll({
		include: {
			model: Category,
			where: { id: categoryId },
			through: {
				attributes: [],
			},
		},
	});

	if (products.length) {
		return products;
	} else {
		await setDDBBproducts(categoryId);
		return await Product.findAll({
			include: {
				model: Category,
				where: { id: categoryId },
				through: {
					attributes: [],
				},
			},
		}).catch((e) => console.log(e.message));
	}
}

module.exports = getDDBBproducts;
