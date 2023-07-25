const mongoose = require('mongoose');

// Update the connection URL from localhost to 127.0.0.1
const connectionString = 'mongodb://127.0.0.1:27017/LoginDB';

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connection established');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
