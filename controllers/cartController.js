import { sql } from "../config/db.js";

// Get user's cart
export const getUserCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await sql`
      SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.image
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ${userId}
    `;
    res.json(cart);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add to cart (insert or increase quantity)
export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  try {
    const [existing] = await sql`
      SELECT * FROM cart_items WHERE user_id = ${userId} AND product_id = ${product_id}
    `;

    if (existing) {
      const updated = await sql`
        UPDATE cart_items
        SET quantity = quantity + ${quantity}
        WHERE id = ${existing.id}
        RETURNING *
      `;
      res.json(updated[0]);
    } else {
      const [added] = await sql`
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES (${userId}, ${product_id}, ${quantity})
        RETURNING *
      `;
      res.status(201).json(added);
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update quantity of a cart item
export const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.params;
  const { quantity } = req.body;

  try {
    const [updated] = await sql`
      UPDATE cart_items
      SET quantity = ${quantity}
      WHERE user_id = ${userId} AND product_id = ${product_id}
      RETURNING *
    `;

    if (!updated) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update cart item error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.params;

  try {
    const [deleted] = await sql`
      DELETE FROM cart_items
      WHERE user_id = ${userId} AND product_id = ${product_id}
      RETURNING *
    `;

    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;
    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
