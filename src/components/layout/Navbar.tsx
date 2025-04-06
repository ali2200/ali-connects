
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  
  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Check if the link matches current location
  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-inset ${
        scrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              علي
              <span className="text-ali-blue">.</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0 space-x-reverse space-x-5">
            <Link 
              to="/" 
              className={`relative px-1.5 py-1 transition-colors ${
                isActive('/') 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الرئيسية
              {isActive('/') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ali-blue"></span>}
            </Link>
            
            <Link 
              to="/courses" 
              className={`relative px-1.5 py-1 transition-colors ${
                isActive('/courses') 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الدورات
              {isActive('/courses') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ali-blue"></span>}
            </Link>
            
            <Link 
              to="/marketplace" 
              className={`relative px-1.5 py-1 transition-colors ${
                isActive('/marketplace') 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              سوق الخدمات
              {isActive('/marketplace') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ali-blue"></span>}
            </Link>
            
            <Link 
              to="/jobs" 
              className={`relative px-1.5 py-1 transition-colors ${
                isActive('/jobs') 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الوظائف
              {isActive('/jobs') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ali-blue"></span>}
            </Link>
            
            <Link 
              to="/books" 
              className={`relative px-1.5 py-1 transition-colors ${
                isActive('/books') 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الكتب
              {isActive('/books') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ali-blue"></span>}
            </Link>
            
            <Link 
              to="/about" 
              className={`relative px-1.5 py-1 transition-colors ${
                isActive('/about') 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              من نحن
              {isActive('/about') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ali-blue"></span>}
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-0 space-x-reverse space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 space-x-reverse bg-gray-100 rounded-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition">
                  <span>حسابي</span>
                  <ChevronDown size={16} />
                </button>
                
                <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link 
                      to="/dashboard/freelancer" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      لوحة التحكم
                    </Link>
                    <Link 
                      to="/dashboard/freelancer/proposals" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      عروضي المقدمة
                    </Link>
                    <Link 
                      to="/dashboard/client/manage-jobs" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      إدارة المشاريع
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      الإعدادات
                    </Link>
                    <button 
                      onClick={() => supabase.auth.signOut()}
                      className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <CustomButton variant="outline" size="sm">
                    دخول
                  </CustomButton>
                </Link>
                <Link to="/register">
                  <CustomButton size="sm">
                    التسجيل
                  </CustomButton>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <div className="flex flex-col px-4 py-4">
            <Link 
              to="/" 
              className={`py-2 ${isActive('/') ? 'text-ali-blue font-medium' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              to="/courses" 
              className={`py-2 ${isActive('/courses') ? 'text-ali-blue font-medium' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              الدورات
            </Link>
            <Link 
              to="/marketplace" 
              className={`py-2 ${isActive('/marketplace') ? 'text-ali-blue font-medium' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              سوق الخدمات
            </Link>
            <Link 
              to="/jobs" 
              className={`py-2 ${isActive('/jobs') ? 'text-ali-blue font-medium' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              الوظائف
            </Link>
            <Link 
              to="/books" 
              className={`py-2 ${isActive('/books') ? 'text-ali-blue font-medium' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              الكتب
            </Link>
            <Link 
              to="/about" 
              className={`py-2 ${isActive('/about') ? 'text-ali-blue font-medium' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              من نحن
            </Link>
            
            <div className="border-t border-gray-200 mt-2 pt-2">
              {user ? (
                <>
                  <Link 
                    to="/dashboard/freelancer" 
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    لوحة التحكم
                  </Link>
                  <Link 
                    to="/dashboard/freelancer/proposals" 
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    عروضي المقدمة
                  </Link>
                  <Link 
                    to="/dashboard/client/manage-jobs" 
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    إدارة المشاريع
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    الإعدادات
                  </Link>
                  <button 
                    onClick={() => {
                      supabase.auth.signOut();
                      setIsMenuOpen(false);
                    }}
                    className="block py-2 text-red-600"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 mt-2">
                  <Link 
                    to="/login" 
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CustomButton variant="outline" isFullWidth>
                      دخول
                    </CustomButton>
                  </Link>
                  <Link 
                    to="/register" 
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CustomButton isFullWidth>
                      التسجيل
                    </CustomButton>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
