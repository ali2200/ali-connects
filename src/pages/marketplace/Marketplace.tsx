
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Star, ChevronDown, Filter } from 'lucide-react';

const Marketplace = () => {
  return (
    <>
      <Helmet>
        <title>سوق الخدمات | علي للأعمال</title>
        <meta name="description" content="استكشف مجموعة واسعة من الخدمات المقدمة من مستقلين محترفين في مختلف المجالات" />
      </Helmet>
      <Navbar />
      <main>
        {/* قسم الهيدر */}
        <section className="bg-blue-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">سوق الخدمات</h1>
              <p className="text-gray-600 mb-8">
                استكشف آلاف الخدمات المقدمة من مستقلين محترفين في مختلف المجالات، واحصل على الخدمة المناسبة لاحتياجاتك بأفضل جودة وسعر.
              </p>
              <div className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
                <Input 
                  placeholder="ابحث عن خدمة..." 
                  className="flex-grow" 
                />
                <Button>
                  <Search className="h-4 w-4 ml-2" />
                  بحث
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* قسم الفئات الشائعة */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">الفئات الشائعة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {['تصميم', 'برمجة', 'تسويق', 'كتابة وترجمة', 'فيديو وصوتيات', 'أعمال'].map((category, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-blue-50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 text-2xl">🚀</span>
                    </div>
                    <h3 className="font-semibold">{category}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* قسم عرض الخدمات */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">استكشف الخدمات</h2>
              <div className="flex gap-3">
                <Button variant="outline" className="hidden md:flex items-center">
                  <Filter className="h-4 w-4 ml-2" />
                  فلترة
                </Button>
                <Button variant="outline" className="flex items-center">
                  ترتيب حسب: الأحدث
                  <ChevronDown className="h-4 w-4 mr-2" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* الفلاتر (للشاشات الكبيرة) */}
              <div className="w-full lg:w-1/4 space-y-6 hidden lg:block">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">الفئات</h3>
                    <div className="space-y-2">
                      {['الكل', 'تصميم', 'برمجة', 'تسويق', 'كتابة وترجمة', 'فيديو وصوتيات', 'أعمال'].map((category, index) => (
                        <div key={index} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`category-${index}`} 
                            className="ml-2"
                          />
                          <label htmlFor={`category-${index}`}>{category}</label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">السعر</h3>
                    <div className="flex gap-2">
                      <Input placeholder="من" className="w-1/2" />
                      <Input placeholder="إلى" className="w-1/2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">التقييم</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`rating-${rating}`} 
                            className="ml-2"
                          />
                          <label htmlFor={`rating-${rating}`} className="flex items-center">
                            {rating} <Star className="h-3 w-3 text-yellow-400 ml-1" fill="#facc15" /> فما فوق
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Button className="w-full">تطبيق الفلاتر</Button>
              </div>
              
              {/* عرض الخدمات */}
              <div className="w-full lg:w-3/4">
                <Tabs defaultValue="grid">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">عرض 1-12 من 253 خدمة</div>
                    <TabsList>
                      <TabsTrigger value="grid">شبكة</TabsTrigger>
                      <TabsTrigger value="list">قائمة</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="grid">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array(9).fill(null).map((_, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                          <a href={`/marketplace/service/${index + 1}`}>
                            <img 
                              src={`https://source.unsplash.com/random/300x200?sig=${index}`} 
                              alt="صورة الخدمة" 
                              className="w-full h-44 object-cover"
                            />
                          </a>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-3">
                              <Badge variant="secondary">تصميم</Badge>
                              <div className="flex items-center text-sm">
                                <Star className="h-3 w-3 text-yellow-400 ml-1" fill="#facc15" />
                                <span>4.8</span>
                                <span className="text-gray-400 mr-1">(125)</span>
                              </div>
                            </div>
                            <a href={`/marketplace/service/${index + 1}`}>
                              <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                                سأقوم بتصميم شعار احترافي وهوية بصرية كاملة لعلامتك التجارية
                              </h3>
                            </a>
                            <div className="flex items-center mb-3">
                              <img 
                                src={`https://source.unsplash.com/random/40x40?face&sig=${index}`} 
                                alt="صورة المستقل" 
                                className="w-8 h-8 rounded-full ml-2"
                              />
                              <span className="text-sm">أحمد المهندس</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                              <span className="text-xs text-gray-500">مدة التسليم: 3 أيام</span>
                              <span className="text-lg font-bold text-green-600">$50</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="list">
                    <div className="space-y-4">
                      {Array(5).fill(null).map((_, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row">
                            <a href={`/marketplace/service/${index + 1}`} className="md:w-1/4">
                              <img 
                                src={`https://source.unsplash.com/random/300x200?sig=${index}`} 
                                alt="صورة الخدمة" 
                                className="w-full h-full object-cover"
                              />
                            </a>
                            <CardContent className="p-4 md:w-3/4">
                              <div className="flex justify-between items-center mb-3">
                                <Badge variant="secondary">برمجة</Badge>
                                <div className="flex items-center text-sm">
                                  <Star className="h-3 w-3 text-yellow-400 ml-1" fill="#facc15" />
                                  <span>4.9</span>
                                  <span className="text-gray-400 mr-1">(87)</span>
                                </div>
                              </div>
                              <a href={`/marketplace/service/${index + 1}`}>
                                <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                                  سأقوم ببرمجة موقع إلكتروني متكامل بتقنيات حديثة وتصميم متجاوب
                                </h3>
                              </a>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                أقدم خدمة برمجة مواقع إلكترونية احترافية باستخدام أحدث التقنيات، مع تصميم متجاوب يعمل على جميع الأجهزة، وتحسين لمحركات البحث SEO، وسرعة تحميل ممتازة.
                              </p>
                              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <div className="flex items-center">
                                  <img 
                                    src={`https://source.unsplash.com/random/40x40?face&sig=${index + 10}`} 
                                    alt="صورة المستقل" 
                                    className="w-8 h-8 rounded-full ml-2"
                                  />
                                  <span className="text-sm">محمد البرمجي</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-xs text-gray-500">مدة التسليم: 7 أيام</span>
                                  <span className="text-lg font-bold text-green-600">$120</span>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="mx-1 px-4 py-2">السابق</Button>
                  <Button variant="default" className="mx-1 px-4 py-2">1</Button>
                  <Button variant="outline" className="mx-1 px-4 py-2">2</Button>
                  <Button variant="outline" className="mx-1 px-4 py-2">3</Button>
                  <Button variant="outline" className="mx-1 px-4 py-2">التالي</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* قسم التسجيل */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">هل أنت مستقل؟ ابدأ في تقديم خدماتك الآن</h2>
            <p className="mb-8 max-w-3xl mx-auto">
              انضم إلى آلاف المستقلين في منصة علي للأعمال، وابدأ في تقديم خدماتك والوصول إلى عملاء من جميع أنحاء الوطن العربي.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                سجل كمستقل
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-blue-700">
                تعرف على الميزات
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Marketplace;
