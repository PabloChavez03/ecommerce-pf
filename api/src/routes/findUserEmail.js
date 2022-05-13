const { Router } = require("express");
const { Users} = require("../db");
const router = Router();


router.get("/:user_name", async (req, res) => {

    const {user_name} = req.params;

    try {
        let findUser = await Users.findByPk( user_name)
        console.log(findUser.user_name, findUser.email)
        res.status(200).json([findUser.user_name, findUser.email])
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;