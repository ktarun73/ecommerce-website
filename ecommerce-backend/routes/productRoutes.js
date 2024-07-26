const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// APIs 
router.get('/', productController.getAllProducts);



module.exports = router;