const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	picture:{
		type:String,
	}
});

module.exports = mongoose.model("Products", productSchema);
