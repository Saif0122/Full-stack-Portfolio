import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'success', 'warning', 'error', 'system', 'order', 'ai'], default: 'info' },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  targetUrl: { type: String }, // Action link e.g. '/admin/dashboard/orders/ORD-9821'
  isRead: { type: Boolean, default: false },
  recipientRole: { type: String, default: 'Admin' }, // 'Admin', 'Super Admin', or custom role target
  metadata: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
export default Notification;
