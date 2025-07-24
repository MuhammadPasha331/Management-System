const Task= require('../models/Task');
const Notification = require('../models/Notification');

// Post / tasks
exports.createTask = (io) => async (req, res, next) => {
  try {
    const { title, description, status, DueDate, assignedTo } = req.body;
    const attachment = req.file ? req.file.path : '';

    const task = new Task({
      title,
      description,
      status,
      DueDate,
      assignedTo,
      attachment,
      owner: req.user._id
    });
    await task.save();

    // Notify the assigned employee
    io.to(assignedTo.toString()).emit('notification', {
      message: `You have been assigned a new task: ${task.title}`
    });
    await Notification.create({
      recipient: assignedTo,
      message: `You have been assigned a new task: ${task.title}`
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};


// Get / tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    let tasks;

    if (req.user.role === 'Admin') {
      tasks = await Task.find().populate('assignedTo', 'name');
    } else {
      tasks = await Task.find({ assignedTo: req.user._id }).populate('assignedTo', 'name');
    }

    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};


//Get / tasks/:id
exports.getTaskById = async (req, res, next) => {
 try{const task= await Task.findById(req.params.id);
  if(!task) return res.json(404).json({message: 'Task not found'});
  res.status(200).json(task);   

 }
 catch(err) {
    next(err);
  }


};
// DELETE /tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

// PUT /tasks/:id
exports.updateTask = (io) => async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    
    const userRole = req.user.role;
    const isAssigned = task.assignedTo?.toString() === req.user._id.toString();

     if (req.file) {
      task.attachment = req.file.filename;
    }
    
    if (userRole === 'Admin') {
      Object.assign(task, req.body);
    } else if (userRole === 'Employee') {
      if (!isAssigned) return res.status(403).json({ message: 'Not your task' });
      if (!('status' in req.body)) return res.status(403).json({ message: 'Can only update status' });
      task.status = req.body.status;

      // Notify owner when employee updates status
      io.to(task.owner.toString()).emit('notification', {
        message: `Task "${task.title}" status updated to ${task.status}`
      });
      await Notification.create({
        recipient: task.owner,
        message: `Task "${task.title}" status updated to ${task.status}`
      });
    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.shareTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const userId = req.user.id;

    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.assignedTo.toString() !== userId) {
      return res.status(403).json({ message: 'Not your task' });
    }

    const { sharedWith } = req.body;

    // Avoid duplicates
    task.sharedWith = Array.from(new Set([...task.sharedWith.map(id => id.toString()), ...sharedWith]));

    await task.save();
    res.status(200).json({ message: 'Task shared successfully' });
  } catch (err) {
    console.error('Share task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSharedTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ sharedWith: userId }).populate('owner assignedTo');
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Get shared tasks error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};