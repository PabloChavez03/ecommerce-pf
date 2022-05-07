const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const { authMaster, isAdmin } = require("../middleware/authMaster");

// Modularizando las rutas

//----------------  for all  ----------------------------------
router.use("/categories", require("./categories"));
router.use("/products", require("./productsByCategory"));
router.use("/products/detail", require("./productsDetail"));
router.use("/allproducts", require("./getAllProducts"));
router.use("/products/genre", require("./productsByGenre.js"));
router.use("/product/review", require("./review"));
// router.use("/carrito", require("./carrito"));

//----------------  chatbot  -------------------------------
router.use("/chatBot", require("./chatBot"));

//----------------  for admin & client --------------------------------
router.use("/users/create", require("./userCreate"));
router.use("/users/login", require("./loginUser"));
router.use(
	"/products/create",
	/*[authMaster, isAdmin],*/ require("./postProduct"),
);
router.use(
	"/products/update",
	/*[authMaster, isAdmin],*/ require("./updateProduct"),
);
router.use(
	"/products/delete",
	/*[authMaster, isAdmin],*/ require("./deleteProduct"),
);
router.use("/product/stock", [authMaster, isAdmin], require("./updateStock"));
router.use("/users/update", [authMaster, isAdmin], require("./userUpdate"));
router.use("/users/delete", [authMaster, isAdmin], require("./userDelete"));
router.use("/users/findall", [authMaster, isAdmin], require("./getUsers"));
//----------------------Mercado Pago---------------------------------------
router.use("/mercadopago", require("./mercadoPago"));
//-------------------------------------------------------------------------

router.use("/auth", require("./auth"));

/* ¡¡¡ACLARACION!!! Para poder utilizar las rutas de ADMIN deberan de registrarse o en su defecto comentar el middleware de authMaster*/

module.exports = router;
