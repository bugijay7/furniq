import React from 'react';
import Hero from '../components/Home/Hero';
import Featured from '../components/Home/Featured';
import Categories from '../components/Home/Categories';
import PromoBanner from '../components/Home/PromoBanner';
import ProductGrid from '../components/Home/ProductGrid';
import Review from '../components/Home/Review';

function Home() {
  return (
    <div>
      <Hero />
      <Featured />
      <Categories />
      <PromoBanner />
      <ProductGrid />
      <Review />
      <Cta />
    </div>
  );
}

export default Home;
