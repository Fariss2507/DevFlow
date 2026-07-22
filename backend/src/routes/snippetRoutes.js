const express = require('express');
const { getSnippets, createSnippet, updateSnippet, deleteSnippet } = require('../controllers/snippetController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.route('/')
  .get(getSnippets)
  .post(createSnippet);

router.route('/:id')
  .put(updateSnippet)
  .delete(deleteSnippet);

module.exports = router;
