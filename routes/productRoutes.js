import express from 'express';

import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getLatestProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts); // All products
router.get('/search', searchProducts); // Search by keyword: ?q=chair
router.get('/category/:category', getProductsByCategory); // Filter by category
router.get('/featured', getFeaturedProducts); // Featured products
router.get('/latest', getLatestProducts); // Recently added products
router.get('/:id', getProductById); // Single product by ID

// Protected routes (requires login, ideally for admins)
router.post('/', authenticateToken, createProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;
