const getAPIproductDetail = require("./productsDetailApiGetter");

const { ProductDetail, Product } = require("../db");

async function setDDBBproducts(productId) {
	const productDetail = await getAPIproductDetail(productId);

	let product = await Product.findByPk(productId).catch((e) => console.log(e));

	const [newProduct, _created] = await ProductDetail.findOrCreate({
		where: {
			id: productDetail.id,
			name: productDetail.name,
			description: productDetail.description,
			info: productDetail.info,
			gender: productDetail.gender,
			brand: productDetail.brand,
			images: productDetail.images,
			previousPrice: productDetail.previousPrice,
			isOffertProduct: productDetail.isOffertProduct,
			currentPrice: productDetail.currentPrice,
			variants: productDetail.variants,
		},
	}).catch((e) => console.log(e));

	newProduct.setProduct(product);
}

module.exports = setDDBBproducts;
