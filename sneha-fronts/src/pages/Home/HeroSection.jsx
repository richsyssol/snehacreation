import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Info,
} from "lucide-react";

const HeroSection = () => {
  const heroContent = [
    {
      id: 1,
      image_url:
        "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Contemporary Art Collection",
      description: "Discover limited edition prints from emerging artists",
      ctaHighlight: "New Arrivals",
      price: "$129 - $599",
      artist: "Maria Chen",
      rating: 4.8,
    },
    {
      id: 2,
      image_url:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Handcrafted Design Objects",
      description: "Functional art pieces for your living space",
      ctaHighlight: "Best Sellers",
      price: "$89 - $349",
      artist: "James Wilson",
      rating: 4.9,
    },
    {
      id: 3,
      image_url:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Sustainable Home Decor",
      description: "Eco-friendly designs that make a statement",
      ctaHighlight: "Eco Collection",
      price: "$49 - $299",
      artist: "Eco Design Collective",
      rating: 4.7,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || heroContent.length === 0) return;
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    setIsFavorite(false);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroContent.length) % heroContent.length
    );
    setIsFavorite(false);
  };

  const selectImage = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setIsFavorite(false);
    }
  };

  const currentItem = heroContent[currentIndex] || {};

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${star <= rating ? "text-amber-400" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Hero Slider */}
      <div
        className="relative w-full h-[80vh] flex items-center"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={currentItem.image_url}
              alt={currentItem.title}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-2xl">
            {currentItem.ctaHighlight && (
              <motion.div
                className="inline-block bg-white text-gray-900 px-4 py-2 rounded-full mb-4 text-sm font-medium"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentItem.ctaHighlight}
              </motion.div>
            )}

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentItem.title}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-200 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentItem.description}
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </motion.button>

              <motion.button
                className="flex items-center gap-2 bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Info size={18} />
                View Details
              </motion.button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {heroContent.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full z-10 backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="text-white w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full z-10 backdrop-blur-sm transition-all"
            >
              <ChevronRight className="text-white w-5 h-5" />
            </button>
          </>
        )}

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-all z-10"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="container mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="flex overflow-x-auto gap-4 pb-2">
            {heroContent.map((item, index) => (
              <div
                key={item.id}
                onClick={() => selectImage(index)}
                className={`flex-shrink-0 relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                  currentIndex === index
                    ? "ring-2 ring-gray-900"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={item.image_url}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-20 w-32 object-cover"
                />
                {currentIndex === index && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play className="text-white w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
