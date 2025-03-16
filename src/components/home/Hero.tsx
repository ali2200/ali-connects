
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const moveX = 15 - x * 30;
      const moveY = 15 - y * 30;
      
      const elements = heroRef.current.querySelectorAll('.hero-float');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '1');
        (el as HTMLElement).style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div ref={heroRef} className="relative overflow-hidden pt-24 pb-20 md:pb-32 lg:pt-32 lg:pb-40">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-float absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-ali-blue opacity-10 blur-3xl" data-speed="0.5"></div>
        <div className="hero-float absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-ali-purple opacity-10 blur-3xl" data-speed="0.8"></div>
        <div className="hero-float absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-ali-light-blue opacity-10 blur-3xl" data-speed="0.7"></div>
      </div>
      
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 text-center lg:text-right">
            <div className="inline-block animate-fade-in">
              <span className="inline-flex items-center rounded-full bg-ali-blue/10 px-3 py-1 text-sm font-medium text-ali-blue ring-1 ring-inset ring-ali-blue/20">
                منصة جديدة
              </span>
            </div>
            
            <h1 className="mt-6 heading-lg text-gray-900 animate-fade-in" style={{ animationDelay: '100ms' }}>
              تواصل مع أفضل خبراء التسويق لعملك
            </h1>
            
            <p className="mt-6 subtitle max-w-xl mx-auto lg:mr-0 lg:ml-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              علي للأعمال يربطك بمحترفي التسويق المهرة،
              ويوفر موارد تعليمية، ويقدم مساعدة ذكية لمساعدة 
              عملك على النمو في البيئة الرقمية.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Link to="/register">
                <CustomButton size="lg" rightIcon={<ArrowRight className="mr-1 rotate-180" />}>
                  ابدأ الآن
                </CustomButton>
              </Link>
              <Link to="/marketplace">
                <CustomButton size="lg" variant="outline">
                  استكشف الخدمات
                </CustomButton>
              </Link>
            </div>
            
            <div className="mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <p className="text-sm text-gray-500 mb-3">موثوق به من قبل شركات في جميع أنحاء العالم</p>
              <div className="flex flex-wrap justify-center lg:justify-end gap-6">
                {['جوجل', 'مايكروسوفت', 'أدوبي', 'شوبيفاي', 'سلاك'].map((company) => (
                  <div key={company} className="text-gray-400 font-semibold">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 relative animate-fade-in-left" style={{ animationDelay: '300ms' }}>
            <div className="relative w-full h-full">
              <div className="absolute -right-4 -top-4 w-full h-full rounded-2xl border-2 border-ali-blue/20 -z-10" />
              <div className="glass rounded-2xl shadow-card overflow-hidden">
                <div className="bg-ali-blue py-3 px-4 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-white text-xs font-medium mr-2">المساعد الذكي علي</div>
                </div>
                <div className="p-6 bg-white/80">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">AI</span>
                      </div>
                      <div className="mr-3 bg-gray-100 rounded-2xl rounded-tr-none px-4 py-2">
                        <p className="text-sm text-gray-800">مرحباً! كيف يمكنني مساعدة عملك اليوم؟</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-auto bg-ali-blue text-white rounded-2xl rounded-tl-none px-4 py-2">
                        <p className="text-sm">أحتاج مساعدة في التسويق عبر وسائل التواصل الاجتماعي</p>
                      </div>
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-gray-500 text-xs">أنت</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">AI</span>
                      </div>
                      <div className="mr-3 bg-gray-100 rounded-2xl rounded-tr-none px-4 py-2">
                        <p className="text-sm text-gray-800">سأقوم بتوصيلك بأفضل خبراء وسائل التواصل الاجتماعي لدينا. هل ترغب في رؤية الخدمات المتاحة أو ملفات المستقلين؟</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-ali-blue hover:text-ali-blue transition-colors">
                        عرض الخدمات
                      </button>
                      <button className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-ali-blue hover:text-ali-blue transition-colors mx-2">
                        عرض المستقلين
                      </button>
                      <button className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-ali-blue hover:text-ali-blue transition-colors">
                        معرفة المزيد
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
