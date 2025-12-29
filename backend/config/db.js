const mongoose = require('mongoose');
const initializeAdmin = require('./adminInit');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/user-management';
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
    
    // Initialize admin user after database connection
    if (process.env.NODE_ENV !== 'test') {
      await initializeAdmin();
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;
