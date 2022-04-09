const express = require("express");
const router = express.Router(); 
const ProgeniController = require("./ProgeniController");

router.get("/",(req,res)=>{
    res.send("hello")
})

router.post("/text-Mail",ProgeniController.progenMail);

router.post("/contact-team",ProgeniController.contactTeam);

module.exports = router;


