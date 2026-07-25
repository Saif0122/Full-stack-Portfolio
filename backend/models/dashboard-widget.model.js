import mongoose from 'mongoose';

const dashboardWidgetSchema = new mongoose.Schema({
  widgetId: { type: String, required: true, unique: true }, // e.g. 'widget_visitors', 'widget_orders', 'widget_seo_score'
  title: { type: String, required: true },
  category: { type: String, enum: ['analytics', 'commerce', 'content', 'system', 'ai'], required: true },
  metricType: { type: String, required: true }, // e.g. 'counter', 'chart_line', 'chart_bar', 'gauge', 'list', 'status'
  position: { type: Number, default: 0 }, // grid sorting order
  width: { type: String, enum: ['1/4', '1/3', '1/2', '2/3', '3/4', 'full'], default: '1/4' },
  isVisible: { type: Boolean, default: true },
  config: { type: mongoose.Schema.Types.Mixed, default: {} }, // chart thresholds, refresh rate, custom filtering
}, { timestamps: true });

const DashboardWidget = mongoose.models.DashboardWidget || mongoose.model('DashboardWidget', dashboardWidgetSchema);
export default DashboardWidget;
