// components/Testimonials.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { testimonialsContent } from "../../constant/AboutUs/testimonialsContent";

const Testimonials = () => {
  const { language } = useLanguage();
  const currentContent = testimonialsContent[language];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

  // Function to render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-golden" : "text-gray-200"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
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
        className="container mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          {currentContent.stats.title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {currentContent.stats.items.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <h3 className="text-4xl font-bold text-primary mb-2">
                {item.value}
              </h3>
              <p className="text-gray-700">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col"
            >
              {/* Rating */}
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 flex-grow">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center mt-auto">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Testimonial Carousel */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-primary text-white py-16 mb-20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === "en"
              ? "Featured Reviews"
              : "वैशिष्ट्यीकृत पुनरावलोकने"}
          </h2>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="flex justify-center mb-6">
                {renderStars(
                  currentContent.testimonials[activeTestimonial].rating
                )}
              </div>

              <p className="text-xl italic mb-8">
                "{currentContent.testimonials[activeTestimonial].text}"
              </p>

              <div className="flex items-center justify-center">
                <img
                  src={currentContent.testimonials[activeTestimonial].image}
                  alt={currentContent.testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {currentContent.testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600">
                    {currentContent.testimonials[activeTestimonial].location}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {currentContent.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? "bg-white" : "bg-lightGolden"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center mb-20"
      >
        <h3 className="text-3xl font-bold text-primary mb-6">
          {currentContent.cta.title}
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-primary text-white rounded-full text-xl font-semibold shadow-lg hover:bg-secondary transition-colors"
        >
          {currentContent.cta.button}
        </motion.button>
      </motion.section>
    </div>
  );
};

export default Testimonials;
