// controllers/analyticsController.js
const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.getOverview = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    const matchQuery = role === 'Admin' ? {} : { assignedTo: userId };

    const totalTasks = await Task.countDocuments(matchQuery);
    const completedTasks = await Task.countDocuments({ ...matchQuery, status: 'Completed' });
    const pendingTasks = await Task.countDocuments({ ...matchQuery, status: { $ne: 'Completed' } });

    const statusBreakdown = await Task.aggregate([
      { $match: matchQuery },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      statusBreakdown
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch overview', error: err.message });
  }
};

exports.getTrends = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    const matchQuery = role === 'Admin' ? {} : { assignedTo: userId };

    const trends = await Task.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    res.json({ trends });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trends', error: err.message });
  }
};
