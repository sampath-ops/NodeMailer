const nodemailer = require("./crayosaTransporter");

exports.crayosaMail = (req,res)=>{

    const {name,email,message} = req.body;

    const mailData = {
        from: email,
        to: "crayosa.company@gmail.com",
        subject: "Ready to build a project with crayosa",
        html: `
        <h2>Client Details</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>`
    };

    nodemailer.transporter.sendMail(mailData, (error) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send"});
    });
}