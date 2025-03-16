
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
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
    { name: 'Home', path: '/' },
    { 
      name: 'Courses & Training', 
      path: '/courses',
      submenu: [
        { name: 'All Courses', path: '/courses' },
        { name: 'Certifications', path: '/certifications' },
        { name: 'Learning Paths', path: '/learning-paths' }
      ]
    },
    { name: 'Service Marketplace', path: '/marketplace' },
    { name: 'Find a Freelancer', path: '/freelancers' },
    { name: 'Blog', path: '/blog' },
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
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-ali-blue">
              Ali<span className="text-gray-800">for</span>Business
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.name} className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-ali-blue transition-colors">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 transform -translate-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 min-w-[200px] glass rounded-lg shadow-lg mt-2 py-2">
                    {item.submenu.map((subitem) => (
                      <Link 
                        key={subitem.name}
                        to={subitem.path}
                        className="block px-4 py-2 hover:bg-white/60 text-gray-700 hover:text-ali-blue transition-colors"
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
          
          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
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
                      <div className="font-medium px-3 py-2">
                        {item.name}
                      </div>
                      <div className="pl-4 border-l-2 border-gray-200 ml-3 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link 
                            key={subitem.name}
                            to={subitem.path}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-ali-blue transition-colors"
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
                      className="block px-3 py-2 hover:bg-white/60 rounded-lg"
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
                    <Button variant="outline" isFullWidth>Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" isFullWidth>Sign Up</Button>
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
