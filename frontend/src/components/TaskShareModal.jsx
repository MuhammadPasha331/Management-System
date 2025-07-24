import React, { useEffect, useState } from 'react';
import API from '../services/api'; 

const TaskShareModal = ({ isOpen, onClose, taskId }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get('/employees'); // ✅ Correct URL & instance
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    if (isOpen) fetchEmployees();
  }, [isOpen]);

  const handleShare = async () => {
    try {
      await API.put(`/tasks/${taskId}/share`, {
        sharedWith: selectedUsers,
      });
      alert('Task shared!');
      onClose();
    } catch (err) {
      console.error('Error sharing task:', err);
      alert('Failed to share task.');
    }
  };

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Select users to share task with:</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => toggleUser(user._id)}
                />
                {user.name} ({user.email})
              </label>
            </li>
          ))}
        </ul>
        <button onClick={handleShare}>Share</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskShareModal;
