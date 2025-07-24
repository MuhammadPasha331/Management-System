import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import TaskShareModal from './TaskShareModal';
import API from '../services/api'; // your axios setup file

export default function TaskList({ onEdit, onDelete, onView, user }) {
  const theme = useTheme(); // get current theme (light/dark)
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const [assignedRes, sharedRes] = await Promise.all([
          API.get('/tasks'),
          API.get('/tasks/shared'),
        ]);

        const sharedTasks = sharedRes.data.map(task => ({
          ...task,
          isShared: true,
        }));

        setTasks([...assignedRes.data, ...sharedTasks]);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  const handleShare = (taskId) => {
    setSelectedTaskId(taskId);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setSelectedTaskId(null);
    setShowShareModal(false);
  };

  return (
    <div
      className="task-list"
      style={{
        backgroundColor: theme.palette.mode === 'dark' ? '#5c5b5bff' : '#ffffff',
        color: theme.palette.text.primary,
        padding: '1rem',
      }}
    >
      {tasks.map(task => (
        <div
  key={task._id}
  className="task-card"
  style={{
    backgroundColor: theme.palette.mode === 'dark' ? '#3c3b3bff' : '#ffffff',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 2px 8px rgba(61, 59, 59, 0.4)'
      : '0 2px 8px rgba(0,0,0,0.1)',
  }}
>

          <h3>{task.title}</h3>
          {task.isShared && <span className="shared-label">🔁 Shared with you</span>}
          <p>Status: {task.status}</p>
          <p>Due: {new Date(task.DueDate).toLocaleDateString()}</p>

          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
          <button onClick={() => onView(task)}>View Details</button>

          {user?.role === 'Employee' && task.assignedTo?._id === user._id && (
            <button onClick={() => handleShare(task._id)}>Share</button>
          )}
        </div>
      ))}

      <TaskShareModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        taskId={selectedTaskId}
      />
    </div>
  );
}
