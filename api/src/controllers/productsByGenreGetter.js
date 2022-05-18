const { getAllDbInfo } = require("./getAllInfo");

async function getGenderFilterByProduc(genreName) {
	let allProducts = await getAllDbInfo();
	let productsFilteredByGenre = allProducts.filter(
		(product) =>
			product.Category?.genre.toLowerCase() === genreName.toLowerCase(),
	);

	if (productsFilteredByGenre.length === 0) {
		return [{ Error: "Error in the data entered" }];
	}
	return productsFilteredByGenre;
}

module.exports = {
	getGenderFilterByProduc,
};
