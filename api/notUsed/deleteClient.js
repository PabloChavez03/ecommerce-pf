const { Router } = require("express");
const { Cliente } = require("../db");
const router = Router();


router.delete("/:dni_client", async (req, res) => {
    const {dni_client} = req.params;
    console.log(req.params)

    try {
        const deleted = await Cliente.destroy({
            where: {
                dni_client
            }
        });
        res.status(200).send(`${deleted} Cliente Eliminado`)
    } catch (error) {
       console.log(error)
    }
});

module.exports = router;