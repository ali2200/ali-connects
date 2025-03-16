
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-ali-blue">
              Ali<span className="text-gray-800">for</span>Business
            </h3>
            <p className="text-gray-600 max-w-xs">
              A comprehensive platform connecting businesses with marketing experts, 
              providing education, marketplace, and smart assistance.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-ali-blue transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-ali-blue transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-ali-blue transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-ali-blue transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Courses', 'Marketplace', 'Find Freelancers', 'Blog', 'Contact'].map(item => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 hover:text-ali-blue transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Services</h4>
            <ul className="space-y-2">
              {[
                'Digital Marketing', 
                'Social Media Management', 
                'Content Creation', 
                'SEO Optimization', 
                'Brand Development', 
                'Marketing Strategy',
                'Analytics & Reporting'
              ].map(item => (
                <li key={item}>
                  <Link 
                    to={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 hover:text-ali-blue transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 text-ali-blue shrink-0 mr-3" />
                <span className="text-gray-600">
                  123 Business Avenue, Suite 200<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-ali-blue shrink-0 mr-3" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-ali-blue transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-ali-blue shrink-0 mr-3" />
                <a href="mailto:contact@aliforbusiness.com" className="text-gray-600 hover:text-ali-blue transition-colors">
                  contact@aliforbusiness.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Ali for Business. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-ali-blue transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-sm text-gray-500 hover:text-ali-blue transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-sm text-gray-500 hover:text-ali-blue transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
