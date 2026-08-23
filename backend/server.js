import app from './app.js';
import mongoose from 'mongoose';
import { config } from './config/env.config.js';

import { seedDatabase } from './database/seeder.js';
import { seedPortfolio } from './database/portfolio-seed.js';

// Connect to MongoDB
const connectDB = async () => {
  try {
    let uri = config.mongoose.uri;
    
    // STRICT RULE: Only attempt in-memory databases in development. NEVER in production.
    if (config.env !== 'production' && (uri.includes('localhost') || uri.includes('127.0.0.1'))) {
      try {
        console.log('Attempting to spin up in-memory MongoDB for local development...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
      } catch (err) {
        console.warn('\n⚠️ MongoMemoryServer failed to start (Missing Visual C++ Redistributable or similar issue).');
        console.warn('⚠️ Falling back to native local MongoDB instance at 27017.\n');
        // uri remains the default localhost one
      }
    }

    // Fail-fast configuration: Don't hang for 30 seconds if DB is down.
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    
    // Listen for database connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });
    
    // Run the seeders
    await seedDatabase();
    await seedPortfolio();
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.error('CRITICAL: Failed to connect to the database. Exiting application.');
    process.exit(1); // Exit the process immediately if the DB connection fails
  }
};

// Start the server
const startServer = async () => {
  try {
    await connectDB(); // Now connecting to in-memory DB or real URI
    app.listen(config.port, () => {
      console.log(`Server running in ${config.env} mode on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
};

startServer();
