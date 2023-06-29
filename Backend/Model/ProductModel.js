const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productname: { type: String, required: true },
  category: { type: String, required: true },
  company: { type: String, required: true },
  description :{type:String, required:true},
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image1 :  { type: String, required: true },
  image2 :  { type: String, required: true },
  image3 :  { type: String, required: false },
  image4 :  { type: String, required: false },

});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = { ProductModel };