const express = require("express");
const router = express.Router();
const auth = require('../middleware/Auth')


router.get("/",auth.authentication,(req,res)=>{
    res.send("Protected route")
} );

module.exports = router;