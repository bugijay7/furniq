import { sql } from "../config/db.js";

// Place a new order
export const placeOrder = async (req, res) => {
  const { items, total } = req.body;
  const userId = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in order" });
  }

  try {
    const [order] = await sql`
      INSERT INTO orders (user_id, total)
      VALUES (${userId}, ${total})
      RETURNING id, user_id, total, status, created_at
    `;

    for (const item of items) {
      await sql`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (${order.id}, ${item.product_id}, ${item.quantity}, ${item.price})
      `;
    }

    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders for logged-in user
export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await sql`
      SELECT * FROM orders WHERE user_id = ${userId} ORDER BY created_at DESC
    `;
    res.json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific order by ID (user-only)
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  try {
    const [order] = await sql`
      SELECT * FROM orders WHERE id = ${orderId} AND user_id = ${userId}
    `;

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const items = await sql`
      SELECT * FROM order_items WHERE order_id = ${orderId}
    `;

    res.json({ order, items });
  } catch (error) {
    console.error("Get order by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel order (user)
export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  try {
    const [order] = await sql`
      SELECT * FROM orders WHERE id = ${orderId} AND user_id = ${userId}
    `;

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }

    await sql`
      DELETE FROM orders WHERE id = ${orderId}
    `;

    res.json({ message: "Order cancelled" });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// (Optional) Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    res.json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
