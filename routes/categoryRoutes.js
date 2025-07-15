import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  getProductsByCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllCategories); // Get all categories
router.get('/:id', getCategoryById); // Get a single category by ID
router.get('/:id/products', getProductsByCategory); // Get all products under a specific category

// Protected Routes (e.g., for admin users)
router.post('/', authenticateToken, createCategory); // Add a new category
router.put('/:id', authenticateToken, updateCategory); // Edit a category
router.delete('/:id', authenticateToken, deleteCategory); // Delete a category

export default router;
