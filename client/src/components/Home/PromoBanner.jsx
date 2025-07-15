import React from 'react';

function PromoBanner() {
  return (
    <div className="w-full bg-black text-white py-4 px-6 text-center">
      <p className="text-sm md:text-base font-medium tracking-wide">
        🎉 Limited Time Offer: Get up to <span className="font-bold">40% OFF</span> on selected items! 
        <a href="/shop" className="underline ml-2 hover:text-gray-300">Shop Now</a>
      </p>
    </div>
  );
}

export default PromoBanner;
