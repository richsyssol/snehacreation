import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CartContext } from "../../Layout/Layout";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">₹{product.price}</span>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              >
                <FiShoppingCart />
              </button>
              <button className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <FiHeart />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
