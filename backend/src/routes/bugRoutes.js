const express = require('express');
const { getBugs, createBug, updateBug, deleteBug } = require('../controllers/bugController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router = express.Router();
router.use(authMiddleware);

router.route('/')
  .get(getBugs)
  .post(createBug);

router.route('/:id')
  .put(updateBug)
  .delete(deleteBug);

module.exports = router;
