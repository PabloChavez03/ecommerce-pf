const getAPIproducts = require("./productsApiGetter");

const { Product, Category } = require("../db");

async function setDDBBproducts(categoryId) {
	const products = await getAPIproducts(categoryId);

	let category = await Category.findByPk(categoryId).catch((e) =>
		console.log(e.message),
	);

	await products.forEach(async (product) => {
		const [newProduct, productCreated] = await Product.findOrCreate({
			where: {
				id: product.id,
				name: product.name,
				image: product.image,
				isOffertPrice: product.isOffertPrice,
				previousPrice: product.previousPrice,
				currentPrice: product.currentPrice,
				brandName: product.brandName,
				color: product.color,
				isInStock: true,
			},
		}).catch((e) => console.log(e));

		newProduct.setCategory(category);
	});
}

module.exports = setDDBBproducts;
