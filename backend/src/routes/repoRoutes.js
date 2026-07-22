const express = require('express');
const { getRepos, createRepo, updateRepo, deleteRepo } = require('../controllers/repoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.route('/')
  .get(getRepos)
  .post(createRepo);

router.route('/:id')
  .put(updateRepo)
  .delete(deleteRepo);

module.exports = router;
