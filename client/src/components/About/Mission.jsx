import React from 'react';
import missionImg from '../../assets/mission.jpeg';

function Mission() {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Text */}
        <div className="order-2 md:order-1">
          <h2 className="text-6xl font-bold text-gray-800 mb-6 text-left">OUR MISSION</h2>
          <p className="text-sm text-gray-600 leading-relaxed text-left">
            At <span className="text-orange-500 font-semibold">Furniq</span>, our mission is to create beautiful,
            functional furniture that brings comfort and elegance into every home.
            We’re committed to sustainable practices, honest craftsmanship, and timeless design —
            helping you live well, stylishly.
          </p>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2">
          <img
            src={missionImg}
            alt="Artisan working on wood for furniture"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Mission;
