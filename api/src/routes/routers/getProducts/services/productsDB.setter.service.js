const getAPIproducts = require("./productsApi.getter.service");

const { Product } = require("../../../../db");

async function setDDBBproducts() {
	const products = await getAPIproducts();
	await products?.forEach((product) =>
		Product.findOrCreate({
			where: {
				id: product.id,
				name: product.name,
				image: product.image,
				originalPrice: product.originalPrice,
				offertPrice: product.offertPrice,
				// description: product.description,
				// variants: product.variants,
			},
		}).catch((e) => console.error(e)),
	);
}

module.exports = setDDBBproducts;
