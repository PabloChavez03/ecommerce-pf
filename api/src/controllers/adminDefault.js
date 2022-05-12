const { Users, Role } = require("../db");

const adminDefault = async () => {
  var newLegajo = function () {
    return parseInt((Math.random() + Date.now()).toString().substring(7));
  };
  const legajo = newLegajo();

  const user = await Users.create({
    legajo_user: legajo,
    user_name: "admin",
    user_password: "admin",
    phone: 123456789,
    dni_client: 123456789,
    email: "admin@admin.com",
    name: "admin",
    lastname: "admin",
    address: "admin",
  }).catch((e) => console.log(e));

  const foundRol = await Role.findOne({ where: { name: "admin" } });

  await user.setRole(foundRol);

  await user.save();

  return user;
};

module.exports = adminDefault;
