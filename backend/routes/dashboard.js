const express = require('express');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Bug = require('../models/Bug');
const Note = require('../models/Note');
const TimeLog = require('../models/TimeLog');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId });
    const tasks = await Task.find({ user: req.userId });
    const bugs = await Bug.find({ user: req.userId });
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 }).limit(3);
    const logs = await TimeLog.find({ user: req.userId });

    const activeProjects = projects.filter((p) => p.status !== 'Completed').length;
    const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const openBugs = bugs.filter((b) => b.status === 'Open' || b.status === 'In Progress').length;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const weeklyProductivity = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dayStr = d.toISOString().split('T')[0];
      const hours = logs
        .filter((l) => l.date === dayStr)
        .reduce((sum, l) => sum + l.duration, 0) / 3600;
      weeklyProductivity.push({ day: dayNames[d.getDay()], hours: Math.round(hours * 10) / 10 });
    }

    const recentNotes = notes.map((n) => ({
      id: n._id,
      title: n.title,
      date: n.date || n.createdAt.toISOString().split('T')[0],
    }));

    res.json({
      stats: [
        { id: 1, label: 'Active Projects', value: activeProjects, icon: '📁' },
        { id: 2, label: 'Pending Tasks', value: pendingTasks, icon: '📝' },
        { id: 3, label: 'Completed Tasks', value: completedTasks, icon: '✅' },
        { id: 4, label: 'Open Bugs', value: openBugs, icon: '🐞' },
      ],
      weeklyProductivity,
      recentNotes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;