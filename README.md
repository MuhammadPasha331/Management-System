Task Management System (MERN Stack)
A full-featured, role-based Task Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Designed for collaborative team environments, this application supports real-time task sharing, file uploads, analytics tracking, and responsive UI for all devices.
Key Features
•	- Role-Based Access (Admin and Employee)
•	- Analytics Dashboard with progress and trend charts
•	- Real-Time Notifications (Socket.IO)
•	- File Upload Support (Multer)
•	- Task Filtering and Search
•	- Responsive UI for all screen sizes
Prerequisites
•	- Node.js (v16 or higher)
•	- npm (v8 or higher)
•	- MongoDB (local or Atlas)
•	- Git
Setup Instructions
1. Clone the Repository
git clone https://github.com/MuhammadPasha331/Management-System.git
cd Management-System
2. Backend Setup
cd backend
npm install
.env file content:
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret
npm run dev
3. Frontend Setup
cd ../frontend
npm install
npm start
Visit http://localhost:3000
API Documentation
Auth
POST /api/auth/register
Request:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "Employee"
}
Response:
{
  "message": "User registered successfully"
}
POST /api/auth/login
Request:
{
  "email": "john@example.com",
  "password": "123456"
}
Response:
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "user_id",
    "username": "john_doe",
    "role": "Employee"
  }
}
Task Management
POST /api/tasks
PUT /api/tasks/:id/share
GET /api/tasks/assigned
GET /api/tasks/shared
Analytics
GET /api/analytics/overview
GET /api/analytics/trends?period=weekly
Notifications
GET /api/notifications
Folder Structure

Management-System/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
├── .gitignore
└── README.md
Tech Used :
| Tech       | Role                    |
| ---------- | ----------------------- |
| React.js   | Frontend UI             |
| Express.js | Backend framework       |
| MongoDB    | Database                |
| Node.js    | Runtime environment     |
| Socket.IO  | Real-time communication |
| Multer     | File uploads            |
| JWT        | Auth & session security |


Future Enhancements
•	- Email & push notifications
•	- Pagination & sorting for large task sets
•	- Role: Supervisor (mid-level management)
•	- Export tasks as CSV
•	- Audit logs & activity tracking
License
Licensed under the MIT License.

Developed by Muhammad Pasha
