// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const { getOverview, getTrends } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/overview', protect, getOverview);
router.get('/trends', protect, getTrends);

module.exports = router;
