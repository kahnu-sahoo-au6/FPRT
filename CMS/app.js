const express = require('express')
const cors = require('cors')
const app = express()
const hpp = require('hpp')
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const categoryRouter = require('./routes/categoryRoutes')

app.use(hpp())

app.get('/', (req, res)=>{
    res.status(200).send("ALl Okay")
})

app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)

app.use(function (req, res) {
    res.status(404).json({ success: false, message: "This API endpoint does not exist!" });
  });

  app.use(function (err, req, res, next) {
    const mode = process.env.NODE_ENV;
    if (mode === "development") {
      console.log(err);
      res.status(err.status || 500).send(err.stack);
    }
    if (mode === "production") {
      res.status(err.status || 500).json({ success: false, message: "Internal Server Error! Try later." });
    }
  });

  module.exports = app