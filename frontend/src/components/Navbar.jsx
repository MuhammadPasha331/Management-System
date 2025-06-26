import React from 'react';

export default function Navbar({ onNavigate, user, setToken }) {
  return (
    <nav className="navbar">
      <h3>Task Manager</h3>
      <div>
        <button onClick={() => onNavigate('list')}>Task List</button>
        {(user?.role === 'Admin') && (
          <button onClick={() => onNavigate('create')}>Create Task</button>
        )}
        <button
          onClick={() => {
            setToken(null);
            localStorage.removeItem('token');
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
