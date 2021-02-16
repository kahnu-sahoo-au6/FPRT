const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    productId: {
        type: String,
        required: true,
      },
    quantity: {
        type: Number,
        required: true,
      }
      
},{ timestamps: true })

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;