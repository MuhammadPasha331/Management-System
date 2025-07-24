jest.setTimeout(30000); // 30 seconds

const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const taskRoutes = require('../routes/taskRoutes.mock');
const Task = require('../models/Task');

const app = express();
app.use(express.json());
app.use('/api', taskRoutes);


let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  await Task.deleteMany();
});

describe('Task API Tests', () => {
  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        Id: 1,
        title: 'Test Task',
        description: 'Test Description',
        status: 'Pending',
        DueDate: '2025-06-20T00:00:00.000Z'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Task');
  });

  it('should get all tasks', async () => {
    await Task.create({ Id: 1, title: 'Task 1' });
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
  });

  it('should get a task by ID', async () => {
    const task = await Task.create({ Id: 2, title: 'Task 2' });
    const res = await request(app).get(`/api/tasks/${task._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Task 2');
  });

  it('should update a task', async () => {
    const task = await Task.create({ Id: 3, title: 'Old Title' });
    const res = await request(app)
      .put(`/api/tasks/${task._id}`)
      .send({ title: 'Updated Title' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should delete a task', async () => {
    const task = await Task.create({ Id: 4, title: 'To Delete' });
    const res = await request(app).delete(`/api/tasks/${task._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task deleted');
  });
});
