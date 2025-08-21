import React from "react";
import {
  FaFacebookF,
  FaPinterest,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { BsHandbag } from "react-icons/bs";

const Footer = () => {
  const socialIcons = [
    { icon: FaInstagram, label: "Instagram", color: "text-pink-600" },
    { icon: FaPinterest, label: "Pinterest", color: "text-red-600" },
    { icon: FaFacebookF, label: "Facebook", color: "text-blue-600" },
    { icon: FaWhatsapp, label: "WhatsApp", color: "text-green-500" },
  ];

  const productCategories = [
    { name: "Handbags", link: "/products/handbags" },
    { name: "Purses & Wallets", link: "/products/purses" },
    { name: "Wall Art", link: "/products/wall-art" },
    { name: "Home Decor", link: "/products/home-decor" },
    { name: "Jewelry", link: "/products/jewelry" },
    { name: "Custom Orders", link: "/products/custom" },
  ];

  const quickLinks = [
    { name: "Our Process", link: "/process" },
    { name: "Materials Used", link: "/materials" },
    { name: "Gallery", link: "/gallery" },
    { name: "About Us", link: "/about" },
    { name: "Testimonials", link: "/testimonials" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-purple-50 text-gray-800 pt-16 pb-8 px-6 md:px-16 rounded-t-3xl shadow-inner"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-purple-700">
            Sneha Creation
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Handcrafted with love and tradition. Each piece tells a story of
            artistry and dedication to preserving traditional craftsmanship
            while embracing modern designs.
          </p>
          <div className="flex gap-4 mt-6">
            {socialIcons.map(({ icon: Icon, label, color }, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                title={label}
                className={`cursor-pointer bg-white p-3 rounded-full shadow-sm hover:bg-purple-100 ${color}`}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Product Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-700">
            Our Products
          </h3>
          <ul className="space-y-2">
            {productCategories.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={link.link}
                  className="text-gray-700 hover:text-purple-600 transition-colors flex items-center"
                >
                  <BsHandbag className="mr-2" size={14} />
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-700">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {quickLinks.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={link.link}
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-purple-700">
            Contact Us
          </h3>
          <ul className="text-sm text-gray-700 space-y-3">
            <li className="flex items-start gap-3">
              <IoLocationOutline size={20} className="text-purple-600 mt-1" />
              <span>
                123 Art Street, Mumbai
                <br />
                Maharashtra, India - 400001
              </span>
            </li>
            <li className="flex items-center gap-3">
              <IoCallOutline size={20} className="text-purple-600" />
              <div>
                <a href="tel:+919876543210" className="hover:text-purple-600">
                  +91 9876543210
                </a>
                <div className="flex gap-2 mt-1">
                  <a
                    href="https://wa.me/919876543210"
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <FaWhatsapp size={12} /> WhatsApp
                  </a>
                </div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <MdOutlineEmail size={20} className="text-purple-600" />
              <a
                href="mailto:info@snehacreation.com"
                className="hover:text-purple-600"
              >
                info@snehacreation.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <BsHandbag size={20} className="text-purple-600" />
              <span>Custom orders welcome!</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center text-sm text-gray-600 border-t border-purple-200 pt-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-purple-700">
              Sneha Creation
            </span>
            . All Rights Reserved.
          </p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="text-gray-700 hover:text-purple-600">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600">
              Terms of Service
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600">
              Shipping Policy
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600">
              Returns & Exchanges
            </a>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
