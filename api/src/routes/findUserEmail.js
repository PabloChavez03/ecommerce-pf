const { Router } = require("express");
const { Users} = require("../db");
const router = Router();


router.get("/", async (req, res) => {

    // const {user_name} = req.params;

    try {
        let findUser = await Users.findAll()
        let user = findUser.map( usuario => { 
            return { 
                username :usuario.user_name, email: usuario.email
            }})
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;