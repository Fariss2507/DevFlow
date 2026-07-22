const express = require('express');
const { getTimeLogs, createTimeLog, deleteTimeLog } = require('../controllers/timeLogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.route('/')
  .get(getTimeLogs)
  .post(createTimeLog);

router.route('/:id')
  .delete(deleteTimeLog);

module.exports = router;
