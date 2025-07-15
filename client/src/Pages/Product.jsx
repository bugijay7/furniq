import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Review from '../components/Home/Review';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://furniq.onrender.com/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError('Product not found or server error');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please log in to add to cart.');
        return;
      }

      await axios.post(
        'https://furniq.onrender.com/api/cart',
        {
          product_id: product.id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('✅ Added to cart!');
    } catch (error) {
      const msg = error.response?.data?.message || 'Error adding to cart.';
      setMessage(`❌ ${msg}`);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading product...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 md:py-28">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Product Details */}
        <div>
          <img
            src={`/${product.image}`}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg shadow mb-6"
          />
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 italic">{product.category}</p>
          <p className="text-xl text-green-600 font-semibold mt-4">Ksh {product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center mt-6 gap-2">
            <label className="text-sm">Qty:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 border px-2 py-1 rounded text-center"
              min={1}
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          {/* Message */}
          {message && (
            <p className="mt-3 text-sm text-gray-600">{message}</p>
          )}
        </div>

        {/* Reviews */}
        <div className="bg-white p-4 border rounded-lg shadow-sm">
          {product?.id && <Review productId={product.id} />}
        </div>
      </div>
    </div>
  );
}

export default Product;
