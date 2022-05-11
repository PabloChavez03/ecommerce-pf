const { Router } = require("express");
const { Order, Users} = require("../db");
const { route } = require("./postPurchaseOrder");
const router = Router();


router.get("/:payment_id", async (req, res) => {

    const {payment_id} = req.params;

    try {
        let findOrder = await Order.findByPk(payment_id)
        res.status(200).json(findOrder)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;