import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export default function TaskDetails({ task }) {
  const theme = useTheme();
  if (!task) return null;

  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        backgroundColor: theme.palette.mode === 'dark' ? '#3c3b3bff' : '#ffffff',
        color: theme.palette.text.primary,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 2px 8px rgba(61, 59, 59, 0.4)'
          : '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" gutterBottom>{task.title}</Typography>
      <Typography variant="body1" gutterBottom>{task.description}</Typography>
      <Typography>Status: {task.status}</Typography>
      <Typography>Due: {new Date(task.DueDate).toLocaleDateString()}</Typography>
    </Box>
  );
}
