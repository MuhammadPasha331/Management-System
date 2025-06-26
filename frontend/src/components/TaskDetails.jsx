import React from 'react';

export default function TaskDetails({ task }) {
  if (!task) return null;
  return (
    <div className="details">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due: {new Date(task.DueDate).toLocaleDateString()}</p>
    </div>
  );
}