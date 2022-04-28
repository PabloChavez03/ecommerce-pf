const getAPIcategories = require("./categoriesApi.getter.service");
const { Category } = require("../../../../db");

async function setDDBBcategories() {
	const categories = await getAPIcategories().catch((e) => e.message);

	await categories.forEach((category) =>
		Category.findOrCreate({
			where: {
				id: category.id,
				title: category.title,
				genre: category.genre,
			},
		}).catch((e) => e.message),
	);
}

module.exports = setDDBBcategories;
