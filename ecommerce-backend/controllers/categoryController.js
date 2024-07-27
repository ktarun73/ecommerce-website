const Category = require('../models/Category');

exports.getAllCategory = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
  };

  exports.createCategory = async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ errors: error.errors });
    }
  };
  
  