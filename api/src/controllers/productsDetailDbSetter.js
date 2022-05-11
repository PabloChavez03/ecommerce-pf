const getAPIproductDetail = require("./productsDetailApiGetter");

const { ProductDetail, Product, Category } = require("../db");

async function setDDBBproducts(productId) {
	// Bringing details from API
	const productDetail = await getAPIproductDetail(productId);

	if (productDetail.name) {
		// Looking for product on Products table
		// for bringing isInStock & stock
		let productWithStock = await Product.findByPk(productId).catch((e) =>
			console.log(e),
		);

		console.log(productWithStock);

		let category = await Category.findByPk(productWithStock.CategoryId);

		// console.log(category);

		// Creating on DDBB product details with stock
		const [newProduct, _created] = await ProductDetail.findOrCreate({
			where: {
				id: productDetail.id,
				name: productDetail.name,
				description: productDetail.description,
				info: productDetail.info,
				gender: productDetail.gender,
				brandName: productDetail.brandName,
				images: productDetail.images,
				isInStock: productDetail.isInStock,
				isOffertProduct: productDetail.isOffertProduct,
				previousPrice: productDetail.previousPrice,
				currentPrice: productDetail.currentPrice,
				color: productDetail.color,
				variants: productDetail.variants.map((brandSize) => {
					return {
						brandSize,
						stock: productDetail.isInStock
							? Math.floor(Math.random() * (100 - 0)) + 0
							: false,
						isInStock: productDetail.isInStock,
					};
				}),
			},
		}).catch((e) => console.log(e));

		await newProduct.setCategory(category);
		await newProduct.setProduct(productWithStock);
	}
}

module.exports = setDDBBproducts;
