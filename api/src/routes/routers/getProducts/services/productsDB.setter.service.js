const getAPIproducts = require("./productsApi.getter.service");

const { Product, Category } = require("../../../../db");

async function setDDBBproducts(categoryId) {
	const products = await getAPIproducts(categoryId);

	let category = await Category.findByPk(categoryId).catch((e) =>
		console.log(e),
	);

	await products.forEach(async (product) => {
		const [newProduct, created] = await Product.findOrCreate({
			where: {
				id: product.id,
				name: product.name,
				image: product.image,
				originalPrice: product.originalPrice,
				isOffertPrice: product.isOffertPrice,
				offertPrice: product.offertPrice,
				brandName: product.brandName,
				colour: product.colour,
			},
		}).catch((e) => console.log(e));

		newProduct.addCategories(category);
	});
}

module.exports = setDDBBproducts;
