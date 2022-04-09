const nodemailer = require("./metmatTransporter");

exports.metmatMail = (req,res)=>{

    const {to, subject, text,userDetails } = req.body;
    const mailData = {
        from: 'metmat2k22@gmail.com',
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
        <p>Events: ${userDetails.events}</p>
        <p>Accomodation: ${userDetails.accomodation}</p>
        <p>trasaction Id: ${userDetails.transid}</p>
        <p>Your ID: <b>${text}</b></p>`,
    };

    res.send(mailData)
    nodemailer.transporter.sendMail(mailData, (error) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send"});
    });
}

exports.contactTeam = (req,res)=>{

    const {from, subject, text,fname,lname,phn } = req.body;
    const mailData = {
        from: from,
        to: 'metmat2k22@gmail.com',
        subject: subject,
        html: `
        <p>Name: ${fname}${lname}</p>
        <p>Mail Id: ${from}</p>
        <p>Phone Number: ${phn}</p>
        <p>Message: ${text}</p>
        `,
    };

    nodemailer.transporter.sendMail(mailData, (error) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send"});
    });
}