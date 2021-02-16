const express = require("express");
const router = express.Router();
const Login = require("../controller/LoginCont")


router.post("/",Login.Login );

module.exports = router;