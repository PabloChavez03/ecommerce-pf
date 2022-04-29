const getAPIproducts = require("./productsByNameApiGetter");

const { Product, Category } = require("../db");

async function setDDBBproducts(categoryId) {
	const products = await getAPIproducts(categoryId);

	let category = await Category.findByPk(categoryId).catch((e) =>
		console.log(e.message),
	);

	await products.forEach(async (product) => {
		const [newProduct, created] = await Product.findOrCreate({
			where: {
				id: product.id,
				name: product.name,
				image: product.image,
				previousPrice: product.previousPrice,
				isOffertPrice: product.isOffertPrice,
				currentPrice: product.currentPrice,
				brandName: product.brandName,
				colour: product.colour,
			},
		}).catch((e) => console.log(e));

		newProduct.addCategories(category);
	});
}

module.exports = setDDBBproducts;
