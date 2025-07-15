import express from 'express';
import {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';

import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getUserCart); // View current user's cart
router.post('/', authenticateToken, addToCart); // Add item to cart
router.put('/:itemId', authenticateToken, updateCartItem); // Update quantity of item
router.delete('/:itemId', authenticateToken, removeFromCart); // Remove item from cart

// ✅ Make this explicit
router.delete('/clear/all', authenticateToken, clearCart); // Clear the entire cart

export default router;
