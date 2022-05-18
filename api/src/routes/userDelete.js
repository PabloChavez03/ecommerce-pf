const { Router } = require("express");
const { Users } = require("../db");
const router = Router();


router.delete("/:user_name", async (req, res) => {
    const {user_name} = req.params;
    console.log(req.params)

    try {
        const deleted = await Users.destroy({
            where: {
                user_name
            }
        });
        res.status(200).send(`${deleted} Usuario Eliminado`)
    } catch (error) {
       console.log(error)
    }
});

module.exports = router;