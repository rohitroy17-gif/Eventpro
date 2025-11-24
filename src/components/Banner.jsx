"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-pink-600 via-pink-500 to-pink-700 text-white overflow-hidden">
      {/* Floating Shapes */}
      <motion.div
        className="absolute w-72 h-72 bg-white rounded-full opacity-10 -top-20 -left-20"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-white rounded-full opacity-10 -bottom-20 -right-20"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Banner Content */}
      <div className="relative max-w-4xl mx-auto py-32 px-6 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Make Your Events Unforgettable
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Weddings, birthdays, corporate events — we handle it all with elegance and style.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <button className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg shadow-lg hover:scale-105 hover:bg-pink-50 transition-transform">
            Learn More
          </button>
          <Link href="/booking"><button className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:bg-pink-700 transition-transform">
            Create Booking
          </button></Link>
        </motion.div>
      </div>
    </section>
  );
}

