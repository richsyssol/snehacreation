import React, { useRef, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CartContext } from "../../Layout/Layout";
import ProductCard from "../CartFeature/ProductCard";

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Emerging Artists",
      description: "Discover rising talents in the contemporary art scene",
      products: [
        {
          id: 101,
          name: "Urban Fragments",
          image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458",
          artist: "Lena Park",
          medium: "Mixed media",
        },
        {
          id: 102,
          name: "Silent Dialogue",
          image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
          artist: "Carlos Mendez",
          medium: "Acrylic",
        },
        {
          id: 103,
          name: "Ephemeral Moments",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
          artist: "Sophie Chen",
          medium: "Watercolor",
        },
        {
          id: 104,
          name: "Digital Horizons",
          image: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
          artist: "Jordan Lee",
          medium: "Digital art",
        },
      ],
    },
    {
      id: 2,
      title: "Commissioned Works",
      description: "Custom creations from our talented artists",
      products: [
        {
          id: 201,
          name: "Portrait Series",
          image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb",
          artist: "Emma Wilson",
          medium: "Oil painting",
        },
        {
          id: 202,
          name: "Abstract Emotions",
          image: "https://images.unsplash.com/photo-1579783900882-c0d3dad065b7",
          artist: "David Kim",
          medium: "Acrylic",
        },
        {
          id: 203,
          name: "Nature's Rhythm",
          image: "https://images.unsplash.com/photo-1579820010410-c10411aaaa88",
          artist: "Olivia Martinez",
          medium: "Watercolor",
        },
        {
          id: 204,
          name: "Metropolis",
          image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8",
          artist: "Ryan Park",
          medium: "Ink drawing",
        },
      ],
    },
  ];

  const carouselRef = useRef(null);
  const [activeCollection, setActiveCollection] = useState(0);

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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Curated selections of exceptional artworks
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() =>
              scrollToCollection(
                (activeCollection - 1 + collections.length) % collections.length
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
            {collections.map((collection, index) => (
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
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{collection.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    {collection.products.map((product, productIndex) => (
                      <ProductCard
                        key={product.id}
                        product={product}
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
              scrollToCollection((activeCollection + 1) % collections.length)
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 -mr-4"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {collections.map((_, index) => (
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
