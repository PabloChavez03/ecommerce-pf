const setDDBBproductDetail = require("./productsDetailDB.setter.service");

const { Product, Category, ProductDetail } = require("../../../../db");

async function getDDBBproducts(productId) {
	const productFound = await ProductDetail.findByPk(productId);

	if (productFound) {
		return productFound;
	} else {
		await setDDBBproductDetail(productId);

		return await ProductDetail.findByPk(productId).catch((e) =>
			console.error("findByPk detailDB getter service.", e.message),
		);
	}
}

module.exports = getDDBBproducts;
