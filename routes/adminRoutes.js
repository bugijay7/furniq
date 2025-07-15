import express from 'express';
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from '../controllers/adminController.js';

import { authenticateToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes here are protected and require admin access
router.use(authenticateToken, isAdmin);

router.get('/orders', getAllOrders);
router.get('/orders/:orderId', getOrderById);
router.put('/orders/:orderId', updateOrderStatus);
router.delete('/orders/:orderId', deleteOrder);

export default router;
