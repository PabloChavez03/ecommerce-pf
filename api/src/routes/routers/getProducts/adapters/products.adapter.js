async function adaptProducts({ CatalogProducts }) {
	return await CatalogProducts?.map((product) => {
		return {
			id: product.ProductId,
			name: product.DisplayName,
			image: product.DefaultProductImage,
			originalPrice: product.OriginalPrice,
			offertPrice: product.ListPrice,
			// description: product.Description,
			// variants: product.Variants,
		};
	});
}

module.exports = adaptProducts;
