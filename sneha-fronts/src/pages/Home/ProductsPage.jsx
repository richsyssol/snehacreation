import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const ProductsPage = () => {
  const { language } = useLanguage();
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch category by slug
        const categoryRes = await fetch(
          `http://127.0.0.1:8000/categories/${slug}`
        );
        const categoryData = await categoryRes.json();

        if (!categoryRes.ok || !categoryData.success) {
          throw new Error(categoryData.message || "Category not found");
        }

        setCategory(categoryData.data);

        // 2. Fetch products for this category
        const productsRes = await fetch(
          `http://127.0.0.1:8000/products?category=${categoryData.data.id}`
        );
        const productsData = await productsRes.json();

        if (!productsRes.ok || !productsData.success) {
          throw new Error(productsData.message || "Failed to fetch products");
        }

        setProducts(productsData.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto mt-15 px-6">
        {category && (
          <div className="mb-12 text-center">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {category[`name_${language}`] || category.name_en}
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              {category[`description_${language}`] || category.description_en}
            </motion.p>
          </div>
        )}

        {products.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
              >
                <Link to={`/product/${product.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`http://127.0.0.1:8000/uploads/${product.images[0]}`}
                        alt={product[`name_${language}`] || product.name_en}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product[`name_${language}`] || product.name_en}
                    </h3>
                    {/* <p className="text-indigo-600 font-bold">
                      ₹{product.price}
                    </p> */}
                    {/* {product.stock_quantity > 0 ? (
                      <span className="text-sm text-green-600">In Stock</span>
                    ) : (
                      <span className="text-sm text-red-600">Out of Stock</span>
                    )} */}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">
              No products found in this category
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
