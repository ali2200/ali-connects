
import React from 'react';
import { Star, Clock, BookOpen } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import CustomButton from '../ui/CustomButton';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'إتقان التسويق عبر وسائل التواصل الاجتماعي',
    description: 'تعلم كيفية إنشاء استراتيجيات وحملات وسائل التواصل الاجتماعي الفعالة لنمو الأعمال.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
    instructor: 'سارة الجوهري',
    rating: 4.9,
    reviews: 245,
    duration: '12 ساعة',
    lessons: 54,
    price: '$99',
    category: 'وسائل التواصل',
    delay: 0,
  },
  {
    id: 2,
    title: 'أساسيات واستراتيجية تحسين محركات البحث',
    description: 'إتقان تقنيات تحسين محركات البحث لتوجيه حركة المرور العضوية إلى موقع الويب الخاص بك.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop',
    instructor: 'أحمد الشمري',
    rating: 4.8,
    reviews: 189,
    duration: '10 ساعات',
    lessons: 42,
    price: '$89',
    category: 'SEO',
    delay: 150,
  },
  {
    id: 3,
    title: 'التميز في تسويق المحتوى',
    description: 'إنشاء محتوى جذاب يجذب جمهورك ويدفع التحويل.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    instructor: 'منى العتيبي',
    rating: 4.7,
    reviews: 163,
    duration: '8 ساعات',
    lessons: 36,
    price: '$79',
    category: 'محتوى',
    delay: 300,
  },
];

const CoursePreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-right mb-6 md:mb-0">
            <h2 className="heading-md text-gray-900 mb-4">
              طور مهاراتك التسويقية
            </h2>
            <p className="subtitle text-gray-600 max-w-2xl">
              الوصول إلى الدورات التدريبية والشهادات التي يقودها الخبراء لإتقان أحدث استراتيجيات وأدوات التسويق الرقمي.
            </p>
          </div>
          <Link to="/courses">
            <CustomButton variant="outline">
              عرض جميع الدورات
            </CustomButton>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <AnimatedCard
              key={course.id}
              delay={course.delay}
              className="h-full flex flex-col overflow-hidden p-0 hover:shadow-card-hover"
              hoverEffect="none"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-ali-blue text-xs font-medium px-2.5 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="mx-1 text-sm font-medium text-gray-900">{course.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({course.reviews} تقييم)</span>
                  <div className="mr-auto flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 ml-1" />
                    {course.duration}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <BookOpen className="w-4 h-4 ml-1" />
                      {course.lessons} درس
                    </div>
                    <div className="mr-auto">
                      <span className="text-lg font-bold text-ali-blue">{course.price}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500">المدرب:</span>
                      <span className="mr-1 text-gray-900 font-medium">{course.instructor}</span>
                    </div>
                    <Link to={`/courses/${course.id}`}>
                      <CustomButton size="sm" variant="ghost" className="text-ali-blue hover:bg-ali-blue/10">
                        عرض الدورة
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

export default CoursePreview;
