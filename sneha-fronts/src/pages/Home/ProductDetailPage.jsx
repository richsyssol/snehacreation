import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { CartContext } from "../../Layout/Layout";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

const ProductDetailPage = () => {
  const { language } = useLanguage();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://snehas.demovoting.com/products/${slug}`
        );
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    // Create a cart product object with all required fields
    const cartProduct = {
      id: product.id,
      name: product[`name_${language}`] || product.name_en,
      name_en: product.name_en,
      name_hi: product.name_hi,
      description: product[`description_${language}`] || product.description_en,
      description_en: product.description_en,
      description_hi: product.description_hi,
      price: product.price,
      image:
        product.images && product.images.length > 0
          ? `https://snehas.demovoting.com/uploads/${product.images[0]}`
          : null,
      images: product.images,
      category: product.category,
      product_code: product.product_code,
      stock_quantity: product.stock_quantity,
    };

    addToCart(cartProduct);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <p>Loading product details...</p>
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

  if (!product) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <p>Product not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mt-20 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="p-6">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={`https://snehas.demovoting.com/uploads/${product.images[currentImage]}`}
                    alt={product[`name_${language}`] || product.name_en}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`aspect-square rounded-md overflow-hidden border-2 ${
                        currentImage === index
                          ? "border-[#934745]"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={`https://snehas.demovoting.com/uploads/${image}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6 flex flex-col justify-center">
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                {product[`name_${language}`] || product.name_en}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                {/* <h3 className="text-lg font-semibold mb-2">Description</h3> */}
                {/* <p className="text-gray-600">
                  {product[`description_${language}`] ||
                    product.description_en ||
                    "No description available"}
                </p> */}
              </motion.div>

              <div className="space-y-4">
                {/* <div className="flex items-center">
                  <span className="font-semibold mr-2">Availability:</span>
                  {product.stock_quantity > 0 ? (
                    <span className="text-green-600">
                      In Stock ({product.stock_quantity} available)
                    </span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div> */}

                {/* <div className="flex items-center">
                  <span className="font-semibold mr-2">Product Code:</span>
                  <span>{product.product_code}</span>
                </div> */}

                <div className="flex gap-4 pt-4">
                  {product.stock_quantity > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 bg-[#934745] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#834140] transition-colors"
                      onClick={handleAddToCart}
                    >
                      <FiShoppingCart size={18} />
                      Add to Cart
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <FiHeart size={18} />
                    Add to Wishlist
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useParams } from "react-router-dom";
// import { useLanguage } from "../../contexts/LanguageContext";

// const ProductDetailPage = () => {
//   const { language } = useLanguage();
//   const { slug } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/products/${slug}`);
//         if (!response.ok) throw new Error("Product not found");
//         const data = await response.json();
//         setProduct(data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [slug]);

//   if (loading) {
//     return (
//       <section className="py-16 bg-gray-50 min-h-screen">
//         <div className="container mx-auto px-6 text-center">
//           <p>Loading product details...</p>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="py-16 bg-gray-50 min-h-screen">
//         <div className="container mx-auto px-6 text-center text-red-500">
//           <p>Error: {error}</p>
//         </div>
//       </section>
//     );
//   }

//   if (!product) {
//     return (
//       <section className="py-16 bg-gray-50 min-h-screen">
//         <div className="container mx-auto px-6 text-center">
//           <p>Product not found</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 bg-gray-50 min-h-screen">
//       <div className="container mt-20 mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-xl shadow-lg overflow-hidden"
//         >
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Product Images */}
//             <div className="p-6">
//               <div className="aspect-square rounded-xl overflow-hidden mb-4">
//                 {product.images && product.images.length > 0 ? (
//                   <img
//                     src={`http://127.0.0.1:8000/uploads/${product.images[currentImage]}`}
//                     alt={product[`name_${language}`] || product.name_en}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                     <span className="text-gray-500">No Image</span>
//                   </div>
//                 )}
//               </div>

//               {product.images && product.images.length > 1 && (
//                 <div className="grid grid-cols-4 gap-2">
//                   {product.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImage(index)}
//                       className={`aspect-square rounded-md overflow-hidden border-2 ${
//                         currentImage === index
//                           ? "border-indigo-500"
//                           : "border-transparent"
//                       }`}
//                     >
//                       <img
//                         src={`http://127.0.0.1:8000/uploads/${image}`}
//                         alt={`Thumbnail ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Product Details */}
//             <div className="p-6 flex flex-col justify-center">
//               <motion.h1
//                 initial={{ y: -20 }}
//                 animate={{ y: 0 }}
//                 className="text-3xl font-bold text-gray-900 mb-4"
//               >
//                 {product[`name_${language}`] || product.name_en}
//               </motion.h1>

//               {/* <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-2xl text-indigo-600 font-bold mb-6"
//               >
//                 ₹{product.price}
//               </motion.p> */}

//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="mb-6"
//               >
//                 <h3 className="text-lg font-semibold mb-2">Description</h3>
//                 <p className="text-gray-600">
//                   {product[`description_${language}`] ||
//                     product.description_en ||
//                     "No description available"}
//                 </p>
//               </motion.div>

//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <span className="font-semibold mr-2">Availability:</span>
//                   {product.stock_quantity > 0 ? (
//                     <span className="text-green-600">
//                       In Stock ({product.stock_quantity} available)
//                     </span>
//                   ) : (
//                     <span className="text-red-600">Out of Stock</span>
//                   )}
//                 </div>

//                 <div className="flex items-center">
//                   <span className="font-semibold mr-2">Product Code:</span>
//                   <span>{product.product_code}</span>
//                 </div>

//                 {product.stock_quantity > 0 && (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       addToCart(product);
//                     }}
//                   >
//                     Add to Cart
//                   </motion.button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ProductDetailPage;
