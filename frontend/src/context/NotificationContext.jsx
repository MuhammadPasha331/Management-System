import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';
import socket from '../socket';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No token found. Cannot fetch notifications.');
          return;
        }

        const res = await API.get('/notifications', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token here
          },
        });

        setNotifications(res.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();

    // Realtime via socket
    socket.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
