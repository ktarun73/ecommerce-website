const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const { validateCategory } = require('../middleware/validateCategory');



router.get('/', categoryController.getAllCategory);
router.post('/',auth, isAdmin, validateCategory,categoryController.createCategory);
router.put('/:categoryId', auth, isAdmin, categoryController.updateCategory);
router.delete('/:categoryId', auth, isAdmin, categoryController.deleteCategory);


module.exports = router;
