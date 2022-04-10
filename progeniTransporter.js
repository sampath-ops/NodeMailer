const nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'progenit22@gmail.com',
        pass: 'PR@genit22',
    },
    tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});