const getAPIproducts = require("./productsApi.getter.service");

const { Product } = require("../../../../db");

async function setDDBBproducts(categoryId) {
	const products = await getAPIproducts(categoryId);

	await products?.forEach((product) =>
		Product.findOrCreate({
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
		}).catch((e) => console.error(e)),
	);
}

module.exports = setDDBBproducts;
