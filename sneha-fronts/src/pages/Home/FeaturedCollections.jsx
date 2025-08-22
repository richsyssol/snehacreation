import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../CartFeature/ProductCard";

const FeaturedCollections = () => {
  const [language, setLanguage] = useState("english"); // 'english' or 'marathi'
  const [collections, setCollections] = useState({ english: [], marathi: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carouselRef = useRef(null);
  const [activeCollection, setActiveCollection] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/products");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Group products by category
          const categoriesMap = {};

          data.data.data.forEach((product) => {
            const categoryId = product.category_id;

            if (!categoriesMap[categoryId]) {
              categoriesMap[categoryId] = {
                id: categoryId,
                title: product.category.name_en,
                titleMarathi: product.category.name_mr,
                description: product.category.description_en,
                descriptionMarathi: product.category.description_mr,
                products: [],
              };
            }

            categoriesMap[categoryId].products.push({
              id: product.id,
              name: product.name_en,
              nameMarathi: product.name_mr,
              nameEnglish: product.name_en,
              image:
                product.images && product.images.length > 0
                  ? `http://127.0.0.1:8000/uploads/${product.images[0]}`
                  : "https://via.placeholder.com/300x300?text=No+Image",
              price: parseFloat(product.price),
              category: product.category.name_en,
              categoryMarathi: product.category.name_mr,
              description: product.description_en,
              descriptionMarathi: product.description_mr,
              is_featured: product.is_featured,
              is_art_collection: product.is_art_collection,
            });
          });

          // Convert to arrays for both languages
          const englishCollections = Object.values(categoriesMap).map(
            (cat) => ({
              id: cat.id,
              title: cat.title,
              titleMarathi: cat.titleMarathi,
              description: cat.description,
              descriptionMarathi: cat.descriptionMarathi,
              products: cat.products,
            })
          );

          const marathiCollections = Object.values(categoriesMap).map(
            (cat) => ({
              id: cat.id,
              name: cat.titleMarathi,
              nameEnglish: cat.title,
              description: cat.descriptionMarathi,
              descriptionEnglish: cat.description,
              products: cat.products.map((product) => ({
                ...product,
                name: product.nameMarathi,
                nameEnglish: product.name,
                category: product.categoryMarathi,
              })),
            })
          );

          setCollections({
            english: englishCollections,
            marathi: marathiCollections,
          });
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);

        // Fallback to dummy data if API fails
        setCollections({
          english: [
            {
              id: 1,
              title: "Festive Collection",
              titleMarathi: "सण विशेष संग्रह",
              description:
                "Traditional items for your festivals and celebrations",
              descriptionMarathi: "तुमच्या सणांसाठी पारंपारिक वस्तू",
              products: [
                {
                  id: 101,
                  name: "Diwali Toran",
                  nameMarathi: "दिवाळी तोरण",
                  image:
                    "https://via.placeholder.com/300x300?text=Product+Image",
                  price: 1999,
                },
                {
                  id: 102,
                  name: "Ganesh Mukut",
                  nameMarathi: "गणपती मुकुट",
                  image:
                    "https://via.placeholder.com/300x300?text=Product+Image",
                  price: 899,
                },
              ],
            },
          ],
          marathi: [
            {
              id: 1,
              name: "सण विशेष संग्रह",
              nameEnglish: "Festive Collection",
              description: "तुमच्या सणांसाठी पारंपारिक वस्तू",
              descriptionEnglish:
                "Traditional items for your festivals and celebrations",
              products: [
                {
                  id: 101,
                  name: "दिवाळी तोरण",
                  nameEnglish: "Diwali Toran",
                  image:
                    "https://via.placeholder.com/300x300?text=Product+Image",
                  price: 1999,
                },
                {
                  id: 102,
                  name: "गणपती मुकुट",
                  nameEnglish: "Ganesh Mukut",
                  image:
                    "https://via.placeholder.com/300x300?text=Product+Image",
                  price: 899,
                },
              ],
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "marathi" : "english");
  };

  const scrollToCollection = (index) => {
    if (carouselRef.current && collections[language].length > 0) {
      const container = carouselRef.current;
      const item = container.children[index];
      if (item) {
        item.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
        setActiveCollection(index);
      }
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "english" ? "Featured Collections" : "विशेष संग्रह"}
            </h2>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && collections[language].length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "english" ? "Featured Collections" : "विशेष संग्रह"}
            </h2>
            <p className="text-gray-600">Error: {error}</p>
            <p className="text-gray-600">Using sample data</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "english" ? "Featured Collections" : "विशेष संग्रह"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "english"
                ? "Curated selections of traditional products"
                : "पारंपारिक उत्पादनांची निवडक संग्रह"}
            </p>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {language === "english" ? "मराठी" : "English"}
          </button>
        </div>

        {collections[language].length > 0 ? (
          <div className="relative">
            <button
              onClick={() =>
                scrollToCollection(
                  (activeCollection - 1 + collections[language].length) %
                    collections[language].length
                )
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 -ml-4"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <div
              ref={carouselRef}
              className="flex overflow-x-auto scroll-snap-x-mandatory scrollbar-hide gap-8 py-4 px-2"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {collections[language].map((collection, index) => (
                <div
                  key={collection.id}
                  className="flex-shrink-0 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 px-4 scroll-snap-align-start"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {collection.name || collection.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {collection.description || collection.descriptionEnglish}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {collection.products.map((product, productIndex) => (
                        <ProductCard
                          key={product.id}
                          product={{
                            ...product,
                            name:
                              language === "english"
                                ? product.name || product.nameEnglish
                                : product.nameMarathi || product.name,
                            category: collection.name || collection.title,
                          }}
                          index={productIndex}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                scrollToCollection(
                  (activeCollection + 1) % collections[language].length
                )
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 -mr-4"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {language === "english"
                ? "No collections available"
                : "कोणतेही संग्रह उपलब्ध नाहीत"}
            </p>
          </div>
        )}

        {collections[language].length > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {collections[language].map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCollection(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeCollection === index ? "bg-gray-900 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollections;
