const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Modularizando las rutas

router.use("/carrito", require("./carrito"));
router.use("/categories", require("./categories"));
router.use("/client", require("./client"));
router.use("/products", require("./products"));
// router.use("/products", require("./productsByName"));
router.use("/products/detail", require("./productsDetail"));
router.use("/allproducts", require("./getAllProducts"));
router.use("/create", require("../routes/routers/postProduct"));
router.use("/update", require("../routes/routers/updateProduct"));
router.use("/delete", require("../routes/routers/deleteProduct"));

module.exports = router;
