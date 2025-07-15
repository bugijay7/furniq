import React from 'react';
import { Link } from 'react-router-dom';

function Cta() {
  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center border border-gray-200 rounded-2xl shadow-sm p-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Ready to Furnish Your Dream Space?
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Discover our curated collection of handcrafted furniture designed to bring elegance,
          warmth, and lasting comfort into your home.
        </p>
        <Link to="/shop">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition duration-300 shadow-md">
            Browse Collection
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Cta;
