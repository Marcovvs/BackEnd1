const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, required: true },
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
