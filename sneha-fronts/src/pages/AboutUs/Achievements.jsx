// components/Achievements.js
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { achievementsContent } from "../../constant/AboutUs/achievementsContent";
import { useNavigate } from "react-router-dom";

const Achievements = () => {
  const { language } = useLanguage();
  const currentContent = achievementsContent[language];

  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white font-sans py-12 pt-32">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-primary mb-4"
        >
          {currentContent.title}
        </motion.h1>
        <motion.p
          {...fadeIn}
          className="text-xl text-gray-800 max-w-2xl mx-auto"
        >
          {currentContent.subtitle}
        </motion.p>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="container mx-auto px-4 mb-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Years */}
          <motion.div
            variants={fadeIn}
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
          >
            <h3 className="text-4xl font-bold text-primary mb-2">
              {currentContent.years}
            </h3>
            <p className="text-gray-700">{currentContent.yearsText}</p>
          </motion.div>

          {/* Customers */}
          <motion.div
            variants={fadeIn}
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
          >
            <h3 className="text-4xl font-bold text-primary mb-2">
              {currentContent.customers}
            </h3>
            <p className="text-gray-700">{currentContent.customersText}</p>
          </motion.div>

          {/* Products */}
          <motion.div
            variants={fadeIn}
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
          >
            <h3 className="text-4xl font-bold text-primary mb-2">
              {currentContent.products}
            </h3>
            <p className="text-gray-700">{currentContent.productsText}</p>
          </motion.div>

          {/* Cities */}
          <motion.div
            variants={fadeIn}
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
          >
            <h3 className="text-4xl font-bold text-primary mb-2">
              {currentContent.cities}
            </h3>
            <p className="text-gray-700">{currentContent.citiesText}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-20"
      >
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          {language === "en" ? "Our Journey" : "आमचा प्रवास"}
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

          {/* Timeline items */}
          {currentContent.milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-12 flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center`}
            >
              {/* Year */}
              <div className="md:w-1/2 flex justify-center md:justify-end px-4">
                <div className="bg-primary text-white py-2 px-6 rounded-full text-lg font-semibold inline-block">
                  {milestone.year}
                </div>
              </div>

              {/* Content */}
              <div className="md:w-1/2 px-4 mt-4 md:mt-0">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-700">{milestone.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Awards Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-20"
      >
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          {currentContent.awardsTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {currentContent.awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-start"
            >
              <div className="bg-lightGolden p-3 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="text-lg text-gray-800">{award}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 text-center bg-primary text-white"
      >
        <h3 className="text-3xl font-bold mb-6">
          {language === "en"
            ? "Join Our Success Story"
            : "आमच्या यशस्वी गोष्टीत सामील व्हा"}
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white text-primary rounded-full text-xl font-semibold shadow-lg hover:bg-gray-100 transition-colors"
          onClick={() => navigate("/")}
        >
          {language === "en" ? "Shop Now" : "आत्ता खरेदी करा"}
        </motion.button>
      </motion.section>
    </div>
  );
};

export default Achievements;
