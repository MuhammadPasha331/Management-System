import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token'); // Ensure token is stored after login

      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Password updated successfully!');
        setOldPassword('');
        setNewPassword('');
      } else {
        alert(`❌ Error: ${data.message || 'Password update failed'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('⚠️ Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3} maxWidth={400} mx="auto">
      <Typography variant="h6" mb={2}>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Old Password"
          type="password"
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
