async function adaptProductsDetail(product) {
	return {
		id: product.id,
		name: product.name,
		description: product.description,
		info: product.info,
		gender: product.gender,
		brand: product.brand.name,
		images: product.media.images.map((el) => el.url),
		previousPrice: product.price.rrp.value,
		isOffertProduct: product.price.isOutletPrice,
		currentPrice: product.price.current.value,
		variants: product.variants?.map((el) => {
			return {
				name: el.name,
				brandSize: el.brandSize,
				sizeDescription: el.displaySizeText,
				isLowInStock: el.isLowInStock,
				isInStock: el.isInStock,
				isAvailable: el.isAvailable,
				color: el.colour,
			};
		}),
	};
}

module.exports = adaptProductsDetail;
