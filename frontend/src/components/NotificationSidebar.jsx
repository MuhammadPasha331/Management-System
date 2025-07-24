 import { useContext } from 'react';
import  {NotificationContext}  from '../context/NotificationContext'

const NotificationSidebar = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="notification-sidebar">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((n, index) => (
          <li key={index}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
};