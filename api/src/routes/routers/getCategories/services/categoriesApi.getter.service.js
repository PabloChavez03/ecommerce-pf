const axios = require("axios");
const adaptCategory = require("../adapters/category.adapter");

async function getAPIcategories() {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/categories/list",
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "b78c7a3b2fmsh0b41ed6110ef2c5p1eb5cfjsnb1b10669361b",
		},
	};

	return await axios(options)
		.then(({ data }) => adaptCategory(data))
		.catch((e) => e.message);
}

module.exports = getAPIcategories;
