process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key';
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test-user-management';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('Authentication Tests', () => {
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
  });

  test('1. User signup success', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'Password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe('john@example.com');
    expect(response.body.user.fullName).toBe('John Doe');
    expect(response.body.user.password).toBeUndefined();
  });

  test('2. Login with correct credentials', async () => {
    const hashedPassword = await bcrypt.hash('Password123', 10);
    const user = await User.create({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      password: hashedPassword,
      status: 'active'
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'jane@example.com',
        password: 'Password123'
      });

    if (response.status !== 200) {
      console.log('Response body:', JSON.stringify(response.body, null, 2));
    }

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe('jane@example.com');
  });

  test('3. Login failure with wrong password', async () => {
    const hashedPassword = await bcrypt.hash('Password123', 10);
    await User.create({
      fullName: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      status: 'active'
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'WrongPassword'
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid credentials');
  });

  test('4. Access protected route without token should fail', async () => {
    const response = await request(app)
      .get('/api/user/profile');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('No token provided');
  });

  test('5. Admin-only route access control', async () => {
    const hashedPassword = await bcrypt.hash('Password123', 10);
    const regularUser = await User.create({
      fullName: 'Regular User',
      email: 'regular@example.com',
      password: hashedPassword,
      role: 'user',
      status: 'active'
    });

    const token = jwt.sign({ userId: regularUser._id }, process.env.JWT_SECRET);

    const response = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Admin access required');
  });
});
