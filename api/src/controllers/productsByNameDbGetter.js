const setDDBBproducts = require("./productsDbSetter");

const { Product, Category } = require("../db");

async function getDDBBproductsByName(productName) {
	const products = await Product.findAll({
		include: {
			model: Category,
		},
	});

	const productsFiltered = products.filter((el) =>
		el.name.toLowerCase().includes(productName.toLowerCase()),
	);

	return productsFiltered;
}

module.exports = getDDBBproductsByName;
