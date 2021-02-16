const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:"string",
        required:true,
        min:5,
        max:50
    },
    email:{
        type:"string",
        required:true,
        max:255,
        min:6
    },
    password:{
        type:"string",
        required:true,
        max:1005,
        min:6
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('User',userSchema)