import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrders // Optional: Admin route
} from '../controllers/orderController.js';

import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User routes (all require login)
router.post('/', authenticateToken, placeOrder);              // Place a new order
router.get('/', authenticateToken, getUserOrders);            // Get current user's orders
router.get('/:orderId', authenticateToken, getOrderById);     // Get a specific order
router.delete('/:orderId', authenticateToken, cancelOrder);   // Cancel an order

// Optional admin route
// router.get('/admin/all', authenticateToken, getAllOrders);  // Admin: View all orders

export default router;
