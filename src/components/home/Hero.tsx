
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
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
          <div className="lg:col-span-3 text-center lg:text-left">
            <div className="inline-block animate-fade-in">
              <span className="inline-flex items-center rounded-full bg-ali-blue/10 px-3 py-1 text-sm font-medium text-ali-blue ring-1 ring-inset ring-ali-blue/20">
                New Platform
              </span>
            </div>
            
            <h1 className="mt-6 heading-lg text-gray-900 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Connect with Top Marketing Talent for Your Business
            </h1>
            
            <p className="mt-6 subtitle max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Ali for Business connects you with skilled marketing professionals,
              provides educational resources, and offers smart assistance to help 
              your business grow in the digital landscape.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Link to="/register">
                <Button size="lg" rightIcon={<ArrowRight className="ml-1" />}>
                  Get Started
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="outline">
                  Explore Services
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <p className="text-sm text-gray-500 mb-3">Trusted by companies worldwide</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {['Google', 'Microsoft', 'Adobe', 'Shopify', 'Slack'].map((company) => (
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
                  <div className="text-white text-xs font-medium">Ali Smart Assistant</div>
                </div>
                <div className="p-6 bg-white/80">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">AI</span>
                      </div>
                      <div className="ml-3 bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2">
                        <p className="text-sm text-gray-800">Hello! How can I help your business today?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="ml-auto bg-ali-blue text-white rounded-2xl rounded-tr-none px-4 py-2">
                        <p className="text-sm">I need help with social media marketing</p>
                      </div>
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ml-3">
                        <span className="text-gray-500 text-xs">You</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">AI</span>
                      </div>
                      <div className="ml-3 bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2">
                        <p className="text-sm text-gray-800">I'll connect you with our top social media experts. Would you like to see available services or freelancer profiles?</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-ali-blue hover:text-ali-blue transition-colors">
                        Show services
                      </button>
                      <button className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-ali-blue hover:text-ali-blue transition-colors">
                        Show freelancers
                      </button>
                      <button className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-ali-blue hover:text-ali-blue transition-colors">
                        Learn more
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
