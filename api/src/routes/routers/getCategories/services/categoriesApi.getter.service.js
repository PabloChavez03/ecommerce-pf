const axios = require("axios");
const adaptCategory = require("../adapters/category.adapter");

async function getAPIcategories() {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/categories/list",
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "c004e83b99msh69d5ac3687a6db0p175163jsn1858aade2461",
		},
	};

	return await axios(options)
		.then(({ data }) => adaptCategory(data))
		.catch((e) => e.message);
}

module.exports = getAPIcategories;
