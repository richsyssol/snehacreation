import React, { useState, useEffect, useContext } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  ShoppingCart,
  Palette,
  Award,
  Scissors,
  Camera,
  User,
  Video,
  Home,
  Info,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../Layout/Layout";
import { useLanguage } from "../contexts/LanguageContext";

// Color variables
const COLORS = {
  primary: "#934745", // Main burgundy color
  secondary: "#28233c", // Dark blue color
  accent: "#9c9ca7", // Light gray/lavender
  golden: "#D4AF37", // Gold accent color
  lightGolden: "#F1E5AC", // Light gold for highlights
  white: "#ffffff",
  gray: {
    100: "#f8f8f8",
    200: "#c5c5c4",
    800: "#1f1c32",
    900: "#28233c",
  },
  text: {
    dark: "#28233c",
    light: "#ffffff",
    muted: "#c5c5c4",
  },
};

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const {
    cartItems,
    openCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    closeCart,
  } = useContext(CartContext);

  const navItems = [
    { label: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    // {
    //   label: "Products",
    //   path: "/products",
    //   icon: <ShoppingBag className="h-4 w-4 mr-2" />,
    //   subItems: [
    //     "Handbags",
    //     "Purses",
    //     "Wall Art",
    //     "Home Decor",
    //     "Jewelry",
    //     "Custom Orders",
    //   ],
    // },
    // {
    //   label: "Our Process",
    //   path: "/process",
    //   icon: <Scissors className="h-4 w-4 mr-2" />,
    //   subItems: [
    //     "Designing",
    //     "Material Selection",
    //     "Handcrafting",
    //     "Quality Check",
    //   ],
    // },
    // {
    //   label: "Materials",
    //   path: "/materials",
    //   icon: <Palette className="h-4 w-4 mr-2" />,
    // },
    {
      label: "Gallery",
      path: "/gallery",
      icon: <Camera className="h-4 w-4 mr-2" />,
      subItems: [
        { label: "Product Photos", path: "/gallery/product-photos" },
        // { label: "Making Process", path: "/gallery/making-process" },
        // { label: "Workshop", path: "/gallery/workshop" },
      ],
    },
    {
      label: "About Us",
      path: "/about",
      icon: <Info className="h-4 w-4 mr-2" />,
      subItems: [
        { label: "Our Story", path: "/ourstory" },

        { label: "Achievements", path: "/achievements" },
        "Testimonials",
      ],
    },
    {
      label: "Contact",
      path: "/contact",
      icon: <Phone className="h-4 w-4 mr-2" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Helper function to get subItem display text and path
  const getSubItemInfo = (subItem) => {
    if (typeof subItem === "string") {
      return {
        label: subItem,
        path: `/${subItem.toLowerCase().replace(/\s+/g, "-")}`,
      };
    } else if (subItem && typeof subItem === "object") {
      return {
        label: subItem.label,
        path: subItem.path,
      };
    }
    return { label: "", path: "#" };
  };

  return (
    <header className="fixed w-full z-50">
      {/* Top Contact Bar */}
      <div
        className={`bg-gradient-to-r from-[${COLORS.primary}] via-[${
          COLORS.secondary
        }] to-[${
          COLORS.accent
        }] text-white text-sm transition-all duration-300 ${
          scrolled ? "h-0 overflow-hidden" : "h-10"
        }`}
        style={{
          background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent})`,
          borderBottom: `2px solid ${COLORS.golden}`,
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
            <a
              href="mailto:info@snehacreation.com"
              className="flex items-center hover:text-[${COLORS.gray[200]}] transition-colors"
              style={{
                color: COLORS.white,
                hover: { color: COLORS.gray[200] },
              }}
            >
              <Mail className="h-4 w-4 mr-1" />
              info@snehacreation.com
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center hover:text-[${COLORS.gray[200]}] transition-colors"
              style={{
                color: COLORS.white,
                hover: { color: COLORS.gray[200] },
              }}
            >
              <Phone className="h-4 w-4 mr-1" />
              +91 9876543210
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Nashik, Maharashtra</span>
            <div className="flex space-x-2 ml-4">
              <a
                href="#"
                className="hover:text-[${COLORS.gray[200]}]"
                style={{
                  color: COLORS.white,
                  hover: { color: COLORS.gray[200] },
                }}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="hover:text-[${COLORS.gray[200]}]"
                style={{
                  color: COLORS.white,
                  hover: { color: COLORS.gray[200] },
                }}
              >
                <i className="fab fa-pinterest"></i>
              </a>
              <a
                href="#"
                className="hover:text-[${COLORS.gray[200]}]"
                style={{
                  color: COLORS.white,
                  hover: { color: COLORS.gray[200] },
                }}
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`bg-white shadow-md transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
        style={{
          backgroundColor: COLORS.white,
          borderBottom: `2px solid ${COLORS.golden}`,
        }}
      >
        <div className="container mx-auto px-4 flex justify-around items-center">
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold text-[${COLORS.primary}]"
              style={{ color: COLORS.primary }}
            >
              <img src="/logo.png" alt="Sneha " className="h-12 w-auto ml-2" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center text-gray-800 hover:text-[${COLORS.primary}] transition-colors"
                      style={{
                        color: COLORS.text.dark,
                        hover: { color: COLORS.primary },
                      }}
                    >
                      {item.icon}
                      {item.label}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-[${COLORS.gray[200]}]"
                          style={{
                            backgroundColor: COLORS.white,
                            border: `1px solid ${COLORS.gray[200]}`,
                            borderTop: `3px solid ${COLORS.golden}`,
                          }}
                        >
                          <div className="py-1">
                            {item.subItems.map((subItem) => {
                              const { label, path } = getSubItemInfo(subItem);
                              return (
                                <a
                                  key={label}
                                  href={item.path + path}
                                  className="block px-4 py-2 text-gray-800 hover:bg-[${COLORS.gray[100]}] hover:text-[${COLORS.primary}] transition-colors"
                                  style={{
                                    color: COLORS.text.dark,
                                    hover: {
                                      backgroundColor: COLORS.gray[100],
                                      color: COLORS.primary,
                                    },
                                  }}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {label}
                                </a>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={item.path}
                    className="flex items-center text-gray-800 hover:text-[${COLORS.primary}] transition-colors"
                    style={{
                      color: COLORS.text.dark,
                      hover: { color: COLORS.primary },
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            {/* language button  */}
            <button
              onClick={toggleLanguage}
              className="ml-4 bg-gradient-to-r from-[${COLORS.primary}] to-[${COLORS.secondary}] hover:from-[#834140] hover:to-[${COLORS.gray[800]}] text-white px-6 py-2 rounded-lg flex  items-center transition-colors"
              style={{
                background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
                hover: {
                  background: `linear-gradient(to right, #834140, ${COLORS.gray[800]})`,
                },
                color: COLORS.white,
                border: `1px solid ${COLORS.golden}`,
              }}
            >
              {language === "en" ? "मराठी" : "English"}
            </button>
            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative ml-4 bg-gradient-to-r from-[${COLORS.primary}] to-[${COLORS.secondary}] hover:from-[#834140] hover:to-[${COLORS.gray[800]}] text-white px-6 py-2 rounded-lg flex  items-center transition-colors "
              style={{
                background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
                hover: {
                  background: `linear-gradient(to right, #834140, ${COLORS.gray[800]})`,
                },
                color: COLORS.white,
                border: `1px solid ${COLORS.golden}`,
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              <div> Cart</div>
              {cartItems?.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-[${COLORS.accent}] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  style={{
                    backgroundColor: COLORS.accent,
                    color: COLORS.white,
                    border: `1px solid ${COLORS.golden}`,
                  }}
                >
                  {cartItems?.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
          <div className="flex gap-4 ">
            <button
              onClick={openCart}
              className="lg:hidden relative px-4 py-2 bg-gradient-to-r from-[${COLORS.primary}] to-[${COLORS.secondary}] hover:from-[#834140] hover:to-[${COLORS.gray[800]}] text-white rounded-xl flex items-center"
              style={{
                background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
                hover: {
                  background: `linear-gradient(to right, #834140, ${COLORS.gray[800]})`,
                },
                color: COLORS.white,
                border: `1px solid ${COLORS.golden}`,
              }}
            >
              <ShoppingCart size={20} />
              {cartItems?.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-[${COLORS.accent}] text-white text-xs rounded-xl w-5 h-5 flex items-center justify-center"
                  style={{
                    backgroundColor: COLORS.accent,
                    color: COLORS.white,
                    border: `1px solid ${COLORS.golden}`,
                  }}
                >
                  {cartItems?.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-800 focus:outline-none"
              style={{ color: COLORS.text.dark }}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto"
            style={{ backgroundColor: COLORS.white }}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <img src="/logo.png" alt="" className="h-10 w-10" />
                  <a
                    href="/"
                    className="text-xl font-bold text-[${COLORS.primary}] ml-2"
                    style={{ color: COLORS.primary }}
                  >
                    SnehasCreation
                  </a>
                </div>
                <button
                  onClick={toggleMenu}
                  className="text-gray-800"
                  style={{ color: COLORS.text.dark }}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-gray-100 pb-2"
                    style={{ borderBottom: `1px solid ${COLORS.gray[100]}` }}
                  >
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className="flex items-center justify-between w-full py-3 text-gray-800"
                          style={{ color: COLORS.text.dark }}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              openDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-8 overflow-hidden"
                          >
                            <div className="py-2 space-y-2">
                              {item.subItems.map((subItem) => {
                                const { label, path } = getSubItemInfo(subItem);
                                return (
                                  <a
                                    key={label}
                                    href={item.path + path}
                                    className="block py-2 text-gray-600 hover:text-[${COLORS.primary}] transition-colors"
                                    style={{
                                      color: COLORS.text.muted,
                                      hover: { color: COLORS.primary },
                                    }}
                                    onClick={toggleMenu}
                                  >
                                    {label}
                                  </a>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.path}
                        className="flex items-center py-3 text-gray-800 hover:text-[${COLORS.primary}] transition-colors"
                        style={{
                          color: COLORS.text.dark,
                          hover: { color: COLORS.primary },
                        }}
                        onClick={toggleMenu}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={openCart}
                  className="relative px-6 py-3 bg-gradient-to-r from-[${COLORS.primary}] to-[${COLORS.secondary}] hover:from-[#834140] hover:to-[${COLORS.gray[800]}] text-white rounded-xl flex items-center"
                  style={{
                    background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
                    hover: {
                      background: `linear-gradient(to right, #834140, ${COLORS.gray[800]})`,
                    },
                    color: COLORS.white,
                    border: `1px solid ${COLORS.golden}`,
                  }}
                >
                  <ShoppingCart size={20} />
                  {cartItems?.length > 0 && (
                    <span
                      className="absolute -top-1 -right-1 bg-[${COLORS.accent}] text-white text-xs rounded-xl w-5 h-5 flex items-center justify-center"
                      style={{
                        backgroundColor: COLORS.accent,
                        color: COLORS.white,
                        border: `1px solid ${COLORS.golden}`,
                      }}
                    >
                      {cartItems?.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  )}
                  <span className="ml-2"> Cart</span>
                </button>
              </div>

              <div
                className="mt-8 p-4 bg-[${COLORS.gray[100]}] rounded-lg"
                style={{ backgroundColor: COLORS.gray[100] }}
              >
                <h3
                  className="font-semibold text-gray-900 mb-3"
                  style={{ color: COLORS.text.dark }}
                >
                  Contact Us
                </h3>
                <a
                  href="mailto:info@snehacreation.com"
                  className="flex items-center text-gray-700 mb-2"
                  style={{ color: COLORS.text.muted }}
                >
                  <Mail
                    className="h-5 w-5 mr-2 text-[${COLORS.primary}]"
                    style={{ color: COLORS.primary }}
                  />
                  info@snehacreation.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center text-gray-700 mb-2"
                  style={{ color: COLORS.text.muted }}
                >
                  <Phone
                    className="h-5 w-5 mr-2 text-[${COLORS.primary}]"
                    style={{ color: COLORS.primary }}
                  />
                  +91 9876543210
                </a>
                <div
                  className="flex items-start text-gray-700"
                  style={{ color: COLORS.text.muted }}
                >
                  <MapPin
                    className="h-5 w-5 mr-2 text-[${COLORS.primary}] mt-1"
                    style={{ color: COLORS.primary }}
                  />
                  <span>123 Art Street, Mumbai, Maharashtra, India</span>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-4 mt-4">
                  <a
                    href="#"
                    className="text-[${COLORS.primary}] hover:text-[${COLORS.secondary}]"
                    style={{
                      color: COLORS.primary,
                      hover: { color: COLORS.secondary },
                    }}
                  >
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="text-[${COLORS.primary}] hover:text-[${COLORS.secondary}]"
                    style={{
                      color: COLORS.primary,
                      hover: { color: COLORS.secondary },
                    }}
                  >
                    <i className="fab fa-pinterest text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="text-[${COLORS.primary}] hover:text-[${COLORS.secondary}]"
                    style={{
                      color: COLORS.primary,
                      hover: { color: COLORS.secondary },
                    }}
                  >
                    <i className="fab fa-facebook-f text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
