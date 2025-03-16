
import React from 'react';
import { BookOpen, ShoppingBag, Users, MessageSquare, Award, Shield } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';

const features = [
  {
    title: 'تعليم من الخبراء',
    description: 'الوصول إلى دورات عالية الجودة وبرامج تعليمية وشهادات لإتقان مهارات التسويق الرقمي.',
    icon: BookOpen,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    delay: 0,
  },
  {
    title: 'سوق الخدمات',
    description: 'ابحث واشتري خدمات تسويقية من محترفين معتمدين مع نظام دفع آمن وموثوق.',
    icon: ShoppingBag,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    delay: 100,
  },
  {
    title: 'شبكة المستقلين',
    description: 'تواصل مع خبراء تسويق ماهرين لتلبية احتياجات عملك المحددة.',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    delay: 200,
  },
  {
    title: 'إدارة المشاريع',
    description: 'أدر مشاريعك التسويقية مع دردشة متكاملة ومشاركة الملفات وتتبع المهام.',
    icon: MessageSquare,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    delay: 300,
  },
  {
    title: 'الشهادات المعتمدة',
    description: 'احصل على شهادات معترف بها لإثبات خبرتك ومهاراتك في مجال التسويق.',
    icon: Award,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    delay: 400,
  },
  {
    title: 'معاملات آمنة',
    description: 'استمتع براحة البال مع نظام الدفع الآمن وحل النزاعات بشكل فعال.',
    icon: Shield,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
    delay: 500,
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-md text-gray-900 mb-4">
            كل ما تحتاجه للنجاح في التسويق
          </h2>
          <p className="subtitle text-gray-600">
            تجمع منصتنا بين التعليم والخدمات والأدوات الذكية لمساعدة عملك 
            على الازدهار في البيئة الرقمية.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedCard 
              key={index} 
              delay={feature.delay}
              className="h-full flex flex-col"
            >
              <div className={`${feature.bgColor} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-5`}>
                <feature.icon className={`${feature.color} w-5 h-5`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
