const nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'crayosa.company@gmail.com',
        pass: 'crayosa@gmail',
    },
    // tls: {
    //     // ciphers:'SSLv3',
    //     rejectUnauthorized: false
    // },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});