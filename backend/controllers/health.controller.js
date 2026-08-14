import mongoose from 'mongoose';
import os from 'os';

export const getHealthStatus = async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    const uptime = process.uptime();
    
    // System metrics
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const memoryUsage = ((totalMemory - freeMemory) / totalMemory * 100).toFixed(2);
    const cpuLoad = os.loadavg()[0].toFixed(2);

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      status: 'healthy',
      services: {
        database: {
          status: dbStatus,
          latency: 'N/A' // Requires actual ping to measure
        },
        api: {
          status: 'online',
          uptime: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`
        }
      },
      system: {
        memoryUsage: `${memoryUsage}%`,
        cpuLoad: `${cpuLoad}%`,
        platform: os.platform()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'unhealthy',
      error: error.message
    });
  }
};
