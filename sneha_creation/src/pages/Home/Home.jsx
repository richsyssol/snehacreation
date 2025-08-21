import React from "react";
import Homepage from "./Homepage";
import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import ProductShowcase from "./ProductShowcase";
import FeaturedCollections from "./FeaturedCollections";
import WhoWeAre from "./WhoWeAre";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <ProductShowcase />
      <FeaturedCollections />
      <WhoWeAre />
    </div>
  );
}

export default Home;
