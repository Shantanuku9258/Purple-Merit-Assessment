/**
 * Admin User Initialization
 * Creates an admin user on server start if one doesn't exist
 * Uses environment variables for credentials
 */

const User = require('../models/User');
const bcrypt = require('bcrypt');

const initializeAdmin = async () => {
  try {
    // Skip if no admin credentials provided
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.log('ℹ️  Admin initialization skipped (ADMIN_EMAIL or ADMIN_PASSWORD not set)');
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL.toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'System Admin';

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      if (existingAdmin.role === 'admin') {
        console.log('✅ Admin user already exists:', adminEmail);
        return;
      } else {
        // Update existing user to admin
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        existingAdmin.role = 'admin';
        existingAdmin.password = hashedPassword;
        existingAdmin.fullName = adminName;
        existingAdmin.status = 'active';
        await existingAdmin.save();
        console.log('✅ Existing user updated to admin:', adminEmail);
        return;
      }
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = new User({
      fullName: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      status: 'active'
    });

    await admin.save();
    console.log('✅ Admin user initialized successfully:', adminEmail);
  } catch (error) {
    console.error('❌ Error initializing admin user:', error.message);
    // Don't throw - allow server to continue even if admin init fails
  }
};

module.exports = initializeAdmin;

