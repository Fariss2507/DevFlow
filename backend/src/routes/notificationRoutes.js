const express = require('express');
const { getNotifications, markAsRead, markAllAsRead, clearAll } = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.route('/')
  .get(getNotifications);

router.route('/:id/read')
  .put(markAsRead);

router.route('/read-all')
  .put(markAllAsRead);

router.route('/clear-all')
  .delete(clearAll);

module.exports = router;
