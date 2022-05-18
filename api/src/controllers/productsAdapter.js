async function adaptListProducts({ products }) {
	return await products?.map((product) => {
		return {
			id: product.id,
			name: product.name,
			image: product.imageUrl,
			isOffertPrice: product.price.isOutletPrice,
			previousPrice: product.price.rrp.value,
			currentPrice: product.price.current.value,
			brandName: product.brandName,
			color: product.colour,
		};
	});
}

module.exports = adaptListProducts;
