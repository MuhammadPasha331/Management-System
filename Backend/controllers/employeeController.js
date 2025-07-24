const User = require('../models/User');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'Employee' }).select('_id name email');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
