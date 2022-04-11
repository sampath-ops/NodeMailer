const express = require("express");
const Excel = require("./Excel");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors");
const app = express();
const progenyRouter = require("./ProgeniRoutes");
const metmatRouter = require("./metmatRoutes");

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = express.Router();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: '*'
}));

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'gcesynergy2022@gmail.com',
        pass: 'Thiru@2001',
    },
    tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

route.post('/text-mail', (req, res) => {

    const {to, subject, text,userDetails } = req.body;

    const mailData = {
        from: 'gcesynergy2022@gmail.com',
        to: to,
        subject: subject,
        html: `
        <h2>Your Details</h2>
        <p>Name: ${userDetails.name}</p>
        <p>Email: ${userDetails.email}</p>
        <p>Phone: ${userDetails.phone}</p>
        <p>College: ${userDetails.college}</p>
        <p>Department: ${userDetails.department}</p>
        <p>Year: ${userDetails.year}</p>
        <p>Events: ${userDetails.events.join()}</p>
        <p>Accomodation: ${userDetails.accomodation}</p>
        <p>Your ID: <b>${text}</b></p>
        <b>Note:</b><p>Don't miss to check <a href="https://www.gcesynergy2022.tech/guide-lines">GuideLines</a> for Each Event</p>`,
    };

    transporter.sendMail(mailData, (error) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send"});
    });
});

route.post('/contact-team',(req,res)=>{

    const {from, subject, text,fname,lname,phn } = req.body;

    const mailData = {
        from: from,
        to: 'gcesynergy2022@gmail.com',
        subject: subject,
        html: `
        <p>Name: ${fname}${lname}</p>
        <p>Mail Id: ${from}</p>
        <p>Phone Number: ${phn}</p>
        <p>Message: ${text}</p>
        `,
    };

    transporter.sendMail(mailData, (error) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send"});
    });
})

// progeni routes
app.use("/v1/progeni-mail",progenyRouter);

// progeni routes
app.use("/v1/metmat",metmatRouter);

// get excel sheet
app.get("/excel",Excel.getData);

app.use("/excel/progeni",progenyRouter);