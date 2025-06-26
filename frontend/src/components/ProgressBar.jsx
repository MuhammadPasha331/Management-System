import React from 'react';

export default function ProgressBar({ tasks }) {
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
  return (
    <div className="progress">
      <div className="bar" style={{ width: `${percent}%` }}>{percent.toFixed(0)}%</div>
    </div>
  );
}