const { Router } = require("express");
const { Order, Users} = require("../db");
const { route } = require("./purchaseOrder");
const router = Router();


router.get("/:orderId", async (req, res) => {

    const {orderId} = req.params;

    try {
        let findOrder = await Order.findByPk(orderId)
        res.status(200).json(findOrder)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;