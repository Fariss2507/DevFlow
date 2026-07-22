const express = require('express');
const { User } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.get('/profile', async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
});

router.put('/profile', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, email },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) { next(err); }
});

module.exports = router;
