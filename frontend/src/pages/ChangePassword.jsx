import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call here
    console.log({ oldPassword, newPassword });
  };

  return (
    <Box p={3} maxWidth={400}>
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
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Update Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
