
import React from 'react';
import { Star, Clock, BookOpen, Book } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import CustomButton from '../ui/CustomButton';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const books = [
  {
    id: 1,
    title: 'أساسيات التسويق الرقمي',
    description: 'كتاب شامل يغطي كافة جوانب التسويق الرقمي من البداية إلى الاحتراف.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
    author: 'د. محمد الحربي',
    rating: 4.8,
    reviews: 182,
    pages: 320,
    price: '$29',
    category: 'تسويق رقمي',
    delay: 0,
  },
  {
    id: 2,
    title: 'البرمجة بلغة بايثون للمبتدئين',
    description: 'دليل عملي لتعلم لغة بايثون من الصفر مع تطبيقات عملية ومشاريع كاملة.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop',
    author: 'م. سمير الخالدي',
    rating: 4.7,
    reviews: 156,
    pages: 280,
    price: '$25',
    category: 'برمجة',
    delay: 150,
  },
  {
    id: 3,
    title: 'التصميم الجرافيكي الاحترافي',
    description: 'كتاب مرجعي للمصممين يشرح أساسيات التصميم وأحدث التقنيات والأدوات.',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2030&auto=format&fit=crop',
    author: 'أ. نورة القحطاني',
    rating: 4.9,
    reviews: 210,
    pages: 350,
    price: '$32',
    category: 'تصميم',
    delay: 300,
  },
  {
    id: 4,
    title: 'إدارة المشاريع باحترافية',
    description: 'دليل عملي حول أفضل ممارسات إدارة المشاريع وتطبيق المنهجيات الحديثة.',
    image: 'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=1974&auto=format&fit=crop',
    author: 'د. فيصل العمري',
    rating: 4.6,
    reviews: 135,
    pages: 290,
    price: '$27',
    category: 'إدارة أعمال',
    delay: 450,
  },
];

const BookPreview = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-right mb-6 md:mb-0">
            <h2 className="heading-md text-gray-900 mb-4">
              مكتبة الكتب الإلكترونية
            </h2>
            <p className="subtitle text-gray-600 max-w-2xl">
              اكتشف مجموعة متنوعة من الكتب في مختلف المجالات لتطوير مهاراتك وتوسيع آفاق معرفتك.
            </p>
          </div>
          <Link to="/books">
            <CustomButton variant="outline">
              عرض جميع الكتب
            </CustomButton>
          </Link>
        </div>
        
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <AnimatedCard
              key={book.id}
              delay={book.delay}
              className="h-full flex flex-col overflow-hidden p-0 hover:shadow-card-hover"
              hoverEffect="none"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-ali-blue text-xs font-medium px-2.5 py-1 rounded-full">
                    {book.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="mx-1 text-sm font-medium text-gray-900">{book.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({book.reviews} تقييم)</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{book.description}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Book className="w-4 h-4 ml-1" />
                      {book.pages} صفحة
                    </div>
                    <div className="mr-auto">
                      <span className="text-lg font-bold text-ali-blue">{book.price}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500">المؤلف:</span>
                      <span className="mr-1 text-gray-900 font-medium">{book.author}</span>
                    </div>
                    <Link to={`/books/${book.id}`}>
                      <CustomButton size="sm" variant="ghost" className="text-ali-blue hover:bg-ali-blue/10">
                        عرض الكتاب
                      </CustomButton>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        {/* عرض الكتب في منصة متحركة للشاشات الصغيرة */}
        <div className="block md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {books.map((book) => (
                <CarouselItem key={book.id} className="basis-full sm:basis-1/2">
                  <AnimatedCard
                    delay={0}
                    className="h-full flex flex-col overflow-hidden p-0 hover:shadow-card-hover mx-2"
                    hoverEffect="none"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="inline-block bg-white/90 backdrop-blur-sm text-ali-blue text-xs font-medium px-2.5 py-1 rounded-full">
                          {book.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{book.description}</p>
                      
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="mx-1 text-sm font-medium text-gray-900">{book.rating}</span>
                          </div>
                          <div>
                            <span className="text-lg font-bold text-ali-blue">{book.price}</span>
                          </div>
                        </div>
                        
                        <Link to={`/books/${book.id}`} className="w-full">
                          <CustomButton size="sm" className="w-full">
                            عرض الكتاب
                          </CustomButton>
                        </Link>
                      </div>
                    </div>
                  </AnimatedCard>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="static transform-none mx-2" />
              <CarouselNext className="static transform-none mx-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default BookPreview;
