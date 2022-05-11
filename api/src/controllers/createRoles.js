const { Role } = require("../db");

const createRoles = async () => {
	const countRoles = await Role.findAll();

	if (countRoles > 0) return;

	try {
		const roles = await Promise.all([
			await Role.create({ name: "client" }),
			await Role.create({ name: "admin" }),
		]).catch(e=>console.log(e));

		return roles;
	} catch (error) {
		console.log(error)
		return new TypeError(error);
	}
};

module.exports = createRoles;
