const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.route('/')
  .get(getNotes)
  .post(createNote);

router.route('/:id')
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
