const Task= require('../models/Task');

// Post / tasks
exports.createTask = async (req, res,next) => {
try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
    }
catch(err){ next(err); }
};

// Get / tasks
exports.getAllTasks = async (req, res, next) => {
try{
     const tasks = await Task.find();
     res.status(200).json(tasks); 


}
catch(err){next(err);}


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
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const userRole = req.user.role;
    const isAssigned = task.assignedTo?.toString() === req.user._id.toString();

    if (userRole === 'Admin') {
      Object.assign(task, req.body);
    } else if (userRole === 'Employee') {
      if (!isAssigned) return res.status(403).json({ message: 'Not your task' });
      if (!('status' in req.body)) return res.status(403).json({ message: 'Can only update status' });
      task.status = req.body.status;
    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    console.error(err); // log the actual error
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
