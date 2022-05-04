const setDDBBproductDetail = require("./productsDetailDbSetter");

const { Product, Category, ProductDetail } = require("../db");

async function getDDBBproducts(productId) {
	const productFound = await ProductDetail.findByPk(productId);

	if (productFound) {
		return productFound;
	} else {
		await setDDBBproductDetail(productId);

		const productDetail = await ProductDetail.findByPk(productId).catch((e) =>
			console.error("findByPk detailDB getter service.", e.message),
		);

		if (productDetail) {
			return productDetail;
		} else {
			return;
		}
	}
}

module.exports = getDDBBproducts;
