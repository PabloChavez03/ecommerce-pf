const setDDBBproductDetail = require("./productsDetailDbSetter");

const { Product, Category, ProductDetail, Review } = require("../db");

async function getDDBBproducts(productId) {
	const productFound = await ProductDetail.findOne({
		where: {
			id: productId,
		},
		include: [
			{
				model: Review,
			},
			{
				model: Category,
			},
		],
	});

	if (productFound) {
		return productFound;
	} else {
		await setDDBBproductDetail(productId);

		const productDetail = await ProductDetail.findOne({
			where: {
				id: productId,
			},
			include: [
				{
					model: Review,
				},
				{
					model: Category,
				},
			],
		}).catch((e) =>
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
