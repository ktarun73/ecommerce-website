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


exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
    return res.status(404).json({ message: 'Category not found' });
}
res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};
  
  