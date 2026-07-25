import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

import { MongoMemoryServer } from 'mongodb-memory-server';
import { seedDatabase } from './database/seeder.js';
import { seedPortfolio } from './database/portfolio-seed.js';

// Connect to MongoDB
const connectDB = async () => {
  try {
    let uri = MONGODB_URI;
    
    // If we're using localhost but MongoDB isn't running, spin up an in-memory server
    if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
      try {
        console.log('Attempting to spin up in-memory MongoDB for local development...');
        const mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
      } catch (err) {
        console.warn('\n⚠️ MongoMemoryServer failed to start (Missing Visual C++ Redistributable).');
        console.warn('⚠️ Falling back to native local MongoDB instance at 27017.\n');
        // uri remains the default localhost one
      }
    }

    await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    
    // Run the seeders
    await seedDatabase();
    await seedPortfolio();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Start the server
const startServer = async () => {
  try {
    await connectDB(); // Now connecting to in-memory DB or real URI
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
};

startServer();
