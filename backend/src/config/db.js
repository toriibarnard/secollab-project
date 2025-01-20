// backend/src/config/db.js

const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const mongoURI = 'mongodb://localhost:27017/secmon'; 
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // increase timeout to 30 seconds
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    setTimeout(connectDB, 5000);  // retry after 5 seconds
  }
};

connectDB();  // initial call to connect to the database