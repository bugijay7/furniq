import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'; // ✅ useLocation

function Shop() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const location = useLocation(); // ✅
  const queryCategory = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://furniq.onrender.com/api/products');
        setAllProducts(res.data);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (queryCategory && allProducts.length > 0) {
      setActiveCategory(queryCategory);
      setProducts(allProducts.filter((p) => p.category === queryCategory));
    }
  }, [queryCategory, allProducts]);

  const categories = ['All', ...new Set(allProducts.map((p) => p.category))];

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter((p) => p.category === category));
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading products...</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-16 py-26">
      <h2 className="text-3xl font-bold text-center mb-8">FURNISH YOUR STORY</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              activeCategory === category
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

     {/* Products Grid */}
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
  {products.map((product) => (
    <Link
      to={`/product/${product.id}`}
      key={product.id}
      className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition duration-300"
    >
      <img
        src={`/${product.image}`}
        alt={product.name}
        className="w-full h-52 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-amber-600 font-bold">Ksh {product.price}</p>
      <p className="text-sm text-gray-700 italic">{product.category}</p>
    </Link>
  ))}
</div>

    </div>
  );
}

export default Shop;
