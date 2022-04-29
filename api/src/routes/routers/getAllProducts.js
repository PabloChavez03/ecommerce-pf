const { Router} = require("express");
const {getAllDbInfo} = require("../../controllers/getAllInfo");
const router = Router();



router.get("", async (req, res) => {
    let allProducts = await getAllDbInfo()
    console.log(allProducts)

    try {
        allProducts ? 
        res.status(200).send(allProducts) :
        res.status(404).send("Productos no encontrados")
    } catch (error) {
        return new TypeError(error)
    }
});




module.exports = router;