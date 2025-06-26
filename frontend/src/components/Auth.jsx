import React, { useState } from 'react';
import axios from '../services/api';

export default function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'Employee' });

  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, form);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  return (
    <div className="auth">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />}
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        {!isLogin && (
          <select onChange={e => setForm({ ...form, role: e.target.value })}>
            <option>Employee</option>
            <option>Admin</option>
          </select>
        )}
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Switch to Register' : 'Switch to Login'}</button>
    </div>
  );
}
