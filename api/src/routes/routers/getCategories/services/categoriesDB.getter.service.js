const setDDBBcategories = require("./categoriesDB.setter.service");

const { Category } = require("../../../../db");

async function getDDBBcategories() {
	const categories = await Category.findAll();

	if (categories.length) {
		return categories;
	} else {
		await setDDBBcategories();
		return await Category.findAll();
	}
}

module.exports = getDDBBcategories;
