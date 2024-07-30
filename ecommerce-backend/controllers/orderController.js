const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { address, products } = req.body;
    const userId = req.user._id;

    // Calculate total price
    let totalPrice = 0;
    for (const product of products) {
      const productData = await Product.findById(product.productId);
      if (!productData) {
        return res.status(404).json({ message: `Product with ID ${product.productId} not found` });
      }
      totalPrice += productData.price * product.quantity;
    }

    // Create order
    const order = new Order({
      userId,
      address,
      totalPrice
    });
    await order.save();

    // Create order products
    for (const product of products) {
      const orderProduct = new OrderProduct({
        orderId: order._id,
        productId: product.productId,
        quantity: product.quantity
      });
      await orderProduct.save();
    }

    // reduce stock
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};



exports.getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId).populate('userId', 'username email');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check if the user authorize to view order
      if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. You can only view your own orders.' });
      }
  
      const orderProducts = await OrderProduct.find({ orderId: order._id }).populate('productId', 'name price');
      const orderWithDetails = {
        ...order._doc,
        products: orderProducts
      };
  
      res.status(200).json(orderWithDetails);
    } catch (error) {
      res.status(400).json({ errors: error.errors });
    }
  };