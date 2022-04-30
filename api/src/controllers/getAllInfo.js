const { Product, Category } = require("../db");

const getAllDbInfo = async () => {
	let allInfo = await Product.findAll({
		include: {
			model: Category,
			through: {
				attributes: [],
			},
		},
	});
	return allInfo;
};

module.exports = { getAllDbInfo };
