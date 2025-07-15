import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://furniq.onrender.com/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setMessage('Failed to load cart.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const items = cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));
      const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

      // Place the order
      await axios.post(
        'https://furniq.onrender.com/api/order',
        { items, total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Clear the cart after order
      await axios.delete('https://furniq.onrender.com/api/cart/clear/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('✅ Order placed successfully!');
      setOrderPlaced(true);
      setCartItems([]);
    } catch (error) {
      console.error('Place order error:', error);
      const msg = error.response?.data?.message || 'Order failed.';
      setMessage(`❌ ${msg}`);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 py-26 mt-30 mb-20 bg-amber-600 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

      {message && (
        <p className="text-center mb-4 text-sm text-white">{message}</p>
      )}

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">
          {orderPlaced ? 'Thank you for your order!' : 'Your cart is empty.'}
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-6">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-3">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-black">Qty: {item.quantity}</p>
                </div>
                <p className="text-right font-medium text-white">
                  Ksh {item.price * item.quantity}
                </p>
              </li>
            ))}
          </ul>

          <div className="text-right font-semibold text-lg mb-6 text-white">
            Total: Ksh{' '}
            {cartItems
              .reduce((sum, item) => sum + item.quantity * item.price, 0)
              .toLocaleString()}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Confirm & Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;
