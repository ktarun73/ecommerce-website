const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrder } = require('../middleware/validateOrder');
const { auth } = require('../middleware/authMiddleware');



router.post('/', auth, validateOrder, orderController.createOrder);
router.get('/:orderId', auth, orderController.getOrderById);


module.exports = router;