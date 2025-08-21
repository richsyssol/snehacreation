import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiChevronDown, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../../Layout/Layout";
import ProductCard from "../CartFeature/ProductCard";

const ProductShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = [
    "All",
    "Paintings",
    "Sculptures",
    "Photography",
    "Digital Art",
  ];

  const products = [
    {
      id: 1,
      name: "Abstract Landscape",
      category: "Paintings",
      image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458",
      artist: "Maria Chen",
      medium: "Oil on canvas",
    },
    {
      id: 2,
      name: "Bronze Figure",
      category: "Sculptures",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
      artist: "James Wilson",
      medium: "Bronze",
    },
    {
      id: 3,
      name: "Urban Reflections",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
      artist: "Sarah Johnson",
      medium: "Archival print",
    },
    {
      id: 4,
      name: "Digital Dreams",
      category: "Digital Art",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
      artist: "Alex Kim",
      medium: "Digital render",
    },
  ];

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((product) => product.category === activeFilter);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Art Collection</h2>

          {/* Desktop Filters */}
          <div className="hidden md:flex gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeFilter === category
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
          >
            <FiFilter />
            <span>Filter</span>
            <FiChevronDown
              className={`transition-transform ${
                showMobileFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <motion.div
            className="md:hidden mb-6 bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveFilter(category);
                    setShowMobileFilters(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeFilter === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No artworks found in this category.</p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-4 text-gray-900 font-medium underline"
            >
              View all artworks
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-block border-2 border-gray-900 text-gray-900 font-medium px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
