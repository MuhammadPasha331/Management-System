const express = require('express');
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  shareTask,
  getSharedTasks
} = require('../controllers/taskController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); 
module.exports = function(io) {
  const router = express.Router();

  router.post('/tasks', protect, authorizeRoles('Admin'),upload.single('attachment'), (req, res, next) => createTask(io)(req, res, next));
  router.get('/tasks', protect, getAllTasks);
  router.get('/tasks/shared', protect, getSharedTasks);
  router.get('/tasks/:id', protect, getTaskById);
  router.put('/tasks/:id', protect,upload.single('attachment'),(req, res, next) => updateTask(io)(req, res, next));
  router.delete('/tasks/:id', protect, authorizeRoles('Admin'), deleteTask);
  router.put('/tasks/:id/share', protect, shareTask);

  return router;
};
