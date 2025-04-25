'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#F5F0EB] to-[#FAF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 mb-6">
            Transforming Business Through
            <span className="block text-[#8B7355]">Intelligent Automation</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-3xl mx-auto">
            Custom AI solutions and automation tools that streamline your workflow,
            boost productivity, and drive growth.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#contact"
              className="inline-block bg-[#8B7355] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#6B5842] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Your Project
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E8E0D8] rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8E0D8] rounded-full opacity-30 blur-3xl"></div>
      </div>
    </section>
  );
} 