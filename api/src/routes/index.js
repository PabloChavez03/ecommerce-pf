const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const adminMaster = require("../middleware/adminMaster");

// Modularizando las rutas

//----------------  for all  ----------------------------------
router.use("/categories", require("./categories"));
router.use("/products", require("./productsByCategory"));
router.use("/products/detail", require("./productsDetail"));
router.use("/allproducts", require("./getAllProducts"));
router.use("/products/genre", require("./productsByGenre.js"));
router.use("/carrito", require("./carrito"));
router.use("/users/login", require("./loginUser"));
router.use("/users/create", require("./userCreate"));

//----------------  for client  -------------------------------
router.use("/client", require("./client"));
router.use("/users/client/create", require("./createClient"));
router.use("/users/client/update", require("./updateClient"));
router.use("/users/client/delete", require("./deleteClient"));

//----------------  for admin  --------------------------------
router.use("/products/create", adminMaster, require("./postProduct"));
router.use("/products/update", adminMaster, require("./updateProduct"));
router.use("/products/delete", adminMaster, require("./deleteProduct"));
router.use("/product/stock", adminMaster, require("./updateStock"));
router.use("/users/update", adminMaster, require("./userUpdate"));
router.use("/users/delete", adminMaster, require("./userDelete"));

//-------------------------------------------------------------

/* ¡¡¡ACLARACION!!! Para poder utilizar las rutas de ADMIN deberan de registrarse o en su defecto comentar el middleware de adminMaster*/

module.exports = router;
