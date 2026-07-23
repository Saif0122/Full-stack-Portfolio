import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Permission name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    module: {
      type: String,
      required: true,
      trim: true,
      description: 'The module this permission applies to (e.g., products, orders, users)'
    }
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
