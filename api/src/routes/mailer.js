const { Router } = require("express");
const { transporter } = require("../controllers/mailer");
require("dotenv").config();
const { USER_GOOGLE, PASS_GOOGLE } = process.env;
const router = Router();

router.get('/', async (req, res) => {
    const { emailGoogle } = req.body
    try {
        // send mail with defined transport object
        await transporter.sendMail({
            from: `"PRUEBA XD👻" ${USER_GOOGLE}`, // sender address
            to: emailGoogle, // list of receivers
            subject: "Hello ✔", // Subject line
            html: `
            <b>Plase click in the following link, or paste this into your browser to complete the process:</b>
            <p>XD</p>
            `
        }).then(() => res.json("logrado"));

    } catch (error) {
        console.log(error)
    }

})

module.exports = router;
