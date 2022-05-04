async function adaptProductsDetail(product) {
	return {
		id: product.id,
		name: product.name,
		description: product.description,
		info: product.info,
		gender: product.gender,
		brandName: product.brand.name,
		images: product.media.images.map((el) => el.url),
		isOffertProduct: product.price.isOutletPrice,
		previousPrice: product.price.rrp.value,
		currentPrice: product.price.current.value,
		color: product.variants[0].colour,
		variants: product.variants?.map((el) => el.brandSize),
	};
}

module.exports = adaptProductsDetail;
