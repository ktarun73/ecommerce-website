const Product = require('../models/Product');


// to get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

// to fetch products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ categoryId });
    if (!products.length) {
      return res.json([]);
    }

    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// fetch a single product details

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
  } catch (error) {
    res.status(500).send('Server error or product not found');
  }
};

//create product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};


// update product

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

// delete product

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
};
