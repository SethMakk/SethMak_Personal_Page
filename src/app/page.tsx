import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <CaseStudies />
      <Contact />
    </>
  );
}
