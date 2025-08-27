import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { hero1, hero2, hero3, hero4, hero5 } from "../../assets";
import { useLanguage } from "../../contexts/LanguageContext";

const HeroSection = () => {
  const { language } = useLanguage();

  const heroContent = [
    {
      id: 1,
      image_url: hero1,
      description: {
        en: "Premium handcrafted Khan Kapda fabrics for traditional attire",
        mr: "पारंपरिक पोशाखांसाठी उत्कृष्ट हाताने तयार केलेले खान कपड्याचे वस्त्र",
      },
      ctaHighlight: {
        en: "Luxury Fabrics",
        mr: "लक्झरी फॅब्रिक्स",
      },
      price: "$79 - $299",
      artist: {
        en: "Khan Textile Masters",
        mr: "खान टेक्सटाईल मास्टर्स",
      },
      rating: 4.9,
    },
    {
      id: 2,
      image_url: hero2,
      description: {
        en: "Exquisite handcrafted Ganesh idols for festive celebrations",
        mr: "सणासुदीच्या उत्सवासाठी सुंदर हाताने बनवलेल्या गणेश मूर्ती",
      },
      ctaHighlight: {
        en: "Ganesh Festival Special",
        mr: "गणेशोत्सव विशेष",
      },
      price: "$39 - $349",
      artist: {
        en: "Traditional Sculptors",
        mr: "पारंपरिक शिल्पकार",
      },
      rating: 4.9,
    },
    {
      id: 3,
      image_url: hero3,
      description: {
        en: "Ganpati Bappa decoration with traditional Khan Kapda drapes",
        mr: "गणपती बाप्पाच्या सजावटीसाठी पारंपरिक खान कपड्याच्या पडद्यांचा वापर",
      },
      ctaHighlight: {
        en: "Festival Decor",
        mr: "उत्सव सजावट",
      },
      price: "$49 - $199",
      artist: {
        en: "Festival Decor Specialists",
        mr: "उत्सव सजावट तज्ञ",
      },
      rating: 4.8,
    },
    {
      id: 4,
      image_url: hero4,
      description: {
        en: "Eco-friendly clay Ganesh idols with organic fabric decorations",
        mr: "पर्यावरणपूरक मातीच्या गणेश मूर्ती सेंद्रिय कपड्यांच्या सजावटीसह",
      },
      ctaHighlight: {
        en: "Eco-Ganesh Collection",
        mr: "इको-गणेश संग्रह",
      },
      price: "$29 - $179",
      artist: {
        en: "Green Artisans Collective",
        mr: "ग्रीन आर्टिसन कलेक्टिव्ह",
      },
      rating: 4.8,
    },
    {
      id: 5,
      image_url: hero5,
      description: {
        en: "Traditional Khan Kapda ceremonial tents and pavilions",
        mr: "पारंपरिक खान कपड्याचे समारंभासाठीचे मंडप आणि पांडाल",
      },
      ctaHighlight: {
        en: "Premium Decor",
        mr: "प्रीमियम सजावट",
      },
      price: "$199 - $899",
      artist: {
        en: "Royal Decorators",
        mr: "रॉयल डेकोरेटर्स",
      },
      rating: 4.9,
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
              alt={currentItem[`title_${language}`] || currentItem.title_en}
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
                {currentItem.ctaHighlight[language] ||
                  currentItem.ctaHighlight.en}
              </motion.div>
            )}

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentItem[`title_${language}`] || currentItem.title_en}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-200 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentItem.description[language] || currentItem.description.en}
            </motion.p>

            {/* <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-white">
                {currentItem.price}
              </span>
              <div className="flex items-center gap-2">
                {renderStars(currentItem.rating)}
                <span className="text-white text-sm">
                  ({currentItem.rating})
                </span>
              </div>
            </div> */}

            {/* <div className="flex items-center gap-2 text-white mb-6">
              <span className="font-medium">By:</span>
              <span>
                {currentItem.artist[language] || currentItem.artist.en}
              </span>
            </div> */}

            <div className="flex flex-wrap gap-4">
              {/* <motion.button
                className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Shop Now
              </motion.button> */}

              {/* <motion.button
                className="flex items-center gap-2 bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                View Details
              </motion.button> */}
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
