import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  useTheme,
  Typography
} from '@mui/material';

export default function TaskForm({ fetchTasks, taskToEdit, clearEdit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'Pending',
    DueDate: '',
    assignedTo: ''
  });

  const [attachment, setAttachment] = useState(null); // New state for file
  const [userRole, setUserRole] = useState(null);
  const [employees, setEmployees] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchUserAndEmployees = async () => {
      try {
        const resUser = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserRole(resUser.data.role);

        if (resUser.data.role === 'Admin') {
          const resEmployees = await axios.get('/employees', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setEmployees(resEmployees.data);
        }
      } catch (err) {
        console.error('Error fetching user or employees:', err);
      }
    };

    fetchUserAndEmployees();
  }, []);

  useEffect(() => {
    if (taskToEdit) {
      setForm({
        ...taskToEdit,
        assignedTo: taskToEdit.assignedTo?._id || ''
      });
    }
  }, [taskToEdit]);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    if (userRole !== 'Employee') {
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('DueDate', form.DueDate);
      formData.append('assignedTo', form.assignedTo);
    }
    formData.append('status', form.status);
    if (attachment) formData.append('attachment', attachment);

    try {
      if (taskToEdit) {
        await axios.put(`/tasks/${taskToEdit._id}`, formData, { headers });
        clearEdit();
      } else {
        await axios.post('/tasks', formData, { headers });
      }

      fetchTasks();
      setForm({ title: '', description: '', status: 'Pending', DueDate: '', assignedTo: '' });
      setAttachment(null);
    } catch (err) {
      console.error('Error submitting task:', err);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#3c3b3bff' : '#ffffff',
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.divider}`,
        padding: '2rem',
        marginTop: '1rem',
        borderRadius: '12px',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 2px 8px rgba(61, 59, 59, 0.4)'
          : '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        mx: 'auto'
      }}
    >
      <Typography variant="h6" gutterBottom>
        {taskToEdit ? 'Edit Task' : 'Create New Task'}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        encType="multipart/form-data"
      >
        <TextField
          label="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
          disabled={userRole === 'Employee'}
        />
        <TextField
          label="Description"
          multiline
          minRows={2}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          disabled={userRole === 'Employee'}
        />
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            value={form.status}
            label="Status"
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="date"
          label="Due Date"
          InputLabelProps={{ shrink: true }}
          value={form.DueDate?.substring(0, 10)}
          onChange={e => setForm({ ...form, DueDate: e.target.value })}
          disabled={userRole === 'Employee'}
          inputProps={{ min: new Date().toISOString().split('T')[0] }}
        />
        {userRole === 'Admin' && (
          <FormControl>
            <InputLabel>Assign To</InputLabel>
            <Select
              value={form.assignedTo}
              label="Assign To"
              onChange={e => setForm({ ...form, assignedTo: e.target.value })}
              required
            >
              <MenuItem value="">Assign to</MenuItem>
              {employees.map(emp => (
                <MenuItem key={emp._id} value={emp._id}>{emp.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* New File Input */}
        <Button variant="outlined" component="label">
          {attachment ? `Selected: ${attachment.name}` : 'Attach File'}
          <input
            type="file"
            hidden
            accept="image/*,.pdf,.doc,.docx,.xlsx"
            onChange={e => setAttachment(e.target.files[0])}
          />
        </Button>

        <Button type="submit" variant="contained">
          {taskToEdit ? 'Update' : 'Create'} Task
        </Button>
      </Box>
    </Box>
  );
}
