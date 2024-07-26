const mongoose = require('mongoose');

const productSchema =new mongoose.Schema({
  name:{type: String, required: true },
  description: { type: String, required: true },
  price:{ type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  stock: {type: Number, required: true, min: 0 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
