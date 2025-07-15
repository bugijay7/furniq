import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMe
} from '../controllers/userController.js';

import { authenticateToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Logged-in user info
router.get('/me', authenticateToken, getMe);

// Admin routes
router.get('/', authenticateToken, isAdmin, getAllUsers);        // Get all users
router.post('/', authenticateToken, isAdmin, createUser);        // Create user (admin only)
router.get('/:id', authenticateToken, getUserById);              // Get user by ID
router.put('/:id', authenticateToken, isAdmin, updateUser);      // Update user
router.delete('/:id', authenticateToken, isAdmin, deleteUser);   // Delete user

export default router;
