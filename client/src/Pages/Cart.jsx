import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://furniq.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (product_id, quantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://furniq.onrender.com/api/cart/${product_id}`, { quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const removeItem = async (product_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://furniq.onrender.com/api/cart/${product_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error('Remove error:', err);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    navigate('/checkout'); // redirect to checkout page
  };

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`/${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Ksh {item.price}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value))}
                    className="w-16 border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-10">
            <h3 className="text-xl font-bold">Total: Ksh {total}</h3>
            <button
              onClick={handleCheckout}
              className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
