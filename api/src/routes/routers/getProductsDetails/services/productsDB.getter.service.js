const setDDBBproducts = require("./productsDB.setter.service");

const { Product, Category } = require("../../../../db");

async function getDDBBproducts(categoryId) {
	await setDDBBproducts(categoryId);

	return await Product.findAll().catch((e) =>
		console.error("FindAll countriesDB getter service.", e.message),
	);
}

module.exports = getDDBBproducts;
