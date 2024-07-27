const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// env file
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// api routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
