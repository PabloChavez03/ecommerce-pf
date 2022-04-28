async function adaptListProducts({ products }) {
	return await products?.map((product) => {
		return {
			id: product.id,
			name: product.name,
			image: `https://${product.imageUrl}`,
			originalPrice: product.price.current.value,
			isOffertPrice: product.price.isOutletPrice,
			offertPrice: product.price.rrp.value,
			brandName: product.brandName,
			colour: product.colour,
		};
	});
}

module.exports = adaptListProducts;
