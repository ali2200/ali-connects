
import React from 'react';
import { Star, VerifiedIcon } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import CustomButton from '../ui/CustomButton';
import { Link } from 'react-router-dom';

const freelancers = [
  {
    id: 1,
    name: 'منى العمري',
    title: 'استراتيجية وسائل التواصل الاجتماعي',
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
    rating: 4.9,
    reviews: 127,
    projects: 98,
    skills: ['وسائل التواصل', 'إنشاء المحتوى', 'إدارة الحملات', 'تحليلات'],
    description: 'استراتيجية وسائل تواصل اجتماعي ذات خبرة تساعد الشركات على تنمية وجودها وتفاعلها عبر الإنترنت.',
    verified: true,
    delay: 0,
  },
  {
    id: 2,
    name: 'محمد القحطاني',
    title: 'متخصص SEO',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
    rating: 4.8,
    reviews: 93,
    projects: 76,
    skills: ['SEO', 'بحث الكلمات المفتاحية', 'بناء الروابط', 'تحليلات جوجل'],
    description: 'خبير SEO مع سجل حافل في زيادة حركة المرور العضوية وتحسين تصنيفات البحث.',
    verified: true,
    delay: 150,
  },
  {
    id: 3,
    name: 'سارة العتيبي',
    title: 'خبيرة تسويق المحتوى',
    image: 'https://randomuser.me/api/portraits/women/36.jpg',
    rating: 4.7,
    reviews: 85,
    projects: 64,
    skills: ['استراتيجية المحتوى', 'كتابة', 'مدونات', 'البريد الإلكتروني'],
    description: 'مسوقة محتوى مبدعة متخصصة في سرد القصص الجذابة التي تحول القراء إلى عملاء.',
    verified: false,
    delay: 300,
  },
  {
    id: 4,
    name: 'يوسف المالكي',
    title: 'متخصص PPC وإعلانات جوجل',
    image: 'https://randomuser.me/api/portraits/men/29.jpg',
    rating: 4.9,
    reviews: 113,
    projects: 82,
    skills: ['إعلانات جوجل', 'إعلانات فيسبوك', 'تحسين الحملات', 'تتبع التحويل'],
    description: 'خبير PPC يركز على النتائج يساعد الشركات على تحقيق أقصى عائد من خلال حملات إعلانية مستهدفة.',
    verified: true,
    delay: 450,
  },
];

const FreelancerShowcase = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-right mb-6 md:mb-0">
            <h2 className="heading-md text-gray-900 mb-4">
              تواصل مع أفضل مواهب التسويق
            </h2>
            <p className="subtitle text-gray-600 max-w-2xl">
              ابحث وقم بتوظيف محترفي تسويق مهرة ذوي خبرة مثبتة لمساعدة عملك على النجاح.
            </p>
          </div>
          <Link to="/freelancers">
            <CustomButton variant="outline">
              تصفح جميع المستقلين
            </CustomButton>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {freelancers.map((freelancer) => (
            <Link to={`/freelancers/${freelancer.id}`} key={freelancer.id} className="block h-full">
              <AnimatedCard
                delay={freelancer.delay}
                className="h-full flex flex-col cursor-pointer"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="relative mb-3">
                    <img 
                      src={freelancer.image} 
                      alt={freelancer.name} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    {freelancer.verified && (
                      <div className="absolute bottom-0 right-0 bg-ali-blue text-white rounded-full p-1">
                        <VerifiedIcon className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900">
                    {freelancer.name}
                    {freelancer.verified && (
                      <span className="mr-1 inline-flex items-center text-xs font-medium text-ali-blue">
                        <VerifiedIcon className="w-3 h-3 ml-0.5" />
                        موثق
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">{freelancer.title}</p>
                  
                  <div className="flex items-center justify-center mt-2">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="mx-1 text-sm font-medium text-gray-900">{freelancer.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({freelancer.reviews} تقييم)</span>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <p className="text-xs text-gray-600 mb-3">{freelancer.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {freelancer.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {freelancer.skills.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                        +{freelancer.skills.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-600">
                      <span className="font-medium text-gray-900">{freelancer.projects}</span> مشروع
                    </div>
                    <div className="pointer-events-none">
                      <CustomButton size="sm" variant="outline">
                        عرض الملف
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreelancerShowcase;
