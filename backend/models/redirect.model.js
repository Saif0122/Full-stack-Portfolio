import mongoose from 'mongoose';

const redirectSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    statusCode: {
      type: Number,
      enum: [301, 302, 307, 308],
      default: 301,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    lastAccessedAt: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Redirect = mongoose.models.Redirect || mongoose.model('Redirect', redirectSchema);
