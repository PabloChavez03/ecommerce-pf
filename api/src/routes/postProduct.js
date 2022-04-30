const { Router } = require("express");
const { Product, Category } = require("../db");
const router = Router();
const crypto = require("crypto");

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
// console.log(uuidv4());

router.post("", async (req, res) => {
  let { name, image, previousPrice, isOffertPrice, currentPrice, brandName,  colour,  Categories } = req.body;
  // console.log(req.body)
  let id = Number(uuidv4())
  try {
    let [productCreated, created] = await Product.findOrCreate({
      where: {
        id,
        name,
        image, 
        previousPrice,
        isOffertPrice,
        currentPrice,
        brandName,
        colour,
      },
    });
    let categoriDb = await Category.findAll({
      where: {title: Categories},
    })
    await productCreated.addCategory(categoriDb)
    if(created) {
      res.status(200).send("Producto creado con exito!")
    } else {
      res.status(404).send("Producto existente")
    }
  } catch (error) {
    return new TypeError(error);
  }
});

module.exports = router;
