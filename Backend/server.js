// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // In production, restrict to your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// === User <-> Socket Mapping ===
const userSockets = new Map();

io.on('connection', (socket) => {
  console.log('New socket connected:', socket.id);

  socket.on('register', (userId) => {
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
    userSockets.set(userId, socket.id);
    socket.join(userId); // join room by user ID
  });

  socket.on('disconnect', () => {
    for (const [userId, socketId] of userSockets.entries()) {
      if (socket.id === socketId) {
        userSockets.delete(userId);
        break;
      }
    }
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// === Routes & Middleware ===
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');

const { errorHandler } = require('./middleware/errorMiddleware');

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', taskRoutes(io)); // ✅ Inject `io` into task routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(errorHandler);

// === MongoDB Connection & Server Start ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(' MongoDB connected');
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(' MongoDB connection error:', err);
  });
