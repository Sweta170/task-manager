require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB');
    const user = await User.findOne({ email: 'devtester@example.com' });
    console.log('User found:', user);
    if (user) {
      console.log('Hashed Password:', user.password);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
