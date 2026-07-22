const express = require('express');
const { Project, Task, Bug, Note, Snippet } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    const q = req.query.q || '';
    if (!q.trim()) return res.json([]);

    const regex = new RegExp(q, 'i');

    const [projects, tasks, bugs, notes, snippets] = await Promise.all([
      Project.find({ user: req.userId, $or: [{ name: regex }, { description: regex }] }),
      Task.find({ user: req.userId, $or: [{ title: regex }, { description: regex }] }),
      Bug.find({ user: req.userId, $or: [{ title: regex }, { description: regex }] }),
      Note.find({ user: req.userId, $or: [{ title: regex }, { content: regex }] }),
      Snippet.find({ user: req.userId, $or: [{ title: regex }, { tags: regex }] }),
    ]);

    const results = [
      ...projects.map((p) => ({ type: 'Project', title: p.name, subtitle: p.status, link: '/projects', id: p._id })),
      ...tasks.map((t) => ({ type: 'Task', title: t.title, subtitle: t.status, link: '/tasks', id: t._id })),
      ...bugs.map((b) => ({ type: 'Bug', title: b.title, subtitle: b.severity, link: '/bugs', id: b._id })),
      ...notes.map((n) => ({ type: 'Note', title: n.title, subtitle: n.category, link: '/notes', id: n._id })),
      ...snippets.map((s) => ({ type: 'Snippet', title: s.title, subtitle: s.language, link: '/snippets', id: s._id })),
    ];

    res.json(results);
  } catch (err) { next(err); }
});

module.exports = router;
