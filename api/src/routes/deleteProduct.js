const { Router } = require("express");
const { Product } = require("../db");
const router = Router();


router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    console.log(req.params)

    // try {
        const deleted = await Product.destroy({
            where: {
                id
            }
        });
        res.status(200).send(`${deleted} Eliminado`)
    // } catch (error) {
    //     return new TypeError(error)
    // }
});

module.exports = router;