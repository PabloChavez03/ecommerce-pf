const { Router } = require("express");
const { Order, Users} = require("../db");
const { route } = require("./purchaseOrder");
const router = Router();


router.get("/", async (req, res) => {
    try {
        let findOrder = await Order.findAll({
            include: {
                model:Users,
                attributes: ["name", "lastname"],
            }
        })
        res.status(200).json(findOrder)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;