
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CoursePreview from '@/components/home/CoursePreview';
import BookPreview from '@/components/home/BookPreview';
import MarketplacePreview from '@/components/home/MarketplacePreview';
import FreelancerShowcase from '@/components/home/FreelancerShowcase';
import CTASection from '@/components/home/CTASection';
import '@/styles/rtl.css';

const Index: React.FC = () => {
  console.log("Index component rendering");
  
  useEffect(() => {
    console.log("Index useEffect running");
    
    // Set RTL direction on html element
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.classList.add('rtl');
    
    // Animation for elements with animate-on-scroll class
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });
    
    // Safely check if elements exist before observing
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length > 0) {
      elements.forEach(element => {
        observer.observe(element);
      });
    }
    
    return () => {
      // Safely unobserve elements
      if (elements.length > 0) {
        elements.forEach(element => {
          observer.unobserve(element);
        });
      }
      
      // Remove RTL direction when component unmounts
      document.documentElement.removeAttribute('dir');
      document.documentElement.classList.remove('rtl');
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <CoursePreview />
        <BookPreview />
        <MarketplacePreview />
        <FreelancerShowcase />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
