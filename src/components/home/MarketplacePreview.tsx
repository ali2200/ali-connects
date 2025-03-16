
import React from 'react';
import { Star, Check } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import CustomButton from '../ui/CustomButton';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'إدارة احترافية لوسائل التواصل الاجتماعي',
    description: 'إدارة كاملة لوسائل التواصل الاجتماعي لعملك بما في ذلك إنشاء المحتوى والجدولة والتفاعل.',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=2074&auto=format&fit=crop',
    sellerName: 'خبراء النمو الرقمي',
    sellerImage: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 4.9,
    reviews: 183,
    price: '$299',
    tags: ['وسائل التواصل', 'محتوى'],
    features: ['5 منصات', 'نشر يومي', 'تفاعل', 'تحليلات'],
    delay: 0,
  },
  {
    id: 2,
    title: 'حزمة تحسين محركات البحث',
    description: 'تحسين شامل لمحركات البحث لتحسين ترتيب موقع الويب الخاص بك وجذب حركة المرور العضوية.',
    image: 'https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?q=80&w=2070&auto=format&fit=crop',
    sellerName: 'بروز SEO',
    sellerImage: 'https://randomuser.me/api/portraits/men/46.jpg',
    rating: 4.8,
    reviews: 127,
    price: '$349',
    tags: ['SEO', 'موقع الكتروني'],
    features: ['بحث الكلمات المفتاحية', 'تحسين الصفحات', 'بناء الروابط', 'تقرير شهري'],
    delay: 150,
  },
  {
    id: 3,
    title: 'حملة تسويق عبر البريد الإلكتروني',
    description: 'حملات بريد إلكتروني استراتيجية مصممة لإشراك جمهورك، ورعاية العملاء المحتملين، وتعزيز التحويلات.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop',
    sellerName: 'خبراء البريد الإلكتروني',
    sellerImage: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 4.7,
    reviews: 95,
    price: '$249',
    tags: ['بريد إلكتروني', 'تسويق'],
    features: ['إنشاء استراتيجية', 'تصميم قوالب', 'إعداد التشغيل الآلي', 'تحليلات'],
    delay: 300,
  },
];

const MarketplacePreview = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-right mb-6 md:mb-0">
            <h2 className="heading-md text-gray-900 mb-4">
              خدمات تسويق احترافية
            </h2>
            <p className="subtitle text-gray-600 max-w-2xl">
              تصفح واشتر خدمات تسويقية عالية الجودة من محترفين معتمدين لتنمية عملك.
            </p>
          </div>
          <Link to="/marketplace">
            <CustomButton variant="outline">
              استكشف السوق
            </CustomButton>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <AnimatedCard
              key={service.id}
              delay={service.delay}
              className="h-full marketplace-card p-0 flex flex-col overflow-hidden"
              hoverEffect="none"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex space-x-0 space-x-reverse space-x-2">
                  {service.tags.map((tag, index) => (
                    <span key={index} className="bg-white/90 backdrop-blur-sm text-ali-blue text-xs font-medium px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-4">
                  <img
                    src={service.sellerImage}
                    alt={service.sellerName}
                    className="w-10 h-10 rounded-full ml-3 object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.sellerName}</p>
                    <div className="flex items-center">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="mx-1 text-xs text-gray-900">{service.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({service.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <div className="mt-auto">
                  <div className="mb-4 grid grid-cols-2 gap-x-2 gap-y-1">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 ml-1" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                    <div className="text-lg font-bold text-ali-blue">
                      {service.price}
                      <span className="text-xs font-normal text-gray-500 mr-1">/ شهرياً</span>
                    </div>
                    <Link to={`/marketplace/${service.id}`}>
                      <CustomButton size="sm">
                        عرض التفاصيل
                      </CustomButton>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
