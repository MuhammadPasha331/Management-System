import { render, screen, fireEvent } from '@testing-library/react';
import Auth from './Auth';

test('renders login form by default', () => {
  render(<Auth setToken={jest.fn()} setUser={jest.fn()} />);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
});
