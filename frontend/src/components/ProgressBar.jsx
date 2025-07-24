import React from 'react';

export default function ProgressBar({ tasks }) {
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const percent = tasks.length ? (completed / tasks.length) * 100 : 0;

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Progress Bar</h3>
      <div style={{
        backgroundColor: '#eee',
        borderRadius: '10px',
        height: '30px',
        width: '100%',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percent}%`,
          backgroundColor: '#4caf50',
          height: '100%',
          textAlign: 'center',
          color: 'white',
          fontSize: '12px',
          lineHeight: '20px'
        }}>
          {percent.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}
