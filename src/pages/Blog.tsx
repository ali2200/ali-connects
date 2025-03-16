
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, User, ArrowRight } from 'lucide-react';

// بيانات وهمية للمقالات
const blogPosts = [
  {
    id: 1,
    title: "10 نصائح للنجاح كمستقل في عام 2023",
    excerpt: "تعرف على أهم النصائح التي ستساعدك على تحقيق النجاح في مجال العمل الحر وزيادة دخلك كمستقل في العام الجديد.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "15 أغسطس 2023",
    author: "محمد العتيبي",
    category: "العمل الحر",
    readTime: "5 دقائق",
    slug: "10-tips-for-freelancers-2023"
  },
  {
    id: 2,
    title: "كيف تكتب عرض مشروع احترافي يضمن لك الفوز بالمشاريع",
    excerpt: "دليل شامل لكتابة عروض مشاريع احترافية تزيد من فرصك في الفوز بالمشاريع المميزة على منصات العمل الحر.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "10 أغسطس 2023",
    author: "سارة القحطاني",
    category: "نصائح مهنية",
    readTime: "7 دقائق",
    slug: "how-to-write-professional-project-proposal"
  },
  {
    id: 3,
    title: "الذكاء الاصطناعي وتأثيره على مستقبل العمل الحر",
    excerpt: "نظرة عميقة على كيفية تأثير تقنيات الذكاء الاصطناعي على سوق العمل الحر وكيف يمكن للمستقلين الاستفادة منها.",
    image: "https://images.unsplash.com/photo-1527689368864-4dbcf45c1168?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "5 أغسطس 2023",
    author: "عمر الدوسري",
    category: "التكنولوجيا",
    readTime: "8 دقائق",
    slug: "ai-impact-on-freelancing-future"
  },
  {
    id: 4,
    title: "دليل شامل لإدارة الأموال للمستقلين",
    excerpt: "كيف تدير أموالك بشكل فعال كمستقل؟ نصائح عملية للتخطيط المالي وتوفير الضرائب وبناء مدخرات للمستقبل.",
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "28 يوليو 2023",
    author: "فهد العنزي",
    category: "الإدارة المالية",
    readTime: "6 دقائق",
    slug: "financial-management-guide-for-freelancers"
  },
  {
    id: 5,
    title: "كيف تحدد أسعارك كمستقل بشكل عادل ومربح",
    excerpt: "دليل عملي لتحديد أسعار خدماتك كمستقل بطريقة تضمن لك الربح المناسب مع البقاء تنافسياً في سوق العمل الحر.",
    image: "https://images.unsplash.com/photo-1565378434747-262417385c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "20 يوليو 2023",
    author: "نورة السعيد",
    category: "نصائح مهنية",
    readTime: "4 دقائق",
    slug: "how-to-price-your-freelance-services"
  },
  {
    id: 6,
    title: "أفضل منصات العمل الحر للمستقلين العرب في عام 2023",
    excerpt: "مقارنة شاملة بين أفضل منصات العمل الحر المتاحة للمستقلين العرب، مع تحليل المميزات والعيوب لكل منصة.",
    image: "https://images.unsplash.com/photo-1522152272546-e526c1b978fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "15 يوليو 2023",
    author: "زياد المالكي",
    category: "العمل الحر",
    readTime: "9 دقائق",
    slug: "best-freelance-platforms-for-arab-freelancers-2023"
  }
];

