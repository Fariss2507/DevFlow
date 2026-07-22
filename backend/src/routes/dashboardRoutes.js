const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.route('/')
  .get(getDashboardData);

module.exports = router;
