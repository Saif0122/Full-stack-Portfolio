import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    }
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Mongoose hooks for password hashing would go here
// userSchema.pre('save', async function (next) { ... })

// Method for comparing passwords
// userSchema.methods.matchPassword = async function (enteredPassword) { ... }

const User = mongoose.model('User', userSchema);

export default User;
