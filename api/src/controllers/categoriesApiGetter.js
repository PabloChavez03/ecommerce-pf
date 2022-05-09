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
				"X-RapidAPI-Host": "asos2.p.rapidapi.com",
				"X-RapidAPI-Key": "cfb63a99ecmsh41dc7462f7a680bp141e30jsnb64a03ad4030",
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
