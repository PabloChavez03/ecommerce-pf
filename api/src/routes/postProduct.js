const { Router } = require("express");
const { Product, Category } = require("../db");
const router = Router();


router.post("/", async (req, res) => {
  let {
    name,
    image,
    previousPrice,
    isOffertPrice,
    currentPrice,
    brandName,
    colour,
    Categories,
  } = req.body;
  console.log(req.body)
 
    try {
      let [productCreated, created] = await Product.findOrCreate({
        where: { name },
        defaults: {
          name,
          image,
          previousPrice,
          isOffertPrice,
          currentPrice,
          brandName,
          colour,
        },
      });
      let categoryDb = await Category.findAll({
        where: { title: Categories },
      });
      await productCreated.addCategory(categoryDb);
      if (created) {
        res.status(200).send("Producto creado con exito!");
      } else {
        res.status(404).send("Producto existente");
      }
    } catch (error) {
      return new TypeError(error);
    }
});

module.exports = router;
