import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
      minlength: 6,
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    githubId: {
      type: String,
      sparse: true,
      unique: true,
    },
    authProvider: {
      type: String,
      enum: ['local', 'google', 'github'],
      default: 'local',
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
    jobTitle: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }]
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Mongoose hooks for password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method for comparing passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
