import { sql } from "../config/db.js";

// Add a new review
export const addReview = async (req, res) => {
  const userId = req.user.id;
  const { rating, comment } = req.body;
  const { productId } = req.params;

  if (!productId || isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const [existing] = await sql`
      SELECT * FROM reviews WHERE product_id = ${productId} AND user_id = ${userId}
    `;

    if (existing) {
      return res.status(400).json({ message: "You already reviewed this product" });
    }

    const [review] = await sql`
      INSERT INTO reviews (product_id, user_id, rating, comment)
      VALUES (${productId}, ${userId}, ${rating}, ${comment})
      RETURNING *
    `;

    res.status(201).json(review);
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all reviews for a product
export const getReviewsForProduct = async (req, res) => {
  const { productId } = req.params;

  if (!productId || isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const reviews = await sql`
      SELECT r.*, u.name AS user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE product_id = ${Number(productId)}
      ORDER BY created_at DESC
    `;
    res.json(reviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a review (user can update their own review)
export const updateReview = async (req, res) => {
  const userId = req.user.id;
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const [existing] = await sql`
      SELECT * FROM reviews WHERE id = ${reviewId} AND user_id = ${userId}
    `;

    if (!existing) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    const [updated] = await sql`
      UPDATE reviews
      SET rating = ${rating}, comment = ${comment}
      WHERE id = ${reviewId}
      RETURNING *
    `;

    res.json(updated);
  } catch (error) {
    console.error("Update review error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a review (user can delete their own review)
export const deleteReview = async (req, res) => {
  const userId = req.user.id;
  const { reviewId } = req.params;

  try {
    const [existing] = await sql`
      SELECT * FROM reviews WHERE id = ${reviewId} AND user_id = ${userId}
    `;

    if (!existing) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    await sql`DELETE FROM reviews WHERE id = ${reviewId}`;
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
