'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type FormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

type FormStatus = {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
};

const subjects = [
  'General Inquiry',
  'AI Solutions',
  'Real Estate Automation',
  'Custom Project',
  'Other',
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: subjects[0],
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setStatus({ type: 'loading' });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({
        type: 'success',
        message: 'Message sent successfully! You will receive a confirmation email shortly. We will review your inquiry and get back to you soon.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: subjects[0],
        message: '',
      });

    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message',
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4"
            >
              Get in Touch
            </motion.h2>
            <p className="text-xl text-stone-600">
              Ready to transform your business with automation? Let&apos;s talk about your project.
            </p>
          </div>

          {status.type === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-8 bg-green-50 rounded-xl mb-8"
            >
              <p className="text-green-800 text-lg font-medium">{status.message}</p>
              <button
                onClick={() => setStatus({ type: 'idle' })}
                className="mt-4 text-green-600 hover:text-green-700 font-medium"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {status.type === 'error' && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-red-800">{status.message}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-[#8B7355] focus:ring-[#8B7355] bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-[#8B7355] focus:ring-[#8B7355] bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
                      Phone Number <span className="text-stone-500">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-[#8B7355] focus:ring-[#8B7355] bg-white"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-stone-700">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-[#8B7355] focus:ring-[#8B7355] bg-white"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-[#8B7355] focus:ring-[#8B7355] bg-white"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className={`inline-flex justify-center items-center py-3 px-8 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-[#8B7355] hover:bg-[#6B5842] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B7355] transition-colors duration-200 ${
                    status.type === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {status.type === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </motion.form>
          )}

          <div className="mt-12 text-center text-stone-600">
            <p>Or reach out directly via email:</p>
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@yourdomain.com'}`}
              className="text-[#8B7355] hover:text-[#6B5842] font-medium"
            >
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@yourdomain.com'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 