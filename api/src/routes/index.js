const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Modularizando las rutas

router.use("/categories", require("./categories"));
router.use("/products", require("./productsByCategory"));
router.use("/products/detail", require("./productsDetail"));
router.use("/products/create", require("./postProduct"));
router.use("/products/update", require("./updateProduct"));
router.use("/products/delete", require("./deleteProduct"));
router.use("/allproducts", require("./getAllProducts"));
router.use("/products/genre", require("./productsByGenre.js"));

router.use("/product/stock", require("./updateStock"));

router.use("/carrito", require("./carrito"));
router.use("/client", require("./client"));

router.use("/users/create", require("./userPost"));

router.use("/users/login", require("./loginUser"));
router.use("/users/update", require("./userUpdate"));
router.use("/users/delete", require("./userDelete"));

module.exports = router;
