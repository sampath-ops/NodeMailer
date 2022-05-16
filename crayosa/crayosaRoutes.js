const express = require("express");
const router = express.Router(); 
const crayosaController = require("./crayosaController");

router.get("/",(req,res)=>{
    res.send("hello")
})
router.post("/text-Mail",crayosaController.crayosaMail);

module.exports = router;