import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call here
    const formData = new FormData();
    formData.append('name', name);
    if (profilePic) formData.append('profilePic', profilePic);
    console.log('Profile updated');
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
    </Box>
  );
};

export default UpdateProfile;
