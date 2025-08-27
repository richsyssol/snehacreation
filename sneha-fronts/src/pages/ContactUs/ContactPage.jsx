import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext"; // Import the language hook

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { language, toggleLanguage } = useLanguage(); // Get language and toggle function

  // Translation content
  const translations = {
    en: {
      title: "Contact Us",
      description:
        "Have questions or need assistance? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      formTitle: "Send us a Message",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      messageLabel: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your.email@example.com",
      phonePlaceholder: "+1 (234) 567-8900",
      messagePlaceholder: "Your message here...",
      submitButton: "Send via WhatsApp",
      contactTitle: "Get in Touch",
      addressTitle: "Address",
      address: "Nashik, Maharashtra",
      phoneTitle: "Phone",
      phone1: "+1 (123) 456-7890",
      phone2: "+1 (234) 567-8901",
      emailTitle: "Email",
      email1: "info@example.com",
      email2: "support@example.com",
      hoursTitle: "Business Hours",
      weekdays: "Monday - Friday",
      weekdaysTime: "9:00 AM - 6:00 PM",
      saturday: "Saturday",
      saturdayTime: "10:00 AM - 4:00 PM",
      sunday: "Sunday",
      sundayTime: "Closed",
    },
    mr: {
      title: "संपर्क करा",
      description:
        "तुम्हाला काही प्रश्न आहेत किंवा मदत हवी आहे? आम्हाला तुमच्याकडून ऐकायला आवडेल. आम्हाला एक संदेश पाठवा आणि आम्ही लवकरात लवकर प्रतिसाद देऊ.",
      formTitle: "आम्हाला संदेश पाठवा",
      nameLabel: "पूर्ण नाव",
      emailLabel: "ईमेल पत्ता",
      phoneLabel: "फोन नंबर",
      messageLabel: "संदेश",
      namePlaceholder: "तुमचे नाव",
      emailPlaceholder: "तुमचा.ईमेल@उदाहरण.com",
      phonePlaceholder: "+९१ ९८७६५ ४३२१०",
      messagePlaceholder: "तुमचा संदेश इथे लिहा...",
      submitButton: "WhatsApp वर पाठवा",
      contactTitle: "संपर्कात रहा",
      addressTitle: "पत्ता",
      address: "नाशिक, महाराष्ट्र",
      phoneTitle: "फोन",
      phone1: "+९१ ९८७६५ ४३२१०",
      phone2: "+९१ ९८७६५ ४३२११",
      emailTitle: "ईमेल",
      email1: "माहिती@उदाहरण.com",
      email2: "आधार@उदाहरण.com",
      hoursTitle: "व्यवसायाचे तास",
      weekdays: "सोमवार - शुक्रवार",
      weekdaysTime: "सकाळी ९:०० - संध्याकाळी ६:००",
      saturday: "शनिवार",
      saturdayTime: "सकाळी १०:०० - दुपारी ४:००",
      sunday: "रविवार",
      sundayTime: "बंद",
    },
  };

  const t = translations[language]; // Get translations for current language

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the message for WhatsApp
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/9876543210?text=${message}`, "_blank");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f2f5] to-[#efe6e9] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Language Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleLanguage}
            className="bg-gradient-to-r from-[#934745] to-[#28233c] hover:from-[#834140] hover:to-[#1f1c32] text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            {language === "en" ? "मराठी" : "English"}
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#422B39] mb-4 mt-12">
            {t.title}
          </h1>
          <p className="text-lg text-[#5a3f4b] max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Contact Form - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-[#422B39] to-[#854345] text-white"
            >
              <h2 className="text-2xl font-bold mb-6">{t.formTitle}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#5a3f4b] bg-opacity-40 text-white placeholder-[#c9b3bc] focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
                    placeholder={t.namePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#5a3f4b] bg-opacity-40 text-white placeholder-[#c9b3bc] focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
                    placeholder={t.emailPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#5a3f4b] bg-opacity-40 text-white placeholder-[#c9b3bc] focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
                    placeholder={t.phonePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {t.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#5a3f4b] bg-opacity-40 text-white placeholder-[#c9b3bc] focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
                    placeholder={t.messagePlaceholder}
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-white text-[#854345] font-semibold py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-100"
                >
                  {t.submitButton}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:w-1/2 p-8 md:p-12 bg-white text-gray-800"
            >
              <h2 className="text-2xl font-bold mb-6 text-[#422B39]">
                {t.contactTitle}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-[#f5e8ed] p-3 rounded-full">
                      <svg
                        className="w-6 h-6 text-[#854345]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#422B39]">
                      {t.addressTitle}
                    </h3>
                    <p className="text-[#5a3f4b]">{t.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-[#f5e8ed] p-3 rounded-full">
                      <svg
                        className="w-6 h-6 text-[#854345]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#422B39]">
                      {t.phoneTitle}
                    </h3>
                    <p className="text-[#5a3f4b]">{t.phone1}</p>
                    <p className="text-[#5a3f4b]">{t.phone2}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-[#f5e8ed] p-3 rounded-full">
                      <svg
                        className="w-6 h-6 text-[#854345]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#422B39]">
                      {t.emailTitle}
                    </h3>
                    <p className="text-[#5a3f4b]">{t.email1}</p>
                    <p className="text-[#5a3f4b]">{t.email2}</p>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-lg font-semibold text-[#422B39] mb-4">
                    {t.hoursTitle}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#5a3f4b]">{t.weekdays}</span>
                      <span className="font-medium text-[#422B39]">
                        {t.weekdaysTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5a3f4b]">{t.saturday}</span>
                      <span className="font-medium text-[#422B39]">
                        {t.saturdayTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5a3f4b]">{t.sunday}</span>
                      <span className="font-medium text-[#422B39]">
                        {t.sundayTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
