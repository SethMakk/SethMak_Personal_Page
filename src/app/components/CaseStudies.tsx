'use client';

import { motion } from 'framer-motion';

const placeholderCases = [
  {
    title: 'Coming Soon',
    description: 'An exciting automation project that will showcase our expertise in AI-powered solutions.',
    tag: 'AI Automation',
  },
  {
    title: 'Coming Soon',
    description: 'A transformative real estate automation tool that revolutionizes lead generation.',
    tag: 'Real Estate',
  },
  {
    title: 'Coming Soon',
    description: 'An innovative NLP solution that streamlines business processes and enhances productivity.',
    tag: 'NLP',
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
          >
            Case Studies
          </motion.h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Discover how our automation solutions have transformed businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {placeholderCases.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-[#8B7355] to-[#6B5842]">
                <div className="flex items-center justify-center text-white text-6xl opacity-20">
                  ?
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-[#8B7355] bg-[#F5F0EB] rounded-full mb-4">
                  {caseStudy.tag}
                </span>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  {caseStudy.title}
                </h3>
                <p className="text-stone-600">
                  {caseStudy.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 