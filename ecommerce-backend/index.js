const express = require('express');
const connectDB = require('./config/db');

// env file
require('dotenv').config();

const app = express();

//Express Middleware
app.use(express.json());

// Database Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
