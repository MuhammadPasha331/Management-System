import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Tooltip,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { NotificationContext } from '../context/NotificationContext';

export default function Notifications() {
  const { notifications } = useContext(NotificationContext);
  const theme = useTheme();
  const [readIndices, setReadIndices] = useState([]);

  const markAsRead = (index) => {
    setReadIndices([...readIndices, index]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Notifications
      </Typography>

      {notifications.length === 0 ? (
        <Typography variant="body1">No notifications yet.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {notifications.map((notif, index) => {
            const isRead = readIndices.includes(index);
            return (
              <Box
                key={index}
                sx={{
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? '#3c3b3bff'
                      : theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  p: 2,
                  borderRadius: 2,
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? '0 2px 8px rgba(61, 59, 59, 0.4)'
                      : '0 2px 8px rgba(0,0,0,0.1)',
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: isRead ? 'line-through' : 'none',
                  opacity: isRead ? 0.6 : 1,
                  minHeight: '64px', // consistent height
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ flex: 1, mr: 2, wordBreak: 'break-word' }}
                >
                  {notif.message}
                </Typography>

                <Box sx={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
                  <Tooltip title="Mark as Read">
                    <span>
                      <IconButton
                        onClick={() => markAsRead(index)}
                        size="small"
                        sx={{ visibility: isRead ? 'hidden' : 'visible' }}
                      >
                        <DoneIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
