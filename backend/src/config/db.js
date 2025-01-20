// backend/src/config/db.js
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const mongoURI = 'mongodb://localhost:27017/secmon';  // Directly specify URI here
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // Increase timeout to 30 seconds
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    setTimeout(connectDB, 5000);  // Retry after 5 seconds
  }
};

connectDB();  // Initial call to connect to the database