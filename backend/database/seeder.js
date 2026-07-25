import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

export const seedDatabase = async () => {
  try {
    console.log('Running database seeder...');

    // 1. Seed Roles
    const roles = ['Visitor', 'Customer', 'Author', 'Editor', 'Admin', 'Super Admin'];
    for (const roleName of roles) {
      const exists = await Role.findOne({ name: roleName });
      if (!exists) {
        await Role.create({ name: roleName, description: `${roleName} role` });
      }
    }

    // 2. Seed Admin User
    const adminRole = await Role.findOne({ name: 'Admin' });
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed by model pre-save hook
        role: adminRole._id,
      });
      console.log('✅ Admin user created: admin@example.com / password123');
    } else {
      console.log('✅ Admin user already exists.');
    }

    // 3. Seed Customer User
    const customerRole = await Role.findOne({ name: 'Customer' });
    const customerExists = await User.findOne({ email: 'customer@example.com' });
    
    if (!customerExists) {
      await User.create({
        name: 'Test Customer',
        email: 'customer@example.com',
        password: 'password123',
        role: customerRole._id,
      });
      console.log('✅ Customer user created: customer@example.com / password123');
    }

    console.log('Database seeding complete.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
