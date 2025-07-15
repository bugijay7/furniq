import React from 'react';
import { Link } from 'react-router-dom'
import heroImg from '../../assets/about-hero.jpeg'; 

function Abouthero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to <span className="text-orange-400">Furniq</span></h1>
          <p className="mb-5">
            Where timeless design meets everyday comfort. Discover furniture that transforms your house into a home.
          </p>
          <button className="btn btn-outline btn-accent"><Link to="/shop">Explore Our Collection</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Abouthero;