// فئات المدونة
const categories = [
  { id: "all", name: "جميع المقالات" },
  { id: "freelance", name: "العمل الحر" },
  { id: "professional-tips", name: "نصائح مهنية" },
  { id: "technology", name: "التكنولوجيا" },
  { id: "financial", name: "الإدارة المالية" },
  { id: "success-stories", name: "قصص نجاح" }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // دالة لتصفية المقالات حسب البحث والفئة
  const getFilteredPosts = () => {
    let filtered = [...blogPosts];
    
    // تصفية حسب فئة
    if (activeCategory !== 'all') {
      const categoryMap = {
        'freelance': 'العمل الحر',
        'professional-tips': 'نصائح مهنية',
        'technology': 'التكنولوجيا',
        'financial': 'الإدارة المالية',
        'success-stories': 'قصص نجاح'
      };
      
      filtered = filtered.filter(post => post.category === categoryMap[activeCategory as keyof typeof categoryMap]);
    }
    
    // تصفية حسب نص البحث
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        post => post.title.toLowerCase().includes(term) || 
                post.excerpt.toLowerCase().includes(term) || 
                post.author.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };
  
  const filteredPosts = getFilteredPosts();
  
  return (
    <>
      <Helmet>
        <title>المدونة | علي للأعمال</title>
        <meta name="description" content="اقرأ أحدث المقالات والنصائح في مجال العمل الحر، وتطوير المهارات، والنجاح المهني" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <section className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">مدونة علي للأعمال</h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            {/* فلترة المقالات */}
            <div className="w-full md:w-1/4 space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-3">البحث</h2>
                  <div className="flex gap-2">
                    <Input
                      placeholder="ابحث في المدونة..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button size="icon" variant="ghost">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-3">الفئات</h2>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <Badge
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-3">المقالات الشائعة</h2>
                  <div className="space-y-3">
                    {blogPosts.slice(0, 3).map(post => (
                      <a
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors"
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium text-sm line-clamp-2">{post.title}</h3>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* قائمة المقالات */}
            <div className="w-full md:w-3/4">
              <Tabs defaultValue="grid" className="mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">المقالات {activeCategory !== 'all' && categories.find(c => c.id === activeCategory)?.name}</h2>
                  <TabsList>
                    <TabsTrigger value="grid">شبكة</TabsTrigger>
                    <TabsTrigger value="list">قائمة</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="grid" className="mt-6">
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">لم يتم العثور على أي مقالات تطابق بحثك.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredPosts.map(post => (
                        <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <a href={`/blog/${post.slug}`}>
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-48 object-cover"
                            />
                          </a>
                          <CardContent className="p-4">
                            <div className="flex gap-3 text-xs text-gray-500 mb-2">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 inline ml-1" />
                                {post.readTime}
                              </span>
                              <span className="flex items-center">
                                <User className="h-3 w-3 inline ml-1" />
                                {post.author}
                              </span>
                            </div>
                            <a href={`/blog/${post.slug}`}>
                              <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                            </a>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary">{post.category}</Badge>
                              <a
                                href={`/blog/${post.slug}`}
                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                              >
                                اقرأ المزيد
                                <ArrowRight className="h-3 w-3 mr-1" />
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="list" className="mt-6">
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">لم يتم العثور على أي مقالات تطابق بحثك.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredPosts.map(post => (
                        <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row">
                            <a href={`/blog/${post.slug}`} className="md:w-1/4">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </a>
                            <CardContent className="p-4 md:w-3/4">
                              <div className="flex gap-3 text-xs text-gray-500 mb-2">
                                <span>{post.date}</span>
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 inline ml-1" />
                                  {post.readTime}
                                </span>
                              </div>
                              <a href={`/blog/${post.slug}`}>
                                <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                                  {post.title}
                                </h3>
                              </a>
                              <p className="text-gray-600 text-sm mb-3">
                                {post.excerpt}
                              </p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">{post.category}</Badge>
                                  <span className="text-sm text-gray-500 flex items-center">
                                    <User className="h-3 w-3 inline ml-1" />
                                    {post.author}
                                  </span>
                                </div>
                                <a
                                  href={`/blog/${post.slug}`}
                                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                                >
                                  اقرأ المزيد
                                  <ArrowRight className="h-3 w-3 mr-1" />
                                </a>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              تصفح المزيد من المقالات المفيدة في مدونتنا واشترك للحصول على آخر التحديثات.
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <Input placeholder="أدخل بريدك الإلكتروني للاشتراك" />
              <Button>اشترك</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
