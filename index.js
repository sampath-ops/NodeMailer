const express = require("express");
const Excel = require("./Excel");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors");
const app = express();
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = express.Router();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://gcesynergy2022.netlify.app/'
}))

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'sampathkaali002@gmail.com',
        pass: 'sam_sri002',
    },
    tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

route.post('/text-mail', (req, res) => {

    const {to, subject, text } = req.body;

    const mailData = {
        from: 'sampathkaali002@gmail.com',
        to: to,
        subject: subject,
        html: `<b>Your ID: ${text} </b>`,
    };

    transporter.sendMail(mailData, (error) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send"});
    });
});

// get excel sheet
app.get("/excel",Excel.getData);