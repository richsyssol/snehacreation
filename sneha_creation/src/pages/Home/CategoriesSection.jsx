import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      name: "Men's Fashion",
      image: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d",
      link: "/category/mens",
    },
    {
      id: 2,
      name: "Women's Fashion",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
      link: "/category/womens",
    },
    {
      id: 3,
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      link: "/category/accessories",
    },
    {
      id: 4,
      name: "Home & Living",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
      link: "/category/home",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop By Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products organized by category
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={category.link} className="block">
                <div className="relative overflow-hidden rounded-xl aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <h3 className="text-white font-bold text-xl text-center px-4">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
