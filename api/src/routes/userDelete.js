const { Router } = require("express");
const { Users } = require("../db");
const router = Router();


router.delete("/:legajo_user", async (req, res) => {
    const {legajo_user} = req.params;
    console.log(req.params)

    try {
        const deleted = await Users.destroy({
            where: {
                legajo_user
            }
        });
        res.status(200).send(`${deleted} Usuario Eliminado`)
    } catch (error) {
       console.log(error)
    }
});

module.exports = router;