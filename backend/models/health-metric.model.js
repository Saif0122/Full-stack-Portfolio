import mongoose from 'mongoose';

const healthMetricSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now, expires: '30d' }, // Keep for 30 days
  cpuUsage: { type: Number },
  memoryUsage: { type: Number }, // bytes
  freeMemory: { type: Number },
  totalMemory: { type: Number },
  dbLatency: { type: Number }, // ms
  apiLatency: { type: Number }, // ms
  status: { type: String, enum: ['healthy', 'degraded', 'down'] },
}, { timestamps: true });

const HealthMetric = mongoose.models.HealthMetric || mongoose.model('HealthMetric', healthMetricSchema);
export default HealthMetric;
