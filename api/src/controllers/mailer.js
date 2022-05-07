const nodemailer = require(`nodemailer`)
require("dotenv").config();
const { USER_GOOGLE, PASS_GOOGLE } = process.env;
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    service:'gmail',
    auth: {
        user: USER_GOOGLE, // generated ethereal user
        pass: PASS_GOOGLE, // generated ethereal password
    },
});
transporter.verify().then(() => {
    console.log('Ready for send emails');
})
module.exports = {
    transporter
}