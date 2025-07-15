import React from 'react';
import craftImg from '../../assets/craft.jpeg';

function Craftmanship() {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Image */}
        <div className="order-1 md:order-1">
          <img
            src={craftImg}
            alt="Craftsmanship process"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Text */}
        <div className="order-2 md:order-2">
          <h2 className="text-6xl font-bold text-gray-800 mb-6 text-left">CRAFTMAN<br></br>SHIP</h2>
          <p className="text-sm text-gray-600 leading-relaxed text-left">
            Every piece of furniture at <span className="text-orange-500 font-semibold">Furniq</span> is built with precision, care,
            and purpose. We source high-quality, sustainable materials to ensure durability and beauty that lasts.
            From seasoned hardwood to eco-conscious fabrics, we prioritize materials that respect both your home and the environment.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Craftmanship;
