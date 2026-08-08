import express from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect, requireRole(['Admin', 'Super Admin']));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
