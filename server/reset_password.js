require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB');
    const user = await User.findOne({ email: 'devtester@example.com' });
    if (user) {
      user.password = '123456';
      await user.save();
      console.log('Password reset to 123456 successfully.');
    } else {
      console.log('User not found.');
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
