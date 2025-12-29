/**
 * Script to create an admin user
 * Usage: node scripts/createAdmin.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user-management');
    console.log('Connected to MongoDB');

    // Get email and password from environment variables, command line arguments, or use defaults
    const email = process.env.ADMIN_EMAIL || process.argv[2] || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || process.argv[3] || 'Admin123';
    const fullName = process.env.ADMIN_NAME || process.argv[4] || 'Admin User';

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: email.toLowerCase() });
    
    if (existingAdmin) {
      if (existingAdmin.role === 'admin') {
        console.log('Admin user already exists with this email:', email);
        console.log('To update password, use MongoDB shell or update manually.');
        process.exit(0);
      } else {
        // Update existing user to admin
        const hashedPassword = await bcrypt.hash(password, 10);
        existingAdmin.role = 'admin';
        existingAdmin.password = hashedPassword;
        existingAdmin.fullName = fullName;
        await existingAdmin.save();
        console.log('✅ Existing user updated to admin:', email);
        process.exit(0);
      }
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'admin',
      status: 'active'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Full Name:', fullName);
    console.log('\nYou can now login with these credentials.');

  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();

