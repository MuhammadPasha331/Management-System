import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  test('renders form inputs', () => {
    render(<TaskForm fetchTasks={jest.fn()} clearEdit={jest.fn()} />);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  test('submits with valid input', () => {
    const fetchMock = jest.fn();
    render(<TaskForm fetchTasks={fetchMock} clearEdit={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'Testing form' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(fetchMock).toHaveBeenCalled();
  });
});
