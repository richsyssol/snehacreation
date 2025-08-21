import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Star,
  Shield,
  Truck,
  Gift,
  Instagram,
  Facebook,
  Share2,
  Twitter,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Hero slider images
  const heroSlides = [
    {
      id: 1,
      title: "Handcrafted Luxury",
      subtitle: "Discover our exclusive collection of artisanal handbags",
      image:
        "https://images.unsplash.com/photo-1595341595379-cf0f9570b0c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaText: "Shop Now",
      ctaLink: "/products/handbags",
    },
    {
      id: 2,
      title: "Festive Collection",
      subtitle: "Special Diwali edition with traditional motifs",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaText: "Explore",
      ctaLink: "/products/festive-collection",
    },
    {
      id: 3,
      title: "Custom Orders",
      subtitle: "Personalized creations just for you",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaText: "Get Started",
      ctaLink: "/custom-orders",
    },
  ];

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Handwoven Jute Handbag",
      price: 2499,
      originalPrice: 2999,
      image:
        "https://images.unsplash.com/photo-1595341595379-cf0f9570b0c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      reviews: 124,
      isNew: true,
    },
    {
      id: 2,
      name: "Embroidered Silk Purse",
      price: 1799,
      originalPrice: 1999,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      reviews: 89,
      isNew: false,
    },
    {
      id: 3,
      name: "Beaded Statement Necklace",
      price: 1299,
      originalPrice: 1599,
      image:
        "https://images.unsplash.com/photo-1611591437281-460914d0fef3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      reviews: 156,
      isNew: true,
    },
    {
      id: 4,
      name: "Handpainted Wall Art",
      price: 3499,
      originalPrice: 3999,
      image:
        "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      reviews: 72,
      isNew: false,
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      comment:
        "The handbag I purchased is even more beautiful in person. The craftsmanship is exceptional!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Rahul Patel",
      location: "Delhi",
      comment:
        "I ordered a custom wallet for my wife's birthday and she absolutely loved it. The attention to detail is remarkable.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Ananya Reddy",
      location: "Bangalore",
      comment:
        "The jewelry pieces are stunning and very reasonably priced. I've received so many compliments!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Instagram gallery images
  const instagramPosts = [
    "https://images.unsplash.com/photo-1561526116-e2460f4d40a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1561526116-e2460f4d40a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  ];

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}

        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <motion.div
            className="max-w-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-lg md:text-xl font-medium text-purple-200 mb-2 block">
              Sneha Creation Presents
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg">
              {heroSlides[currentSlide].subtitle}
            </p>
            <Link
              to={heroSlides[currentSlide].ctaLink}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center transition-colors duration-300 shadow-lg hover:shadow-purple-500/30"
            >
              {heroSlides[currentSlide].ctaText}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-purple-600 w-12"
                  : "bg-white/50 w-8"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Free Shipping
              </h3>
              <p className="text-gray-600 text-sm">
                On all orders over ₹2000 across India
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Secure Payments
              </h3>
              <p className="text-gray-600 text-sm">
                100% secure payment options with SSL encryption
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Premium Quality
              </h3>
              <p className="text-gray-600 text-sm">
                Handcrafted with finest materials and care
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Gift className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Gift Packaging
              </h3>
              <p className="text-gray-600 text-sm">
                Free elegant gift wrapping for all orders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of our finest artisan-crafted products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group"
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      New
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full flex items-center transition-colors shadow-md">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-purple-600">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors group"
            >
              View All Products
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Artisan at work"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Handcrafted with Passion Since 2010
              </h2>
              <p className="text-gray-600 mb-4">
                Sneha Creation began as a small workshop in Mumbai with just two
                artisans. Today, we're a family of over 50 skilled craftspeople
                dedicated to preserving traditional Indian handicraft techniques
                while innovating with contemporary designs.
              </p>
              <p className="text-gray-600 mb-8">
                Each piece in our collection tells a story - of the hands that
                made it, the materials that form it, and the culture that
                inspires it. We take pride in ethical sourcing, sustainable
                practices, and fair wages for all our artisans.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-purple-600 font-bold text-3xl mb-2">
                    500+
                  </div>
                  <div className="text-gray-600 text-sm">Happy Customers</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-purple-600 font-bold text-3xl mb-2">
                    50+
                  </div>
                  <div className="text-gray-600 text-sm">Skilled Artisans</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-purple-600 font-bold text-3xl mb-2">
                    12+
                  </div>
                  <div className="text-gray-600 text-sm">Years Experience</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-purple-600 font-bold text-3xl mb-2">
                    100%
                  </div>
                  <div className="text-gray-600 text-sm">Handmade</div>
                </div>
              </div>
              <Link
                to="/about"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-colors shadow-md hover:shadow-purple-500/30"
              >
                Our Story
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Follow Us on Instagram
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              @sneha_creation - Tag us to be featured!
            </p>
            <a
              href="#"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              <Instagram className="h-5 w-5 mr-2" />
              Follow @sneha_creation
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
            {instagramPosts.map((imgUrl, i) => (
              <div
                key={i}
                className="relative group overflow-hidden aspect-square"
              >
                <img
                  src={imgUrl}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-lg text-purple-100 mb-8">
              Subscribe to get updates on new collections, exclusive offers, and
              artisan stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none text-gray-900"
              />
              <button className="bg-purple-800 hover:bg-purple-900 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Sneha Creation</h3>
              <p className="text-gray-400 mb-4">
                Handcrafted luxury products made with traditional techniques and
                modern designs.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Shop</h4>
              <ul className="space-y-2">
                {[
                  "Handbags",
                  "Purses & Wallets",
                  "Jewelry",
                  "Home Decor",
                  "New Arrivals",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Information</h4>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Our Artisans",
                  "Sustainability",
                  "Blog",
                  "Contact Us",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Customer Care</h4>
              <ul className="space-y-2">
                {[
                  "Shipping Policy",
                  "Returns & Exchanges",
                  "FAQs",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Sneha Creation. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {["visa", "mastercard", "paypal", "upi"].map((method) => (
                <div key={method} className="bg-white/10 p-2 rounded">
                  <span className="text-xs font-medium">
                    {method.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
