const { Router } = require("express");
const { Order, Users} = require("../db");
const { route } = require("./purchaseOrder");
const router = Router();


router.get("/:orderStatus", async (req, res) => {

    const {orderStatus} = req.params;

    try {
        let findOrder = await Order.findAll({where: {orderStatus: orderStatus}})
        res.status(200).json(findOrder)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;