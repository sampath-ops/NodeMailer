const express = require("express");
const router = express.Router(); 
const metmatController = require("./metmatController");

router.get("/",(req,res)=>{
    res.send("hello")
})

router.post("/text-Mail",metmatController.metmatMail);

router.post("/contact-team",metmatController.contactTeam);

module.exports = router;


