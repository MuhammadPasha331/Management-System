# Task Management System

A full-stack role-based Task Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It supports user authentication, task creation and tracking, role-based permissions, and a responsive frontend UI.

## Features

- User authentication (Register/Login)
- JWT-based session management
- Roles: Admin, Employee
- Create, edit, delete tasks (Admin)
- Update task status (Employee)
- Task list with filtering and search
- Progress tracking (completion percentage)
- Responsive design for desktop, tablet, and mobile
  
## Prerequisites

Ensure the following are installed:

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (Local or Atlas)
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
https://github.com/MuhammadPasha331/Management-System.git
```
## Backend 
cd Backend
npm install

## Create .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret

npm run dev

## Frontend
cd ../Frontend
npm install(react, react-dom, axios)
npm start

Visit http://localhost:3000


