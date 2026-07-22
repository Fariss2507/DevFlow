require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'DevFlow API Server is running!' });
});

// API Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

// Database Connection & Server Start
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});