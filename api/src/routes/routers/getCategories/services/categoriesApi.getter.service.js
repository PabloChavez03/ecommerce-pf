const axios = require("axios");
const adaptCategory = require("../adapters/category.adapter");

function getAPIcategories() {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/categories/list",
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "b78c7a3b2fmsh0b41ed6110ef2c5p1eb5cfjsnb1b10669361b",
		},
	};

	return axios(options)
		.then(({ data }) => adaptCategory(data))
		.catch((e) => console.log(e.message));
}

module.exports = getAPIcategories;
