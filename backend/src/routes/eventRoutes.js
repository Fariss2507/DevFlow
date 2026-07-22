const express = require('express');
const { getEvents, createEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.route('/')
  .get(getEvents)
  .post(createEvent);

router.route('/:id')
  .delete(deleteEvent);

module.exports = router;
