// seedAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const email = 'admin@example.com';
  await User.deleteOne({ email });

  const newAdmin = new User({
    name: 'AdminUser',
    email,
    password: 'admin123',
    role: 'Admin',
  });

  await newAdmin.save();
  console.log(' Admin seeded successfully');

  await mongoose.disconnect();
};

seedAdmin();
