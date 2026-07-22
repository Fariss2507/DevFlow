const express = require('express');
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');
const bugRoutes = require('./bugRoutes');
const noteRoutes = require('./noteRoutes');
const snippetRoutes = require('./snippetRoutes');
const repoRoutes = require('./repoRoutes');
const timeLogRoutes = require('./timeLogRoutes');
const eventRoutes = require('./eventRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const searchRoutes = require('./searchRoutes');
const notificationRoutes = require('./notificationRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/bugs', bugRoutes);
router.use('/notes', noteRoutes);
router.use('/snippets', snippetRoutes);
router.use('/repos', repoRoutes);
router.use('/timelogs', timeLogRoutes);
router.use('/events', eventRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/search', searchRoutes);
router.use('/notifications', notificationRoutes);
router.use('/users', userRoutes);

module.exports = router;
