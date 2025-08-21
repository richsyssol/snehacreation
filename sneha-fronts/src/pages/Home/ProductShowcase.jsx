import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiChevronDown, FiX, FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../../Layout/Layout";
import ProductCard from "../CartFeature/ProductCard";

const ProductShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [language, setLanguage] = useState("english");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch products
        const productsResponse = await fetch("http://127.0.0.1:8000/products");
        if (!productsResponse.ok) {
          throw new Error(`HTTP error! status: ${productsResponse.status}`);
        }
        const productsData = await productsResponse.json();

        // Fetch categories
        const categoriesResponse = await fetch(
          "http://127.0.0.1:8000/categories"
        );
        if (!categoriesResponse.ok) {
          throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
        }
        const categoriesData = await categoriesResponse.json();

        if (productsData.success) {
          setProducts(productsData.data.data);
        } else {
          throw new Error(productsData.message || "Failed to fetch products");
        }

        if (categoriesData.success) {
          setCategories(categoriesData.data);
        } else {
          throw new Error(
            categoriesData.message || "Failed to fetch categories"
          );
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format API data to match component expectations
  const formatProductData = (apiProduct) => {
    return {
      id: apiProduct.id,
      name: apiProduct.name_en,
      nameMarathi: apiProduct.name_mr,
      category: apiProduct.category?.name_en || "Uncategorized",
      categoryMarathi: apiProduct.category?.name_mr || "श्रेणी नाही",
      image:
        apiProduct.images && apiProduct.images.length > 0
          ? `http://127.0.0.1:8000/uploads/${apiProduct.images[0]}`
          : "https://via.placeholder.com/300x300?text=No+Image",
      description: apiProduct.description_en,
      price: parseFloat(apiProduct.price),
      availableIn: [apiProduct.category?.name_en || "Uncategorized"],
    };
  };

  // Generate category lists in both languages from API data
  const generateCategoryLists = () => {
    const englishCategories = ["All"];
    const marathiCategories = ["सर्व"];

    categories.forEach((category) => {
      if (category.name_en && category.is_active) {
        englishCategories.push(category.name_en);
      }
      if (category.name_mr && category.is_active) {
        marathiCategories.push(category.name_mr);
      }
    });

    return {
      english: englishCategories,
      marathi: marathiCategories,
    };
  };

  const formattedProducts = products.map(formatProductData);
  const dynamicCategories = generateCategoryLists();

  const filteredProducts =
    activeFilter === "All" || activeFilter === "सर्व"
      ? formattedProducts
      : formattedProducts.filter(
          (product) =>
            product.category === activeFilter ||
            product.categoryMarathi === activeFilter ||
            product.availableIn.includes(activeFilter)
        );

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "marathi" : "english");
    // Reset filter to "All" when changing language
    setActiveFilter(language === "english" ? "सर्व" : "All");
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch products
      const productsResponse = await fetch("http://127.0.0.1:8000/products");
      if (!productsResponse.ok) {
        throw new Error(`HTTP error! status: ${productsResponse.status}`);
      }
      const productsData = await productsResponse.json();

      // Fetch categories
      const categoriesResponse = await fetch(
        "http://127.0.0.1:8000/categories"
      );
      if (!categoriesResponse.ok) {
        throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
      }
      const categoriesData = await categoriesResponse.json();

      if (productsData.success) {
        setProducts(productsData.data.data);
      } else {
        throw new Error(productsData.message || "Failed to fetch products");
      }

      if (categoriesData.success) {
        setCategories(categoriesData.data);
      } else {
        throw new Error(categoriesData.message || "Failed to fetch categories");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error refreshing data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-48 bg-gray-300 rounded mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-500 mb-4">
            {language === "english"
              ? `Error loading products: ${error}`
              : `उत्पादने लोड करताना त्रुटी: ${error}`}
          </div>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-gray-900 text-white rounded flex items-center justify-center mx-auto"
          >
            <FiRefreshCw className="mr-2" />
            {language === "english" ? "Try Again" : "पुन्हा प्रयत्न करा"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {language === "english" ? "Art Collection" : "कला संग्रह"}
          </h2>

          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {language === "english" ? "मराठी" : "English"}
            </button>

            {/* Refresh Button */}
            <button
              onClick={refreshData}
              className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              title={
                language === "english" ? "Refresh data" : "डेटा रीफ्रेश करा"
              }
            >
              <FiRefreshCw />
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-3 flex-wrap">
              {dynamicCategories[language].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
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
              <span>{language === "english" ? "Filter" : "फिल्टर"}</span>
              <FiChevronDown
                className={`transition-transform ${
                  showMobileFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
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
              {dynamicCategories[language].map((category) => (
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
            <ProductCard
              key={product.id}
              product={{
                ...product,
                name:
                  language === "english"
                    ? product.name
                    : product.nameMarathi || product.name,
                category:
                  language === "english"
                    ? product.category
                    : product.categoryMarathi || product.category,
              }}
              index={index}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {language === "english"
                ? "No products found in this category."
                : "या श्रेणीमध्ये कोणतेही उत्पादन सापडले नाही."}
            </p>
            <button
              onClick={() =>
                setActiveFilter(language === "english" ? "All" : "सर्व")
              }
              className="mt-4 text-gray-900 font-medium underline"
            >
              {language === "english"
                ? "View all products"
                : "सर्व उत्पादने पहा"}
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-block border-2 border-gray-900 text-gray-900 font-medium px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
          >
            {language === "english"
              ? "View Full Collection"
              : "संपूर्ण संग्रह पहा"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;

// import React, { useState, useContext } from "react";
// import { motion } from "framer-motion";
// import { FiFilter, FiChevronDown, FiX } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { CartContext } from "../../Layout/Layout";
// import ProductCard from "../CartFeature/ProductCard";

// const ProductShowcase = () => {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [language, setLanguage] = useState("english"); // 'english' or 'marathi'

//   // Categories in both languages
//   const categories = {
//     english: [
//       "All",
//       "Reshim Silk",
//       "Paithani Silk",
//       "Cotton Fabric",
//       "Traditional Décor",
//       "Personal Accessories",
//       "Gift Articles",
//       "Home Enhancements",
//       "Festive Special",
//     ],
//     marathi: [
//       "सर्व",
//       "रेशीम सिल्क",
//       "पैठणी सिल्क",
//       "कॉटन फॅब्रिक",
//       "पारंपारिक सजावट",
//       "वैयक्तिक वस्तू",
//       "भेटवस्तू",
//       "घर सजावट",
//       "सणांसाठी विशेष",
//     ],
//   };

//   // Art Collection Page

//   // Products with detailed information
//   const products = [
//     {
//       id: 1,
//       name: "Toran (Traditional Door Hanging)",
//       nameMarathi: "तोरण",
//       category: "Paithani Silk",
//       categoryMarathi: "पैठणी सिल्क",
//       image: "https://example.com/paithani-toran.jpg",
//       description: "Handwoven Paithani silk toran with traditional motifs",
//       price: 2499,
//       availableIn: ["Paithani Silk", "Cotton Fabric"],
//     },
//     {
//       id: 2,
//       name: "Wall Hanging",
//       nameMarathi: "लटकन",
//       category: "Reshim Silk",
//       categoryMarathi: "रेशीम सिल्क",
//       image: "https://example.com/reshim-wall-hanging.jpg",
//       description: "Elegant Reshim silk wall hanging with intricate designs",
//       price: 1799,
//       availableIn: ["Reshim Silk", "Cotton Fabric"],
//     },
//     {
//       id: 3,
//       name: "Oti (Traditional Seat Cover)",
//       nameMarathi: "ओटी",
//       category: "Paithani Silk",
//       categoryMarathi: "पैठणी सिल्क",
//       image: "https://example.com/paithani-oti.jpg",
//       description: "Beautifully crafted Paithani silk seat cover",
//       price: 3299,
//       availableIn: ["Paithani Silk"],
//     },
//     {
//       id: 4,
//       name: "Handkerchief",
//       nameMarathi: "रुमाल",
//       category: "Cotton Fabric",
//       categoryMarathi: "कॉटन फॅब्रिक",
//       image: "https://example.com/cotton-handkerchief.jpg",
//       description: "Pure cotton handkerchief with traditional prints",
//       price: 299,
//       availableIn: ["Cotton Fabric", "Reshim Silk"],
//     },
//     {
//       id: 5,
//       name: "Sky Lantern",
//       nameMarathi: "आकाश कंदील",
//       category: "Festive Special",
//       categoryMarathi: "सणांसाठी विशेष",
//       image: "https://example.com/sky-lantern.jpg",
//       description: "Decorative lantern for Diwali and other festivals",
//       price: 899,
//       availableIn: ["Cotton Fabric", "Reshim Silk"],
//     },
//     {
//       id: 6,
//       name: "Ganesh Mukut (Crown)",
//       nameMarathi: "गणपती मुकुट",
//       category: "Festive Special",
//       categoryMarathi: "सणांसाठी विशेष",
//       image: "https://example.com/ganesh-mukut.jpg",
//       description: "Traditional crown for Lord Ganesha idols",
//       price: 599,
//       availableIn: ["Reshim Silk", "Paithani Silk"],
//     },
//     {
//       id: 7,
//       name: "Purse",
//       nameMarathi: "पर्स",
//       category: "Personal Accessories",
//       categoryMarathi: "वैयक्तिक वस्तू",
//       image: "https://example.com/silk-purse.jpg",
//       description: "Elegant silk purse with traditional embroidery",
//       price: 1299,
//       availableIn: ["Reshim Silk", "Paithani Silk"],
//     },
//     {
//       id: 8,
//       name: "Cushion Cover",
//       nameMarathi: "कुशन कव्हर",
//       category: "Home Enhancements",
//       categoryMarathi: "घर सजावट",
//       image: "https://example.com/cushion-cover.jpg",
//       description: "Handcrafted cushion cover with traditional designs",
//       price: 799,
//       availableIn: ["Cotton Fabric", "Reshim Silk"],
//     },
//   ];

//   const filteredProducts =
//     activeFilter === "All" || activeFilter === "सर्व"
//       ? products
//       : products.filter(
//           (product) =>
//             product.category === activeFilter ||
//             product.categoryMarathi === activeFilter ||
//             product.availableIn.includes(activeFilter)
//         );

//   const toggleLanguage = () => {
//     setLanguage(language === "english" ? "marathi" : "english");
//     // Reset filter to "All" when changing language
//     setActiveFilter(language === "english" ? "सर्व" : "All");
//   };

//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-6">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">
//             {language === "english" ? "Art Collection" : "कला संग्रह"}
//           </h2>

//           <div className="flex items-center gap-4">
//             {/* Language Toggle */}
//             <button
//               onClick={toggleLanguage}
//               className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
//             >
//               {language === "english" ? "मराठी" : "English"}
//             </button>

//             {/* Desktop Filters */}
//             <div className="hidden md:flex gap-3">
//               {categories[language].map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setActiveFilter(category)}
//                   className={`px-4 py-2 rounded-full transition-colors ${
//                     activeFilter === category
//                       ? "bg-gray-900 text-white"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>

//             {/* Mobile Filter Toggle */}
//             <button
//               onClick={() => setShowMobileFilters(!showMobileFilters)}
//               className="md:hidden flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
//             >
//               <FiFilter />
//               <span>{language === "english" ? "Filter" : "फिल्टर"}</span>
//               <FiChevronDown
//                 className={`transition-transform ${
//                   showMobileFilters ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Filters Dropdown */}
//         {showMobileFilters && (
//           <motion.div
//             className="md:hidden mb-6 bg-white p-4 rounded-lg shadow-lg"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ type: "spring", damping: 25 }}
//           >
//             <div className="grid grid-cols-2 gap-3">
//               {categories[language].map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => {
//                     setActiveFilter(category);
//                     setShowMobileFilters(false);
//                   }}
//                   className={`px-4 py-2 rounded-full text-sm ${
//                     activeFilter === category
//                       ? "bg-gray-900 text-white"
//                       : "bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Product Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredProducts.map((product, index) => (
//             <ProductCard
//               key={product.id}
//               product={{
//                 ...product,
//                 name:
//                   language === "english"
//                     ? product.name
//                     : product.nameMarathi || product.name,
//                 category:
//                   language === "english"
//                     ? product.category
//                     : product.categoryMarathi || product.category,
//               }}
//               index={index}
//             />
//           ))}
//         </div>

//         {filteredProducts.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500">
//               {language === "english"
//                 ? "No products found in this category."
//                 : "या श्रेणीमध्ये कोणतेही उत्पादन सापडले नाही."}
//             </p>
//             <button
//               onClick={() =>
//                 setActiveFilter(language === "english" ? "All" : "सर्व")
//               }
//               className="mt-4 text-gray-900 font-medium underline"
//             >
//               {language === "english"
//                 ? "View all products"
//                 : "सर्व उत्पादने पहा"}
//             </button>
//           </div>
//         )}

//         <div className="text-center mt-12">
//           <Link
//             to="/gallery"
//             className="inline-block border-2 border-gray-900 text-gray-900 font-medium px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
//           >
//             {language === "english"
//               ? "View Full Collection"
//               : "संपूर्ण संग्रह पहा"}
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductShowcase;
