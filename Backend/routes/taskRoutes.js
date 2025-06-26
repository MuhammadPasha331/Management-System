const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/tasks', protect, authorizeRoles('Admin'), createTask);
router.get('/tasks', protect, getAllTasks);
router.get('/tasks/:id', protect, getTaskById);
router.put('/tasks/:id', protect, updateTask);
router.delete('/tasks/:id', protect, authorizeRoles('Admin'), deleteTask);

module.exports = router;
