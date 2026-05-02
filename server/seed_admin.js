require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB');
    
    // Check for existing Admin
    let admin = await User.findOne({ role: 'Admin' });
    
    if (admin) {
      // Just reset the password to something known so the user can test
      admin.password = 'admin123';
      await admin.save();
      console.log('--- EXISTING ADMIN FOUND ---');
      console.log(`Email: ${admin.email}`);
      console.log('Password reset to: admin123');
    } else {
      // Create a new Admin
      admin = await User.create({
        name: 'System Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'Admin'
      });
      console.log('--- NEW ADMIN CREATED ---');
      console.log(`Email: ${admin.email}`);
      console.log('Password: admin123');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
