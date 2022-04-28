async function adaptProducts({ products }) {
	return await products?.map((product) => {
		return {
			id: product.id,
			name: product.name,
			image: product.imageUrl,
			originalPrice: product.price.current.value,
			isOffertPrice: product.price.isOutletPrice,
			offertPrice: product.price.rrp.value,
			brandName: product.brandName,
			colour: product.colour,
		};
	});
}

module.exports = adaptProducts;
