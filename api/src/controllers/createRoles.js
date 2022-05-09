const { Role } = require("../db");

const createRoles = async () => {
  const countRoles = await Role.findAll();

  if (countRoles > 0) return;

  try {
    const roles = await Promise.all([
      await Role.create({ name: "client" }),
      await Role.create({ name: "admin" }),
    ]);

    return roles;
  } catch (error) {
    return new TypeError(error);
  }
};

module.exports = createRoles;
