import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../CartFeature/ProductCard";

const FeaturedCollections = () => {
  const [language, setLanguage] = useState("english"); // 'english' or 'marathi'

  const collections = {
    english: [
      {
        id: 1,
        title: "Festive Collection",
        titleMarathi: "सण विशेष संग्रह",
        description: "Traditional items for your festivals and celebrations",
        descriptionMarathi: "तुमच्या सणांसाठी पारंपारिक वस्तू",
        products: [
          {
            id: 101,
            name: "Diwali Toran",
            nameMarathi: "दिवाळी तोरण",
            image: "https://example.com/diwali-toran.jpg",
            price: 1999,
          },
          {
            id: 102,
            name: "Ganesh Mukut",
            nameMarathi: "गणपती मुकुट",
            image: "https://example.com/ganesh-mukut.jpg",
            price: 899,
          },
          {
            id: 103,
            name: "Navi Vastra",
            nameMarathi: "नवी वस्त्र",
            image: "https://example.com/navi-vastra.jpg",
            price: 2499,
          },
          {
            id: 104,
            name: "Akash Kandil",
            nameMarathi: "आकाश कंदील",
            image: "https://example.com/akash-kandil.jpg",
            price: 1299,
          },
        ],
      },
      {
        id: 2,
        title: "Wedding Collection",
        titleMarathi: "लग्न संग्रह",
        description: "Special items for weddings and ceremonies",
        descriptionMarathi: "लग्न आणि विधीसाठी विशेष वस्तू",
        products: [
          {
            id: 201,
            name: "Bridal Oti",
            nameMarathi: "वधू ओटी",
            image: "https://example.com/bridal-oti.jpg",
            price: 4999,
          },
          {
            id: 202,
            name: "Groom's Shawl",
            nameMarathi: "वराचा शेला",
            image: "https://example.com/groom-shawl.jpg",
            price: 3599,
          },
          {
            id: 203,
            name: "Wedding Purse",
            nameMarathi: "लग्न पर्स",
            image: "https://example.com/wedding-purse.jpg",
            price: 1799,
          },
          {
            id: 204,
            name: "Ceremony Handkerchief",
            nameMarathi: "विधी रुमाल",
            image: "https://example.com/ceremony-handkerchief.jpg",
            price: 699,
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
            image: "https://example.com/diwali-toran.jpg",
            price: 1999,
          },
          {
            id: 102,
            name: "गणपती मुकुट",
            nameEnglish: "Ganesh Mukut",
            image: "https://example.com/ganesh-mukut.jpg",
            price: 899,
          },
          {
            id: 103,
            name: "नवी वस्त्र",
            nameEnglish: "Navi Vastra",
            image: "https://example.com/navi-vastra.jpg",
            price: 2499,
          },
          {
            id: 104,
            name: "आकाश कंदील",
            nameEnglish: "Akash Kandil",
            image: "https://example.com/akash-kandil.jpg",
            price: 1299,
          },
        ],
      },
      {
        id: 2,
        name: "लग्न संग्रह",
        nameEnglish: "Wedding Collection",
        description: "लग्न आणि विधीसाठी विशेष वस्तू",
        descriptionEnglish: "Special items for weddings and ceremonies",
        products: [
          {
            id: 201,
            name: "वधू ओटी",
            nameEnglish: "Bridal Oti",
            image: "https://example.com/bridal-oti.jpg",
            price: 4999,
          },
          {
            id: 202,
            name: "वराचा शेला",
            nameEnglish: "Groom's Shawl",
            image: "https://example.com/groom-shawl.jpg",
            price: 3599,
          },
          {
            id: 203,
            name: "लग्न पर्स",
            nameEnglish: "Wedding Purse",
            image: "https://example.com/wedding-purse.jpg",
            price: 1799,
          },
          {
            id: 204,
            name: "विधी रुमाल",
            nameEnglish: "Ceremony Handkerchief",
            image: "https://example.com/ceremony-handkerchief.jpg",
            price: 699,
          },
        ],
      },
    ],
  };

  const carouselRef = useRef(null);
  const [activeCollection, setActiveCollection] = useState(0);

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "marathi" : "english");
  };

  const scrollToCollection = (index) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const item = container.children[index];
      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
      setActiveCollection(index);
    }
  };

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
      </div>
    </section>
  );
};

export default FeaturedCollections;
