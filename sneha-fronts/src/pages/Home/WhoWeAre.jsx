import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WhoWeAre = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="h-1 w-16 bg-gray-900 mb-8"></div>

            <p className="text-gray-600 mb-6">
              Founded in 2010, we started as a small boutique with a passion for
              quality craftsmanship and unique designs. Today, we've grown into
              a beloved brand known for our commitment to sustainability and
              ethical production.
            </p>

            <p className="text-gray-600 mb-8">
              Every piece in our collection is carefully curated to bring you
              style, comfort, and durability. We work directly with artisans and
              small workshops to ensure fair wages and working conditions.
            </p>

            <motion.div whileHover={{ x: 5 }} className="inline-block">
              <Link
                to="/about"
                className="flex items-center text-gray-900 font-medium group"
              >
                Learn more about us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                alt="Our team working in the studio"
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">10+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
