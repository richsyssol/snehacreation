import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { CartContext } from "../../Layout/Layout";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
    >
      <Link to={`/artwork/${product.id}`} className="block">
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.artist}</p>
        <p className="text-xs text-gray-500">{product.medium}</p>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart({
            ...product,
            type: "customization-request", // Mark as customization request
          });
        }}
        className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ShoppingCart size={18} />
      </button>
    </motion.div>
  );
};

export default ProductCard;
