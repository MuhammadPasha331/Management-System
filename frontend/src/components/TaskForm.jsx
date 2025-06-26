import React, { useState, useEffect } from 'react';
import axios from '../services/api';

export default function TaskForm({ fetchTasks, taskToEdit, clearEdit }) {
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending', DueDate: '' });

  useEffect(() => {
    if (taskToEdit) setForm(taskToEdit);
  }, [taskToEdit]);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    if (taskToEdit) {
      await axios.put(`http://localhost:5000/api/tasks/${taskToEdit._id}`, form, headers);
      clearEdit();
    } else {
      await axios.post('http://localhost:5000/api/tasks', form, headers);
    }
    fetchTasks();
    setForm({ title: '', description: '', status: 'Pending', DueDate: '' });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <input type="date" value={form.DueDate?.substring(0, 10)} onChange={e => setForm({ ...form, DueDate: e.target.value })} />
      <button type="submit">{taskToEdit ? 'Update' : 'Create'} Task</button>
    </form>
  );
}