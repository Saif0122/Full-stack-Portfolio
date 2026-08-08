import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').populate('role', 'name').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) { next(error); }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('role', 'name');
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: user });
  } catch (error) { next(error); }
};

export const createUser = async (req, res, next) => {
  try {
    // Basic user creation (usually via auth signup, but admin might create directly)
    const user = await User.create(req.body);
    const userWithoutPassword = await User.findById(user._id).select('-password').populate('role', 'name');
    res.status(201).json({ success: true, data: userWithoutPassword });
  } catch (error) { 
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    next(error); 
  }
};

export const updateUser = async (req, res, next) => {
  try {
    // If updating password, it will be hashed by pre-save hook
    if (req.body.password) {
      const userToUpdate = await User.findById(req.params.id);
      if (!userToUpdate) return res.status(404).json({ success: false, message: 'Not found' });
      Object.assign(userToUpdate, req.body);
      await userToUpdate.save();
      const user = await User.findById(userToUpdate._id).select('-password').populate('role', 'name');
      return res.json({ success: true, data: user });
    } else {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password').populate('role', 'name');
      if (!user) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: user });
    }
  } catch (error) { next(error); }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: {} });
  } catch (error) { next(error); }
};
