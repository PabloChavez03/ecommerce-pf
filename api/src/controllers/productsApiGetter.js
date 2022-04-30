const axios = require("axios");
const adaptListProducts = require("./productsAdapter");
//////////////////////////////////////////////////
const fs = require('fs');
const json_products = fs.readFileSync('src/data/products.json', 'utf-8');
let products = JSON.parse(json_products);
//////////////////////////////////////////////////
async function getAPIproducts(categoryId) {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v2/list",
		params: {
			store: "US",
			offset: "0",
			categoryId: `${categoryId}`,
			limit: "48",
			// q: query
		},
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "38740551f8msh9cdf697f1473412p1dbea0jsnf76410f1a466",
		},
	};

	let data = await axios(options)
		.then(({ data }) => adaptListProducts(data))
		.catch((e) => console.log(e.message));

	products.push(data)
	products = products.flat()
	const json_products = JSON.stringify(products);
	fs.writeFileSync('src/data/products.json', json_products, 'utf-8');

	return products
}

module.exports = getAPIproducts;
