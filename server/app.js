const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const hpp = require("hpp");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import Routes
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRoutes");
const orderRouter = require("./routes/orderRouter");
const cartRouter = require("./routes/cartRouter");

app.use(hpp());

app.get("/", (req, res) => {
	res.status(200).send("All Okay");
});

// Using These route
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/cart", cartRouter);

// if no end point is there this error will show
app.use(function (req, res) {
	res
		.status(404)
		.json({ success: false, message: "This API endpoint does not exist!" });
});

app.use(function (err, req, res, next) {
	// middleware with an arity of 4 are considered
	// error handling middleware. When you next(err)
	// it will be passed through the defined middleware in order,
	// but ONLY those with an arity of 4 will catch this error.
	const mode = process.env.NODE_ENV;
	if (mode === "development") {
		console.log(err);
		res.status(err.status || 500).send(err.stack);
	}
	if (mode === "production") {
		res
			.status(err.status || 500)
			.json({ success: false, message: "Internal Server Error! Try later." });
	}
});

module.exports = app;
