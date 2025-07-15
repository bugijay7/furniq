import { sql } from "../config/db.js";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await sql`SELECT * FROM orders WHERE id = ${orderId}`;
    if (result.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const result = await sql`
      UPDATE orders
      SET status = ${status}
      WHERE id = ${orderId}
      RETURNING *
    `;
    if (result.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order status updated', order: result[0] });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const result = await sql`
      DELETE FROM orders
      WHERE id = ${orderId}
      RETURNING *
    `;
    if (result.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
