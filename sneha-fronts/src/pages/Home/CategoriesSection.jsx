import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const CategoriesSection = () => {
  const { language } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static titles and descriptions
  const content = {
    en: {
      title: "Shop By Category",
      description: "Discover our wide range of traditional products",
    },
    mr: {
      title: "श्रेणीनुसार खरेदी करा",
      description: "आमच्या पारंपारिक उत्पादनांची विस्तृत श्रेणी शोधा",
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <p>Loading categories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center mx-auto">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              {content[language].title}
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              {content[language].description}
            </motion.p>
          </div>
        </div>

        {categories.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link to={`/category/${category.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-xl aspect-square">
                    {category.image ? (
                      <img
                        src={`http://127.0.0.1:8000/uploads/${category.image}`}
                        alt={category[`name_${language}`] || category.name_en}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <h3 className="text-white font-bold text-xl text-center px-4">
                        {category[`name_${language}`] || category.name_en}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No categories found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
