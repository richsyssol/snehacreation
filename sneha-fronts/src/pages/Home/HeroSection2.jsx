import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  ArrowRight,
} from "lucide-react";

const HeroSection2 = () => {
  const heroContent = [
    {
      id: 1,
      image_url: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458",
      title: "Summer Collection 2023",
      description: "Discover our newest arrivals for the season",
      ctaHighlight: "New Arrivals",
      price: "$49 - $299",
      video_url: "https://www.youtube.com/watch?v=SUMMER_COLLECTION",
    },
    {
      id: 2,
      image_url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
      title: "Limited Edition Pieces",
      description: "Exclusive designs available for a short time",
      ctaHighlight: "Limited Stock",
      price: "$89 - $499",
      video_url: "https://www.youtube.com/watch?v=LIMITED_EDITION",
    },
    {
      id: 3,
      image_url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
      title: "Sustainable Fashion",
      description: "Eco-friendly materials, timeless designs",
      ctaHighlight: "Eco Collection",
      price: "$59 - $399",
      video_url: "https://www.youtube.com/watch?v=ECO_FASHION",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroContent.length]);

  const currentItem = heroContent[currentIndex];

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={currentItem.image_url}
            alt={currentItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center">
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-2xl">
                <motion.div
                  className="inline-block bg-white text-gray-900 px-4 py-2 rounded-full mb-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentItem.ctaHighlight}
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentItem.title}
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-200 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentItem.description}
                </motion.p>

                <div className="flex gap-4">
                  <motion.button
                    className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <ShoppingCart size={18} />
                    Shop Now
                  </motion.button>

                  <motion.button
                    className="flex items-center gap-2 bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => setShowVideo(true)}
                  >
                    <Play size={18} />
                    Watch Video
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              Close
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${
                  currentItem.video_url.split("v=")[1]
                }?autoplay=1`}
                className="w-full h-full rounded-lg"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection2;
