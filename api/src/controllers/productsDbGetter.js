const setDDBBproducts = require("./productsDbSetter");

const { Product, Category } = require("../db");

async function getDDBBproducts(categoryId) {
	const products = await Product.findAll({
		where: {
			CategoryId: categoryId,
		},
		include: {
			model: Category,
		},
	});

	if (products.length) {
		return products;
	} else {
		await setDDBBproducts(categoryId);
		return await Product.findAll({
			where: {
				CategoryId: categoryId,
			},
			include: {
				model: Category,
			},
		}).catch((e) => console.log(e.message));
	}
}

module.exports = getDDBBproducts;
