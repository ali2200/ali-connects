
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: 'الرئيسية', path: '/' },
    { 
      name: 'الدورات والتدريب', 
      path: '/courses',
      submenu: [
        { name: 'جميع الدورات', path: '/courses' },
        { name: 'الشهادات والإختبارات', path: '/certifications' },
        { name: 'مسارات التعلم', path: '/learning-paths' }
      ]
    },
    { 
      name: 'سوق الخدمات', 
      path: '/marketplace',
      submenu: [
        { name: 'تصفح الخدمات', path: '/marketplace' },
        { name: 'إدارة الطلبات', path: '/marketplace/orders' },
      ]
    },
    { name: 'ابحث عن مستقل', path: '/freelancers' },
    { 
      name: 'من نحن', 
      path: '/about',
      submenu: [
        { name: 'عن المنصة', path: '/about' },
        { name: 'تواصل معنا', path: '/contact' },
        { name: 'الأسئلة الشائعة', path: '/faq' },
        { name: 'شروط الإستخدام', path: '/terms' },
        { name: 'المدونة', path: '/blog' },
      ]
    },
  ];
  
  return (
    <nav 
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isScrolled || isOpen ? 'glass shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo - Now positioned on the right side for RTL */}
          <div className="order-2 md:order-1">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-ali-blue">
                علي<span className="text-gray-800">للأعمال</span>
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation - In the middle */}
          <div className="hidden md:flex order-1 md:order-2 items-center justify-center flex-grow">
            <div className="flex items-center space-x-8 space-x-reverse">
              {navItems.map((item) => (
                item.submenu ? (
                  <div key={item.name} className="relative group">
                    <button className="flex items-center text-gray-700 hover:text-ali-blue transition-colors">
                      {item.name}
                      <ChevronDown className="mr-1 h-4 w-4" />
                    </button>
                    <div className="absolute top-full right-0 transform -translate-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 min-w-[200px] glass rounded-lg shadow-lg mt-2 py-2 z-50 bg-white/90">
                      {item.submenu.map((subitem) => (
                        <Link 
                          key={subitem.name}
                          to={subitem.path}
                          className="block px-4 py-2 hover:bg-white/60 text-gray-700 hover:text-ali-blue transition-colors text-right"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className="text-gray-700 hover:text-ali-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          
          {/* Authentication Buttons - Now positioned on the left */}
          <div className="md:flex hidden order-3 items-center space-x-4 space-x-reverse">
            <Link to="/register">
              <CustomButton variant="primary" size="sm">
                إنشاء حساب
              </CustomButton>
            </Link>
            <Link to="/login">
              <CustomButton variant="ghost" size="sm">
                تسجيل الدخول
              </CustomButton>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden order-3 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 glass-card">
            <div className="flex flex-col space-y-3 px-2">
              {navItems.map((item) => (
                <React.Fragment key={item.name}>
                  {item.submenu ? (
                    <div className="space-y-2">
                      <div className="font-medium px-3 py-2 text-right">
                        {item.name}
                      </div>
                      <div className="pr-4 border-r-2 border-gray-200 mr-3 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link 
                            key={subitem.name}
                            to={subitem.path}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-ali-blue transition-colors text-right"
                            onClick={() => setIsOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      to={item.path}
                      className="block px-3 py-2 hover:bg-white/60 rounded-lg text-right"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </React.Fragment>
              ))}
              
              <div className="pt-4 mt-2 border-t border-gray-200">
                <div className="flex flex-col space-y-3 px-3">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <CustomButton variant="outline" isFullWidth>تسجيل الدخول</CustomButton>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <CustomButton variant="primary" isFullWidth>إنشاء حساب</CustomButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
