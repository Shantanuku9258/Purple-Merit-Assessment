process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key';
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test-user-management';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('User Profile Tests', () => {
  let authToken;
  let testUser;

  beforeAll(async () => {
    jest.setTimeout(15000);
    const testDbUri = process.env.MONGODB_URI;
    
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(testDbUri);
      console.log('Test database connected');
    }
  }, 15000);

  afterAll(async () => {
    try {
      if (mongoose.connection.readyState !== 0) {
        await User.deleteMany({});
        await mongoose.connection.close();
        console.log('Test database disconnected');
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }, 15000);

  beforeEach(async () => {
    await User.deleteMany({});
    const hashedPassword = await bcrypt.hash('Test123', 10);
    testUser = await User.create({
      fullName: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    });
    authToken = jwt.sign({ userId: testUser._id }, process.env.JWT_SECRET);
  });

  test('GET /api/user/profile - should return user profile', async () => {
    const response = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user.email).toBe('test@example.com');
  });

  test('PUT /api/user/profile - should update user profile', async () => {
    const response = await request(app)
      .put('/api/user/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        fullName: 'Updated Name',
        email: 'updated@example.com'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user.fullName).toBe('Updated Name');
  });
});
