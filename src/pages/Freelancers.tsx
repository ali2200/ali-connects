
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Briefcase, GraduationCap, MapPin, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// بيانات وهمية للمستقلين
const freelancers = [
  {
    id: 1,
    name: "محمد أحمد",
    title: "مطور واجهات أمامية",
    rating: 4.9,
    reviews: 124,
    hourlyRate: 45,
    image: "/placeholder.svg",
    location: "الرياض، المملكة العربية السعودية",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    projects: 87,
    bio: "مطور واجهات أمامية محترف مع خبرة 5 سنوات في بناء تطبيقات الويب الحديثة، متخصص في React وTypeScript."
  },
  {
    id: 2,
    name: "سارة خالد",
    title: "مصممة جرافيك",
    rating: 4.8,
    reviews: 98,
    hourlyRate: 40,
    image: "/placeholder.svg",
    location: "دبي، الإمارات العربية المتحدة",
    skills: ["Adobe Photoshop", "Illustrator", "UI/UX", "Figma"],
    projects: 112,
    bio: "مصممة جرافيك إبداعية مع شغف لتصميم واجهات المستخدم والعلامات التجارية، أعمل على تحويل الأفكار إلى تصاميم جذابة."
  },
  {
    id: 3,
    name: "خالد عبدالرحمن",
    title: "مبرمج تطبيقات موبايل",
    rating: 4.7,
    reviews: 75,
    hourlyRate: 55,
    image: "/placeholder.svg",
    location: "القاهرة، مصر",
    skills: ["Flutter", "React Native", "iOS", "Android"],
    projects: 64,
    bio: "مطور تطبيقات موبايل متخصص في Flutter وReact Native مع خبرة في بناء تطبيقات عالية الأداء لنظامي iOS وAndroid."
  },
  {
    id: 4,
    name: "فاطمة محمد",
    title: "مديرة مشاريع رقمية",
    rating: 4.9,
    reviews: 120,
    hourlyRate: 60,
    image: "/placeholder.svg",
    location: "جدة، المملكة العربية السعودية",
    skills: ["إدارة المشاريع", "Agile", "Scrum", "Jira"],
    projects: 53,
    bio: "مديرة مشاريع محترفة مع خبرة في قيادة المشاريع الرقمية من البداية إلى النهاية، باستخدام منهجيات Agile."
  },
  {
    id: 5,
    name: "أحمد محمود",
    title: "مطور واجهات خلفية",
    rating: 4.6,
    reviews: 85,
    hourlyRate: 50,
    image: "/placeholder.svg",
    location: "الدمام، المملكة العربية السعودية",
    skills: ["Node.js", "Express", "MongoDB", "AWS"],
    projects: 72,
    bio: "مطور واجهات خلفية مع خبرة واسعة في بناء واجهات برمجة التطبيقات RESTful وتطوير حلول قابلة للتطوير."
  },
  {
    id: 6,
    name: "نورة سعد",
    title: "متخصصة تسويق رقمي",
    rating: 4.8,
    reviews: 65,
    hourlyRate: 45,
    image: "/placeholder.svg",
    location: "عمّان، الأردن",
    skills: ["SEO", "SEM", "Google Analytics", "التسويق عبر وسائل التواصل الاجتماعي"],
    projects: 91,
    bio: "متخصصة تسويق رقمي مع خبرة في تحسين محركات البحث والإعلانات المدفوعة وزيادة حركة المرور على المواقع."
  }
];

const Freelancers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  return (
    <>
      <Helmet>
        <title>ابحث عن مستقلين | علي للأعمال</title>
        <meta name="description" content="ابحث عن أفضل المستقلين في مختلف المجالات لتنفيذ مشاريعك بأعلى جودة" />
      </Helmet>
      <Navbar />
      
      <main className="pt-28 pb-16">
        {/* قسم البحث */}
        <section className="bg-ali-blue/5 py-12 mb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">ابحث عن أفضل المستقلين لمشروعك</h1>
              <p className="text-gray-600">آلاف المستقلين المحترفين في انتظار مشروعك. اعثر على المهارات المناسبة لتحقيق رؤيتك.</p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="ابحث عن مهارة، تخصص، أو اسم..." 
                    className="pl-3 pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>بحث</Button>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant={selectedCategory === 'all' ? "default" : "outline"} 
                  className="cursor-pointer" 
                  onClick={() => setSelectedCategory('all')}>
                  الجميع
                </Badge>
                <Badge variant={selectedCategory === 'development' ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('development')}>
                  تطوير ويب وبرمجة
                </Badge>
                <Badge variant={selectedCategory === 'design' ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('design')}>
                  تصميم وجرافيك
                </Badge>
                <Badge variant={selectedCategory === 'marketing' ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('marketing')}>
                  تسويق رقمي
                </Badge>
                <Badge variant={selectedCategory === 'writing' ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('writing')}>
                  كتابة وترجمة
                </Badge>
                <Badge variant={selectedCategory === 'video' ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('video')}>
                  فيديو وصوتيات
                </Badge>
              </div>
            </div>
          </div>
        </section>
        
        {/* قائمة المستقلين */}
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">المستقلون المتاحون</h2>
              <Badge className="mr-2">{freelancers.length}</Badge>
            </div>
            
            <div className="flex gap-3 items-center">
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">الأكثر شهرة</SelectItem>
                  <SelectItem value="rating">التقييم (من الأعلى)</SelectItem>
                  <SelectItem value="reviews">عدد المراجعات</SelectItem>
                  <SelectItem value="price-asc">السعر (من الأقل)</SelectItem>
                  <SelectItem value="price-desc">السعر (من الأعلى)</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {freelancers.map((freelancer) => (
              <Card key={freelancer.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={freelancer.image} alt={freelancer.name} />
                        <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{freelancer.name}</h3>
                        <p className="text-gray-600 mb-1">{freelancer.title}</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 ml-1" />
                          <span className="text-sm font-medium">{freelancer.rating}</span>
                          <span className="text-sm text-gray-500 mx-1">({freelancer.reviews} مراجعة)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{freelancer.bio}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 ml-1" />
                        <span>{freelancer.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Briefcase className="h-4 w-4 ml-1" />
                        <span>{freelancer.projects} مشروع منجز</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <GraduationCap className="h-4 w-4 ml-1" />
                        <span>معدل ${freelancer.hourlyRate}/ساعة</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {freelancer.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                      {freelancer.skills.length > 3 && (
                        <Badge variant="outline">+{freelancer.skills.length - 3}</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4">
                    <Button className="w-full">عرض الملف الشخصي</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg">تحميل المزيد</Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Freelancers;
