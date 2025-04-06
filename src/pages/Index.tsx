
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CoursePreview from '@/components/home/CoursePreview';
import MarketplacePreview from '@/components/home/MarketplacePreview';
import FreelancerShowcase from '@/components/home/FreelancerShowcase';
import BookPreview from '@/components/home/BookPreview';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/layout/Footer';
import JobPreview from '@/components/home/JobPreview';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>علي للأعمال - منصة شاملة للتعلم والعمل المستقل</title>
        <meta name="description" content="علي للأعمال - منصة شاملة للتعلم والعمل المستقل، تقدم دورات تعليمية، سوق خدمات، وفرص عمل بين أصحاب الأعمال والمستقلين" />
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <Features />
        <CoursePreview />
        <FreelancerShowcase />
        <MarketplacePreview />
        <JobPreview />
        <BookPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
