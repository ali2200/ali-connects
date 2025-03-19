
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
import '../styles/rtl.css';

const Index = () => {
  useEffect(() => {
    // تطبيق اتجاه RTL على عنصر html
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
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
      
      // إزالة اتجاه RTL عند تفكيك المكون
      document.documentElement.removeAttribute('dir');
      document.documentElement.classList.remove('rtl');
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col rtl">
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
