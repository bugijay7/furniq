import express from 'express';
import {
  addReview,
  getReviewsForProduct,
  deleteReview,
  updateReview
} from '../controllers/reviewController.js';

import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route: Get all reviews for a product
router.get('/product/:productId', getReviewsForProduct);

// authenticateTokend routes
router.post('/product/:productId', authenticateToken, addReview);         // Add review
router.put('/:reviewId', authenticateToken, updateReview);                // Update review
router.delete('/:reviewId', authenticateToken, deleteReview);             // Delete review

export default router;
