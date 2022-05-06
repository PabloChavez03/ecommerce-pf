const axios = require("axios");
const adaptCategory = require("./categoriesAdapter");
const fs = require("fs");
const json_categories = fs.readFileSync("src/data/categories.json", "utf-8");
let categories = JSON.parse(json_categories);

async function getAPIcategories() {
	if (categories.length === 0) {
		const options = {
			method: "GET",
			url: "https://asos2.p.rapidapi.com/categories/list",
			headers: {
<<<<<<< HEAD
				"X-RapidAPI-Host": "asos2.p.rapidapi.com",
				"X-RapidAPI-Key": "30ca8b002fmshe6d1017ee2a2098p117484jsn0cbdc93248b7",
=======
				'X-RapidAPI-Host': 'asos2.p.rapidapi.com',
				'X-RapidAPI-Key': 'b4419db468mshc852c1556d25a25p17fe32jsndbc31541a7c3'
>>>>>>> 46fbb27d85ec1e27f3e99f86d2c2d7310bba1fbe
			},
		};

		const data = axios(options)
			.then(({ data }) => adaptCategory(data))
			.catch((e) => e.message);
		categories = data;
		const json_categories = JSON.stringify(categories);
		fs.writeFileSync("src/data/categories.json", json_categories, "utf-8");
	}
	return categories; ///JSON
}

module.exports = getAPIcategories;
