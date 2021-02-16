const express = require("express");
const app = express();
const cors = require("cors");
require("./db");
require("dotenv").config();

app.use(express.json());

// import Route
const Register = require('./Routes/Register')
const Login = require('./Routes/Login')
const products = require('./Routes/Peoducts')

// Use middlewares
app.use("/register",Register)
app.use("/login",Login)
app.use("/products",products)

//Routing
app.get("/", (req, res) => {
	res.send("<h1>Hello we are in Main route</h1>");
});

//Server
app.listen(8080, function () {
	console.log("server running");
});