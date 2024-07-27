const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// APIs 
router.get('/', productController.getAllProducts);
router.get('/category/:categoryId',productController.getProductsByCategory); 



module.exports = router;