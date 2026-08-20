import mongoose from 'mongoose';

const notFoundSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      index: true,
    },
    referrer: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const NotFoundLog = mongoose.models.NotFoundLog || mongoose.model('NotFoundLog', notFoundSchema);
