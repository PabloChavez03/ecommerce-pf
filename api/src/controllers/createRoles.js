const { Role } = require("../db");

const createRoles = async () => {
	const countRoles = await Role.findAndCountAll();

	if (countRoles.count === 2) return;

	try {
		const roles = await Promise.all([
			await Role.findOrCreate({ where: { name: "client" } }),
			await Role.findOrCreate({ where: { name: "admin" } }),
		]);

		return roles;
	} catch (error) {
		return new TypeError(error);
	}
};

module.exports = createRoles;
