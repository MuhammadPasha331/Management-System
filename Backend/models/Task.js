const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  Id: Number,
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  DueDate: Date,
  attachment: { type: String, default: '' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // one employee
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // admin who created the task
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // list of employee IDs
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
