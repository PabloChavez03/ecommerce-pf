const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Modularizando las rutas

router.use("/carrito", require("./carrito"));
router.use("/categories", require("./categories"));
router.use("/client", require("./client"));
router.use("/products", require("./products"));
router.use('/products/genre', require('./productsByGenre.js'))
// router.use("/products", require("./productsByName"));
router.use("/products/detail", require("./productsDetail"));
<<<<<<< HEAD

router.use("/allproducts", require("../routes/routers/getAllProducts"));
router.use("/create", require("../routes/routers/postProduct"));
=======
router.use("/allproducts", require("./getAllProducts"));
router.use("/products/create", require("./postProduct"));
router.use("/products/update", require("./updateProduct"));
router.use("/products/delete", require("./deleteProduct"));
>>>>>>> a7d99362c435fcf1352e37692cf8ef5049f14f6f


module.exports = router;
