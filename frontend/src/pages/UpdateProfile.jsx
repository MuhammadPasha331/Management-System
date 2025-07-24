import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (profilePic) formData.append('profileImage', profilePic); 

    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: data.message || 'Update failed', severity: 'error' });
      }
    } catch (err) {
      console.error('Update error:', err);
      setSnackbar({ open: true, message: 'Something went wrong', severity: 'error' });
    }
  };

  return (
    <Box p={3} maxWidth={400}>
      <Typography variant="h6" mb={2}>
        Update Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="New Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button variant="outlined" component="label" sx={{ mt: 2 }}>
          Upload Profile Picture
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </Button>

        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Save Changes
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateProfile;
