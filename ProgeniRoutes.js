const express = require("express");
const router = express.Router(); 
const ProgeniController = require("./ProgeniController");
const progenExcel = require("./progeniExcel");

router.get("/",(req,res)=>{
    res.send("hello")
})

router.get("/registered",progenExcel.getData)

router.post("/text-Mail",ProgeniController.progenMail);

router.post("/contact-team",ProgeniController.contactTeam);

module.exports = router;


