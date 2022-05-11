const nodemailer = require(`nodemailer`)
require("dotenv").config();
const { USER_GOOGLE, PASS_GOOGLE } = process.env;
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    service: 'gmail',
    auth: {
        user: USER_GOOGLE, // generated ethereal user
        pass: PASS_GOOGLE, // generated ethereal password
    },
});
transporter.verify().then(() => {
    console.log('Ready for send emails');
})


async function publicidadEmail({ emailGoogle, emailAsunto, emailImagenTitle, emailTitulo, emailSubTitle, emailDescription }) {
    await transporter.sendMail({
        from: `"PRUEBA XD👻" ${USER_GOOGLE}`,
        to: emailGoogle,
        subject: emailAsunto,
        html: `
        <div style="width:60%;margin:auto;">
            ${emailImagenTitle ?
                `<img style="width:100%" src=${emailImagenTitle} />`
                : ''}
            <h1 style="color:blue">${emailTitulo}</h1>
            <h2 style="color:black">${emailSubTitle}</h2>
            <p style="color:black">${emailDescription}</p>
        </div>
        `
    })
}

module.exports = {
    transporter,
    publicidadEmail
}