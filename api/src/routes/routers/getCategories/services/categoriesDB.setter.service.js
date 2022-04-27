const getAPIcategories = require("./categoriesApi.getter.service");

const { Category } = require("../../../../db.js");

async function setDDBBcategories() {
	const categories = await getAPIcategories();

	await categories?.forEach(async (category) =>
		Category.findOrCreate({
			where: {
				title: category.title,
				categories: category.categories,
			},
		}).catch((e) => console.error(e)),
	);
}

module.exports = setDDBBcategories;
