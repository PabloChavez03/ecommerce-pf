const { Router } = require("express");
const { Product, ProductDetail, Category } = require("../db");
const router = Router();

router.patch("/:id", async (req, res) => {
  let {
    name,
    description,
    info,
    gender,
    brandName,
    images,
    previousPrice,
    isOffertPrice,
    currentPrice,
    colour,
    variants,
    category,
  } = req.body;

  let { id } = req.params;

  //PRODUCT
  let product = await Product.findByPk(id);

  try {
    if (product) {
      product.update({
        name,
        image: images[0],
        previousPrice,
        isOffertPrice,
        currentPrice,
        brandName,
        colour,
      });

      category.forEach(async (el) => {
        let categoryDDBB = await Category.findByPk(el);
        await product.addCategory(categoryDDBB);
      });

      product.save();

      res.status(201).send(`Producto modificado`);
    } else {
      res.statusCode(404);
    }
  } catch (error) {
    return new TypeError(error);
  }

  //PRODUCT DETAIL
  let productDetail = await ProductDetail.findByPk(id);

  try {
    if (productDetail) {
      productDetail.update({
        name,
        description,
        info,
        brand: brandName,
        gender,
        images,
        previousPrice,
        isOffertProduct: isOffertPrice,
        currentPrice,
        variants: variants.map((el) => {
          return { ...el, color: colour }; //preguntarle a brayan
        }),
      });
      product.save();
      res.statusCode(201);
    } else {
      res.statusCode(404);
    }
  } catch (error) {
    return new TypeError(error);
  }
});

module.exports = router;
