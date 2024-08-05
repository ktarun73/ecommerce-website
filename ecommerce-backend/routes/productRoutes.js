const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validateProduct');


// APIs 
router.get('/', productController.getAllProducts);
router.get('/category/:categoryId',productController.getProductsByCategory); 
router.get('/:productId', productController.getProductById);
router.post('/',auth, isAdmin, validateProduct, productController.createProduct);
router.put('/:productId',auth, isAdmin,  productController.updateProduct);
router.delete('/:productId', isAdmin, productController.deleteProduct);


module.exports = router;