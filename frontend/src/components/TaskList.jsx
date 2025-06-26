import React from 'react';

export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>
          <p>Status: {task.status}</p>
          <p>Due: {new Date(task.DueDate).toLocaleDateString()}</p>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
          
        </div>
      ))}
    </div>
  );
}