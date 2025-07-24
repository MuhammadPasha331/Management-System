import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import ProgressBar from './components/ProgressBar';
import Analytics from './components/Dashboard';
import TaskShareModal from './components/TaskShareModal';
import API from './services/api';
import './App.css';
import socket from './socket'; // 
import Notifications from './pages/notifications'; 
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../src/theme'; // new file
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import ChangePassword from './pages/ChangePassword';
import UpdateProfile from './pages/UpdateProfile';
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [page, setPage] = useState('list');

  // 🔁 Share modal state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

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

        // ✅ Register user to socket after fetching
        socket.emit('register', res.data._id);
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
      setTaskToEdit(null); 
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const [mode, setMode] = useState('light');
const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));
const theme = getTheme(mode);


  // 📤 Share modal open function
  const openShareModal = (taskId) => {
    setSelectedTaskId(taskId);
    setShareModalOpen(true);
  };

  if (!token) return <Auth setToken={setToken} setUser={setUser} />;

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      <header>
  <Navbar onNavigate={setPage} user={user} setToken={setToken} />

   </header>

{/* 🔆 Theme Toggle Button (fixed on top-right) */}
<div
  style={{
    position: 'fixed',
    top: window.innerWidth < 600 ? 72 : 80,
    right: 16,
    zIndex: 1301, 
    backgroundColor: theme.palette.background.paper,
    borderRadius: '20px',
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }}
>
  <span role="img" aria-label="Light">🌞</span>
  <Switch checked={mode === 'dark'} onChange={toggleTheme} size="small" />
  <span role="img" aria-label="Dark">🌙</span>
</div>

      

      <main style={{ paddingTop: '72px', paddingLeft: '16px', paddingRight: '16px' }}>

        <ProgressBar tasks={tasks} />
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
            onShare={openShareModal}
            user={user}
          />
        )}
        {page === 'details' && selectedTask && <TaskDetails task={selectedTask} />}
        {page === 'analytics' && <Analytics />}
        {page === 'notifications' && <Notifications />}
        {page === 'change-password' && <ChangePassword />}
{page === 'update-profile' && <UpdateProfile />}
       
        <TaskShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          taskId={selectedTaskId}
        />
      </main>
    </div>
  </ThemeProvider>
);

}
