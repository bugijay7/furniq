import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (error) {
      setMessage('Failed to fetch orders.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderItems = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.items;
    } catch (error) {
      console.error('Failed to fetch order items', error);
      return [];
    }
  };

  const toggleOrderDetails = async (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      const items = await fetchOrderItems(orderId);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, items } : order
        )
      );
      setExpandedOrderId(orderId);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Order cancelled.');
      fetchOrders(); // Refresh list
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Failed to cancel order.';
      setMessage(errMsg);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading your orders...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-26">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      {message && (
        <p className="mb-4 text-center text-red-500 font-medium">{message}</p>
      )}

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-md p-4 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>Total:</strong> Ksh {order.total}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`font-semibold ${
                        order.status === 'pending'
                          ? 'text-yellow-500'
                          : 'text-green-600'
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleOrderDetails(order.id)}
                    className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200"
                  >
                    {expandedOrderId === order.id ? 'Hide' : 'View'} Items
                  </button>

                  {order.status === 'pending' && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="px-3 py-1 border text-red-600 hover:text-red-800 text-sm"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {expandedOrderId === order.id && order.items && (
                <ul className="mt-4 space-y-2 border-t pt-3">
                  {order.items.map((item) => (
                    <li
                      key={item.product_id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.quantity} × Product #{item.product_id}
                      </span>
                      <span>Ksh {item.price}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderTracking;
