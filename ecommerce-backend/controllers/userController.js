const User = require('../models/User');
const jwt = require('jsonwebtoken');



// Login user
exports.loginUser = async (req, res) => {
    const { identifier, password } = req.body;
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }], password });  
    if (user) {
      const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
      res.status(200).send({ message: 'login successful', token });
    } else {
      res.status(401).send({ message: 'invalid credentials or some error' });
    }
  };

  // Register a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

  