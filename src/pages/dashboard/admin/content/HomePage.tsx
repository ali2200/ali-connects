
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';

// Import the extracted section components
import HeroSection from '@/components/admin/content/HeroSection';
import FeaturesSection from '@/components/admin/content/FeaturesSection';
import CoursesSection from '@/components/admin/content/CoursesSection';
import CTASection from '@/components/admin/content/CTASection';

const HomePageContent = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'منصة علي للأعمال الحرة والتعليم عن بعد',
    subtitle: 'منصة متكاملة تجمع المستقلين وأصحاب الأعمال والمحاضرين في مكان واحد',
    ctaText: 'انضم إلينا الآن',
    imageUrl: '/hero-image.jpg'
  });
  
  const [featuresContent, setFeaturesContent] = useState({
    mainTitle: 'المميزات الرئيسية',
    features: [
      {
        id: 1,
        title: 'العمل الحر',
        description: 'ابحث عن أفضل المستقلين أو قدم خدماتك واكسب المال',
        icon: 'briefcase'
      },
      {
        id: 2,
        title: 'التعليم عن بعد',
        description: 'دورات تعليمية متنوعة لتطوير مهاراتك وآفاقك المهنية',
        icon: 'book'
      },
      {
        id: 3,
        title: 'سوق الخدمات',
        description: 'تصفح آلاف الخدمات من المستقلين المحترفين',
        icon: 'shopping-bag'
      }
    ]
  });
  
  const [coursesContent, setCoursesContent] = useState({
    title: 'أحدث الدورات التعليمية',
    subtitle: 'استكشف أحدث الدورات التعليمية في مختلف المجالات',
    count: 3,
    showPopular: true
  });
  
  const [ctaContent, setCtaContent] = useState({
    title: 'انضم إلى مجتمع منصة علي اليوم',
    subtitle: 'سجل الآن واستفد من جميع الخدمات والمميزات التي تقدمها منصة علي',
    freelancerButtonText: 'انضم كمستقل',
    clientButtonText: 'انضم كصاحب عمل',
    imageUrl: '/placeholder.svg'
  });
  
  return (
    <>
      <Helmet>
        <title>إدارة محتوى الصفحة الرئيسية | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="إدارة محتوى الصفحة الرئيسية">
        <div className="mb-4">
          <Button variant="outline" asChild>
            <Link to="/dashboard/admin/settings">
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة للإعدادات
            </Link>
          </Button>
        </div>
        
        <div className="space-y-6">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="mb-6 w-full max-w-xl mx-auto grid grid-cols-1 md:grid-cols-4 h-auto">
              <TabsTrigger value="hero" className="py-2">
                قسم الترحيب
              </TabsTrigger>
              <TabsTrigger value="features" className="py-2">
                المميزات
              </TabsTrigger>
              <TabsTrigger value="courses" className="py-2">
                الدورات
              </TabsTrigger>
              <TabsTrigger value="cta" className="py-2">
                دعوة للإنضمام
              </TabsTrigger>
            </TabsList>
            
            {/* قسم الترحيب */}
            <TabsContent value="hero">
              <HeroSection 
                heroContent={heroContent} 
                setHeroContent={setHeroContent} 
              />
            </TabsContent>
            
            {/* قسم المميزات */}
            <TabsContent value="features">
              <FeaturesSection 
                featuresContent={featuresContent} 
                setFeaturesContent={setFeaturesContent} 
              />
            </TabsContent>
            
            {/* قسم الدورات */}
            <TabsContent value="courses">
              <CoursesSection 
                coursesContent={coursesContent} 
                setCoursesContent={setCoursesContent} 
              />
            </TabsContent>
            
            {/* قسم دعوة للإنضمام */}
            <TabsContent value="cta">
              <CTASection 
                ctaContent={ctaContent} 
                setCtaContent={setCtaContent} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default HomePageContent;
