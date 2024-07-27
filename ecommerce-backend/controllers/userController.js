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
  