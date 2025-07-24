const express = require('express');
const router = express.Router();
const { getAllEmployees } = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllEmployees);

module.exports = router;
