import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Review({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/review/product/${productId}`);
      setReviews(res.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!productId) {
      console.warn('No productId provided to Review component');
      setLoading(false);
      return;
    }
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/review/product/${productId}`,
        {
          rating: newReview.rating,
          comment: newReview.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('✅ Review submitted');
      setNewReview({ rating: 5, comment: '' });
      fetchReviews(); // Refresh the list after submitting
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Failed to submit review';
      setMessage(`❌ ${errMsg}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Product Reviews</h2>

      {/* Submit Review */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <label className="font-medium">Rating:</label>
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
            className="border px-2 py-1 rounded"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && 's'}
              </option>
            ))}
          </select>
        </div>

        <textarea
          placeholder="Leave a comment..."
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="w-full border rounded-md p-2 h-24 mb-3"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Submit Review
        </button>

        {message && <p className="mt-3 text-sm text-center text-gray-700">{message}</p>}
      </form>

      {/* Reviews List */}
      {loading ? (
        <p className="text-center">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-6">
          {reviews.map((review) => (
            <li key={review.id} className="border rounded-md p-4 shadow-sm bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <strong>{review.user_name}</strong>
                <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Review;
