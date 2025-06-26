import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

test('renders list of tasks', () => {
  const mockTasks = [
    { _id: '1', title: 'Test Task', status: 'Pending', DueDate: '2025-07-01T00:00:00Z' }
  ];
  render(<TaskList tasks={mockTasks} onEdit={jest.fn()} onDelete={jest.fn()} user={{ role: 'Admin' }} />);
  expect(screen.getByText(/test task/i)).toBeInTheDocument();
});
