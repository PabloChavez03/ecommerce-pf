const { Router } = require("express");
const { Product } = require("../../db");
const router = Router();

router.patch("/:id", async (req, res) => {
    let { name, image, previousPrice, isOffertPrice, currentPrice, brandName,  colour,  Categories } = req.body;
    let {id} = req.params;

    try {
        const modified = await Product.update({ name, image, previousPrice, isOffertPrice, currentPrice, brandName,  colour,  Categories}, {
            where: {
                id
            }
        });
        res.status(200).send(modified + "Modificado perrin!")
    } catch (error) {
        return new TypeError(error)
    }
});

module.exports = router;