async function adaptProductsDetail(product) {
		return {
			id: product.id,
			name: product.name,
			image: product.media.images[0].url,
			variants: product.variants?.map(el => {
				return {
					id: el.id,
					name: el.name,
					brandSize: el.brandSize,
					sizeDescription: el.sizeDescription,
					displaySizeText: el.displaySizeText,
					sizeOrder: el.sizeOrder,
					isLowInStock: el.isLowInStock,
					isInStock: el.isInStock,
					isAvailable: el.isAvailable,
					color: el.colour,
					// price: Object.entries(el.price).forEach(([key,value]) => [...value]),
					price: Object.entries(el.price)?.map(el => el),
				}
			}),
		};
}

module.exports = adaptProductsDetail;
