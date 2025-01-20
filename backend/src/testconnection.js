// testConnection.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/secmon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000  // 30 seconds
})
.then(() => {
  console.log('Successfully connected to MongoDB');
  process.exit();  // Exit after successful connection
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);  // Exit with error
});