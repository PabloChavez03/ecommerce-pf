async function adaptListProducts({ products }) {
	return await products?.map((product) => {
		return {
			id: product.id,
			name: product.name,
			image: `https://${product.imageUrl}`,
			previousPrice: product.price.rrp.value,
			isOffertPrice: product.price.isOutletPrice,
			currentPrice: product.price.current.value,
			brandName: product.brandName,
			colour: product.colour,
		};
	});
}

module.exports = adaptListProducts;
