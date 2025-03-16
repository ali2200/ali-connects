
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
              علي<span className="text-gray-800">للأعمال</span>
            </h3>
            <p className="text-gray-600 max-w-xs">
              منصة شاملة تربط الشركات بخبراء التسويق، 
              وتوفر التعليم والسوق والمساعدة الذكية.
            </p>
            <div className="flex space-x-0 space-x-reverse space-x-4">
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
            <h4 className="text-lg font-semibold mb-4 text-gray-800">روابط سريعة</h4>
            <ul className="space-y-2">
              {['الرئيسية', 'من نحن', 'الدورات', 'السوق', 'ابحث عن مستقلين', 'المدونة', 'اتصل بنا'].map(item => (
                <li key={item} className="text-right">
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
            <h4 className="text-lg font-semibold mb-4 text-gray-800">الخدمات</h4>
            <ul className="space-y-2">
              {[
                'التسويق الرقمي', 
                'إدارة وسائل التواصل الاجتماعي', 
                'إنشاء المحتوى', 
                'تحسين محركات البحث', 
                'تطوير العلامة التجارية', 
                'استراتيجية التسويق',
                'التحليلات والتقارير'
              ].map(item => (
                <li key={item} className="text-right">
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
            <h4 className="text-lg font-semibold mb-4 text-gray-800">اتصل بنا</h4>
            <ul className="space-y-3 text-right">
              <li className="flex flex-row-reverse">
                <MapPin className="h-5 w-5 text-ali-blue shrink-0 mr-3" />
                <span className="text-gray-600">
                  شارع الأعمال 123، جناح 200<br />
                  الرياض، المملكة العربية السعودية
                </span>
              </li>
              <li className="flex items-center flex-row-reverse">
                <Phone className="h-5 w-5 text-ali-blue shrink-0 mr-3" />
                <a href="tel:+9665012345678" className="text-gray-600 hover:text-ali-blue transition-colors">
                  +966 50 1234 5678
                </a>
              </li>
              <li className="flex items-center flex-row-reverse">
                <Mail className="h-5 w-5 text-ali-blue shrink-0 mr-3" />
                <a href="mailto:contact@aliforamal.com" className="text-gray-600 hover:text-ali-blue transition-colors">
                  contact@aliforamal.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} علي للأعمال. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-0 space-x-reverse space-x-6">
              <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-ali-blue transition-colors">
                سياسة الخصوصية
              </Link>
              <Link to="/terms-of-service" className="text-sm text-gray-500 hover:text-ali-blue transition-colors mr-6">
                شروط الخدمة
              </Link>
              <Link to="/accessibility" className="text-sm text-gray-500 hover:text-ali-blue transition-colors mr-6">
                إمكانية الوصول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
