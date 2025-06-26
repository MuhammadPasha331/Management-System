import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import ProgressBar from './components/ProgressBar';
import API from './services/api';
import './App.css';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [page, setPage] = useState('list');

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        const res = await API.get('/auth/profile');
        setUser(res.data);
        await fetchTasks();
      } catch (err) {
        console.error('Token expired or invalid, logging out.');
        setToken(null);
        localStorage.removeItem('token');
      }
    };

    if (token) fetchUserAndTasks();
  }, [token]);

  const handleDelete = async id => {
    try {
      await API.delete(`/tasks/${id}`);
      await fetchTasks();
      setTaskToEdit(null); // Clear form after deletion
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (!token) return <Auth setToken={setToken} setUser={setUser} />;

  return (
    <div className="App">
      {/* ✅ Navbar at the top */}
      <header>
        <Navbar onNavigate={setPage} user={user} setToken={setToken} />
      </header>

      <main>
        <ProgressBar tasks={tasks} />

        {/* 👇 Conditional Routing */}
        {page === 'create' && (
          <TaskForm
            fetchTasks={fetchTasks}
            taskToEdit={taskToEdit}
            clearEdit={() => setTaskToEdit(null)}
          />
        )}

        {page === 'list' && (
          <TaskList
            tasks={tasks}
            onEdit={task => {
              setTaskToEdit(task);
              setPage('create');
            }}
            onDelete={handleDelete}
            onView={task => {
              setSelectedTask(task);
              setPage('details');
            }}
            user={user}
          />
        )}

        {page === 'details' && selectedTask && (
          <TaskDetails task={selectedTask} />
        )}

      </main>
    </div>
  );
}
