// components/OurStory.js
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { ourStoryContent } from "../../constant/AboutUs/ourStoryContent";

const OurStory = () => {
  const { language } = useLanguage();
  const currentContent = ourStoryContent[language];

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Paithani color gradients using our new color variables
  const paithaniGradients = [
    "linear-gradient(to right, #934745, #D4AF37)", // Primary to Golden
    "linear-gradient(to right, #28233c, #934745)", // Secondary to Primary
    "linear-gradient(to right, #D4AF37, #F1E5AC)", // Golden to Light Golden
    "linear-gradient(to right, #934745, #28233c)", // Primary to Secondary
  ];

  return (
    <div
      className="min-h-screen font-sans pt-26"
      style={{
        background: "linear-gradient(to bottom, #f8f8f8, #ffffff)",
      }}
    >
      {/* Hero Section with Paithani gradient */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 text-center text-white"
        style={{ background: paithaniGradients[0] }}
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          {currentContent.title}
        </motion.h1>
        <motion.h2 {...fadeIn} className="text-2xl md:text-3xl mb-6">
          {currentContent.heading}
        </motion.h2>
        <motion.p {...fadeIn} className="text-xl max-w-2xl mx-auto">
          {currentContent.intro}
        </motion.p>
      </motion.section>

      {/* Story Sections with alternating colors */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8"
      >
        {currentContent.sections.map((section, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{
              background: index % 2 === 0 ? "#f8f8f8" : "#ffffff",
              borderLeft: `4px solid ${
                index % 2 === 0 ? "#934745" : "#D4AF37"
              }`,
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{
                color: index % 2 === 0 ? "#934745" : "#28233c",
              }}
            >
              {section.title}
            </h3>
            <p className="leading-relaxed text-gray-800">{section.content}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative Paithani pattern divider */}
      <div className="relative h-16 w-full overflow-hidden">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: "linear-gradient(to right, #934745, #D4AF37, #28233c)",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-1 w-24 rounded-full mx-1"
            style={{ backgroundColor: "#D4AF37" }}
          ></div>
          <div
            className="h-1 w-24 rounded-full mx-1"
            style={{ backgroundColor: "#934745" }}
          ></div>
          <div
            className="h-1 w-24 rounded-full mx-1"
            style={{ backgroundColor: "#F1E5AC" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
