import React from 'react';
import chair from '../../assets/gridchair.jpeg';
import table from '../../assets/gridtable.jpeg';
import sofa from '../../assets/gridsofa.jpeg';
import shelf from '../../assets/gridshelf.jpeg';
import bed from '../../assets/gridbed.jpeg';
import dresser from '../../assets/griddresser.jpeg'; // ensure this exists

const products = [
  {
    id: 1,
    name: 'Modern Lounge Chair',
    price: 'KSh 14,900',
    image: chair,
  },
  {
    id: 2,
    name: 'Wooden Dining Table',
    price: 'KSh 29,500',
    image: table,
  },
  {
    id: 3,
    name: 'Luxury Sofa Set',
    price: 'KSh 49,000',
    image: sofa,
  },
  {
    id: 4,
    name: 'Minimal Bookshelf',
    price: 'KSh 12,500',
    image: shelf,
  },
  {
    id: 5,
    name: 'Queen Size Bed',
    price: 'KSh 39,900',
    image: bed,
  },
  {
    id: 6,
    name: 'Compact Dresser',
    price: 'KSh 17,800',
    image: dresser,
  },
];

function ProductGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="text-left border p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-black mb-1">
              {product.name}
            </h3>
            <p className="text-gray-600">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
