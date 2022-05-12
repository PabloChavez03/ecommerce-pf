const { Router } = require("express");
const { Order, Users} = require("../db");
const { route } = require("./postPurchaseOrder");
const router = Router();


router.get("/:status", async (req, res) => {

    const {status} = req.params;

    try {
        let findOrder = await Order.findAll({where: {status: status}})
        res.status(200).json(findOrder)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;