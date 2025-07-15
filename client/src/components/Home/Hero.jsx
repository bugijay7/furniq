import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero.jpg';

function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center py-16">
      {/* Left side: text */}
      <div className="w-full md:w-1/2 p-10 text-left flex items-center justify-center">
        <div className="max-w-md">
          <h1 className="mb-6 text-5xl md:text-6xl font-bold text-black">
            Welcome to Furniq
          </h1>
          <p className="mb-6 text-gray-700">
            Discover stylish, affordable furniture that transforms your space. Whether modern or classic, Furniq brings comfort and elegance to every room.
          </p>
          <button className="btn btn-neutral"> <Link to="/shop">Shop Now</Link></button>
        </div>
      </div>

      {/* Right side: background image */}
      <div
        className="w-full md:w-1/2 h-[300px] md:h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      ></div>
    </section>
  );
}

export default Hero;
