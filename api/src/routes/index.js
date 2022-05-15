const { Router } = require("express");
// Importar todos los routers;

const router = Router();

const { authMaster, isAdmin } = require("../middleware/authMaster");

// Modularizando las rutas

//----------------  for All  --------------------------------------------------
router.use("/categories", require("./categories"));
router.use("/products", require("./productsByCategory"));
router.use("/products/detail", require("./productsDetail"));
router.use("/allproducts", require("./getAllProducts"));
router.use("/products/genre", require("./productsByGenre.js"));
router.use("/product/review", require("./review"));
// router.use("/carrito", require("./carrito"));
//----------------  chatbot  --------------------------------------------------
router.use("/chatBot", require("./chatBot"));
//-----------------------Prueba de correo--------------------------
router.use("/email", require("./mailer"));
//----------------  for Admin & Client ------------------------------------
router.use("/modify/categories", require("./categoriesModification"));
router.use("/users/create", require("./userCreate"));
router.use("/users/login", require("./loginUser"));
router.use("/products/create", [authMaster, isAdmin], require("./postProduct"));
router.use(
	"/products/update",
	[authMaster, isAdmin],
	require("./updateProduct"),
);
router.use(
	"/products/delete",
	[authMaster, isAdmin],
	require("./deleteProduct"),
);
router.use("/users/update", authMaster, require("./userUpdate"));
router.use("/client/update", [authMaster, isAdmin], require("./updateClient"));
router.use("/product/stock", [authMaster, isAdmin], require("./updateStock"));
router.use("/users/delete", [authMaster, isAdmin], require("./userDelete"));
router.use("/users/findall", [authMaster, isAdmin], require("./getUsers"));
router.use(
	"/users/findByPk",
	[authMaster, isAdmin],
	require("./usersFindByPk"),
);
//----------------------Mercado Pago-------------------------------------------
router.use("/mercadopago", require("./mercadoPago"));
//-----------------------  Google  --------------------------------------------
router.use("/auth", require("./auth"));
//-------------------------------------------------------------------------
router.use("/users/wishlist", authMaster, require("./wishlist"));
//----------------Ordenes de Compra-------------------------------------------
router.use("/ordendecompra", require("./postPurchaseOrder"));
router.use("/findAllOrders", require("./getAllOrders"));
router.use("/findOrderByPk", require("./getOrderByPk"));
router.use("/findorderbystatus", require("./getFindOrderByStatus"));
router.use("/findOrderByUser", require("./getOrdersByUser.js"));
router.use("/updateStatusOrder", require("./updateStatusOrder"));
router.use("/findUserByUsername", require("./findUserEmail"));
//-----------------------------------------------------------------------------

/* ¡¡¡ACLARACION!!! Para poder utilizar las rutas de ADMIN deberan de registrarse o en su defecto comentar el middleware de authMaster*/

module.exports = router;
