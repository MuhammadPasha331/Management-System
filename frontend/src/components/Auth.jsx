import React, { useState } from 'react';
import axios from '../services/api';
import './Auth.css';

export default function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'Employee' });
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // reset error on submit

    const endpoint = isLogin ? 'login' : 'register';

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, form);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">🔐</div>
        <h2>{isLogin ? 'Sign in with email' : 'Register with email'}</h2>
        <p className="auth-subtext">Make a new doc to bring your tasks and teams together. For free.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          {!isLogin && (
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
          )}
          <button className="auth-submit" type="submit">Get Started</button>
        </form>

        <div className="auth-divider">or sign in with</div>
        <div className="auth-socials">
          <button className="google">G</button>
          <button className="facebook">f</button>
          <button className="apple"></button>
        </div>

        <button className="auth-switch" onClick={() => {
          setIsLogin(!isLogin);
          setError('');
        }}>
          {isLogin ? 'Don’t have an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
