require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DevFlow backend is running!');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const projectRoutes = require('./routes/projects');
app.use('/api/projects', projectRoutes);

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

const bugRoutes = require('./routes/bugs');
app.use('/api/bugs', bugRoutes);

const noteRoutes = require('./routes/notes');
app.use('/api/notes', noteRoutes);

const snippetRoutes = require('./routes/snippets');
app.use('/api/snippets', snippetRoutes);

const repoRoutes = require('./routes/repos');
app.use('/api/repos', repoRoutes);

const timeLogRoutes = require('./routes/timelogs');
app.use('/api/timelogs', timeLogRoutes);

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

const analyticsRoutes = require('./routes/analytics');
app.use('/api/analytics', analyticsRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

const searchRoutes = require('./routes/search');
app.use('/api/search', searchRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});