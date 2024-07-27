const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const { validateCategory } = require('../middleware/validateCategory');



router.get('/', categoryController.getAllCategory);
router.post('/',auth, isAdmin, validateCategory,categoryController.createCategory);


module.exports = router;
