import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Boilerplate for connection (do not implement actual connection if not required yet, but this is standard)
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Start the server
const startServer = async () => {
  try {
    // await connectDB(); // Uncomment when ready to connect to a real database
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
};

startServer();
