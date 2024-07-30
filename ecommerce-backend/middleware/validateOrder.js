const { body, validationResult } = require('express-validator');

exports.validateOrder = [
  body('address').notEmpty().withMessage('Address required'),
  body('products').isArray({ min: 1 }).withMessage('Products must haveone product'),
  body('products.*.productId').notEmpty().withMessage('Product ID is required'),
  body('products.*.quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
