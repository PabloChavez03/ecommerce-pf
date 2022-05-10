const { Router } = require("express");
const { Users, Order, Invoice} = require("../db");
const router = Router();

router.post("/", async (req, res) => {  
    const {orderDetails, total, orderStatus, dni_client} = req.body;
    console.log("aquiiiiiiiiii" + orderDetails)

    try {
        let ordenDeCompra = await Order.create({ 
            total,
            orderStatus,
            orderDetails,
            
        })
        let client = await Users.findOne({ where: {dni_client: dni_client}});

        console.log(client)

        // await client.addOrder(ordenDeCompra);
        await ordenDeCompra.addUsers(client);
        

     
        // let orderId = ordenDeCompra.orderId;

        if (ordenDeCompra.orderStatus === "Completed"){

            let date = Date.now();

            let newInvoice = await Invoice.create({ 
                invoice_date: date,
                invoice_ammount: total 
            })
            ordenDeCompra.setInvoice(newInvoice)
            console.log(newInvoice)
        }
       res.status(200).json(ordenDeCompra)

        

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;