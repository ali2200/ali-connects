import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, User, Star, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
  return (
    <>
      <Helmet>
        <title>الدورات التدريبية | علي للأعمال</title>
        <meta name="description" content="استكشف دورات تدريبية احترافية لتطوير مهاراتك في مجال العمل الحر والأعمال الرقمية" />
      </Helmet>
      <Navbar />
      <main>
        {/* قسم الهيدر */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">طور مهاراتك مع دورات احترافية</h1>
              <p className="text-white/80 mb-8">
                اكتسب المهارات التي تحتاجها للنجاح في سوق العمل الحر من خلال دورات مصممة بعناية من قبل خبراء في المجال.
              </p>
              <div className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
                <Input 
                  placeholder="ابحث عن دورة..." 
                  className="flex-grow text-gray-800" 
                />
                <Button variant="secondary">
                  <Search className="h-4 w-4 ml-2" />
                  بحث
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* قسم الفئات */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">استكشف حسب الفئة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {['التصميم', 'البرمجة', 'التسويق', 'إدارة الأعمال', 'العمل الحر', 'المهارات الشخصية'].map((category, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-blue-50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 text-2xl">📚</span>
                    </div>
                    <h3 className="font-semibold">{category}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* قسم الدورات المميزة */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">الدورات المميزة</h2>
              <Button variant="link">عرض الكل</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(null).map((_, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <a href={`/courses/${index + 1}`}>
                    <img 
                      src={`https://source.unsplash.com/random/300x200?education&sig=${index}`} 
                      alt="صورة الدورة" 
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="default" className="bg-blue-600">مميزة</Badge>
                    </div>
                  </a>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="secondary">{['تصميم', 'برمجة', 'تسويق', 'إدارة أعمال', 'عمل حر', 'مهارات شخصية'][index % 6]}</Badge>
                      <div className="flex items-center text-sm">
                        <Star className="h-3 w-3 text-yellow-400 ml-1" fill="#facc15" />
                        <span>4.8</span>
                        <span className="text-gray-400 mr-1">(235)</span>
                      </div>
                    </div>
                    
                    <a href={`/courses/${index + 1}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                        {[
                          'دورة احترافية في تصميم واجهات المستخدم UI/UX',
                          'البرمجة بلغة JavaScript من الصفر للاحتراف',
                          'التسويق الرقمي والتسويق عبر السوشيال ميديا',
                          'مهارات إدارة المشاريع للمستقلين',
                          'كيفية بناء علامتك التجارية كمستقل',
                          'مهارات التواصل والتفاوض للمستقلين'
                        ][index % 6]}
                      </h3>
                    </a>
                    
                    <div className="flex items-center mb-3">
                      <img 
                        src={`https://source.unsplash.com/random/40x40?face&sig=${index}`} 
                        alt="صورة المدرب" 
                        className="w-8 h-8 rounded-full ml-2"
                      />
                      <span className="text-sm">{['أحمد محمد', 'سارة علي', 'محمد خالد', 'نورة السعيد', 'فهد العتيبي', 'عمر الدوسري'][index % 6]}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        {['8 ساعات', '12 ساعة', '6 ساعات', '10 ساعات', '9 ساعات', '7 ساعات'][index % 6]}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="h-3 w-3 ml-1" />
                        {['42 درس', '36 درس', '28 درس', '45 درس', '32 درس', '24 درس'][index % 6]}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 ml-1" />
                        {['1.2K', '860', '2.5K', '950', '1.8K', '730'][index % 6]}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-blue-600">{['$49', '$59', '$39', '$69', '$49', '$29'][index % 6]}</span>
                        <span className="text-sm text-gray-400 line-through">{['$99', '$119', '$79', '$139', '$99', '$59'][index % 6]}</span>
                      </div>
                      <Button size="sm">اشترك الآن</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* قسم المسارات التعليمية */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">المسارات التعليمية</h2>
              <Button variant="link" asChild>
                <Link to="/learning-paths">عرض الكل</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'مسار المصمم الاحترافي',
                  description: 'تعلم مهارات التصميم من الأساسيات حتى الاحتراف من خلال 5 دورات متكاملة',
                  image: 'https://source.unsplash.com/random/600x300?design',
                  courses: 5,
                  hours: 40,
                  level: 'مبتدئ إلى متقدم'
                },
                {
                  title: 'مسار العمل الحر الناجح',
                  description: 'كل ما تحتاجه لبدء مسيرتك في العمل الحر وتحقيق الدخل المستقل',
                  image: 'https://source.unsplash.com/random/600x300?freelance',
                  courses: 4,
                  hours: 30,
                  level: 'مبتدئ'
                },
                {
                  title: 'مسار مطور الويب الشامل',
                  description: 'تعلم تطوير مواقع الويب من الصفر حتى الاحتراف باستخدام أحدث التقنيات',
                  image: 'https://source.unsplash.com/random/600x300?coding',
                  courses: 6,
                  hours: 50,
                  level: 'مبتدئ إلى متقدم'
                },
                {
                  title: 'مسار التسويق الرقمي',
                  description: 'أتقن مهارات التسويق الرقمي وزيادة المبيعات عبر المنصات المختلفة',
                  image: 'https://source.unsplash.com/random/600x300?marketing',
                  courses: 5,
                  hours: 35,
                  level: 'متوسط'
                }
              ].map((path, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={path.image} 
                      alt={path.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-white text-xl font-bold p-4">{path.title}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <p className="text-gray-600 mb-4">{path.description}</p>
                    
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <BookOpen className="h-3 w-3 ml-1" />
                        {path.courses} دورات
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        {path.hours} ساعة
                      </span>
                      <span>{path.level}</span>
                    </div>
                    
                    <Button className="w-full">عرض المسار</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* قسم الاشتراك في النشرة البريدية */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">اشترك في نشرتنا البريدية</h2>
            <p className="mb-8 max-w-3xl mx-auto">
              احصل على آخر تحديثات الدورات والعروض الخاصة مباشرة إلى بريدك الإلكتروني
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
              <Input placeholder="البريد الإلكتروني" className="text-gray-800" />
              <Button variant="secondary">اشترك</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Courses;
