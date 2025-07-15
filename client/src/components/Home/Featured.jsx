import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // ✅ Import Link
import chair from '../../assets/chair.jpeg';
import table from '../../assets/table.jpeg';
import sofa from '../../assets/sofa.jpeg';
import shelf from '../../assets/shelf.jpeg';
import bed from '../../assets/bed.jpeg';

const featuredData = [
  {
    image: chair,
    title: 'Elegant Lounge Chair',
    description: 'Experience comfortable lounge chairs perfecting any space.',
    category: 'Chair',
  },
  {
    image: table,
    title: 'Modern Wooden Table',
    description: 'A sleek and sturdy centerpiece for your dining or workspace needs.',
    category: 'Table',
  },
  {
    image: sofa,
    title: 'Luxury Living Sofa',
    description: 'Make a bold statement with our luxurious, comfy sofas.',
    category: 'Sofa',
  },
  {
    image: shelf,
    title: 'Minimalist Bookshelf',
    description: 'Keep your space neatly stylish with modern wooden bookshelves.',
    category: 'Shelf',
  },
  {
    image: bed,
    title: 'ComfortMax Queen Bed',
    description: 'Rest easy on best-selling queen beds designed for comfort.',
    category: 'Bed',
  },
];

function Featured() {
  return (
    <section className="px-6 py-16 max-w-[1400px] mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-black">FEATURED</h2>

      <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-4">
        {featuredData.map((item, index) => (
          <div key={index} className="w-full md:w-[220px] bg-transparent">
            <div className="flex flex-col items-start text-left p-2">
              <img
                src={item.image}
                alt={item.title}
                className="h-36 w-full object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-[Nunito] font-normal text-black mb-1">
                {item.title}
              </h3>
              <p className="text-gray-800 text-sm font-light mb-3">
                {item.description}
              </p>
              <Link
                to={`/shop?category=${encodeURIComponent(item.category)}`}
                className="inline-flex items-center text-sm font-medium text-black hover:underline"
              >
                Shop Now <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Featured;
