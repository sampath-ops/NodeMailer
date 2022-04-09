const nodemailer = require("./transporter");

exports.progenMail = (req,res)=>{

    const {to, subject, text,userDetails } = req.body;
    const mailData = {
        from: 'progenit22@gmail.com',
        to: to,
        subject: subject,
        html: `
        <h2>Your Details</h2>
        <p>Name: ${userDetails.name}</p>
        <p>Email: ${userDetails.email}</p>
        <p>Phone: ${userDetails.phn}</p>
        <p>College: ${userDetails.clg}</p>
        <p>Department: ${userDetails.department}</p>
        <p>Year: ${userDetails.year}</p>
        <p>Events: ${userDetails.event}</p>
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
        to: 'progenit22@gmail.com',
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
}