
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, Star, Clock, BookOpen, CheckCircle, Play, Download, Share2, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock data for courses (would be fetched from API in production)
const courses = [
  {
    id: "1",
    title: "إتقان التسويق عبر وسائل التواصل الاجتماعي",
    description: "تعلم كيفية إنشاء استراتيجيات وحملات وسائل التواصل الاجتماعي الفعالة لنمو الأعمال.",
    longDescription: "تعلم كيفية إنشاء استراتيجيات وحملات وسائل التواصل الاجتماعي الفعالة لنمو الأعمال. ستتعلم في هذه الدورة كيفية تخطيط وتنفيذ وقياس حملات وسائل التواصل الاجتماعي الناجحة عبر منصات متعددة مثل فيسبوك وانستغرام وتويتر ولينكد إن وتيك توك. تغطي الدورة استراتيجيات المحتوى، وإنشاء الجداول الزمنية، وتحليل البيانات، واستهداف الجمهور، والإعلانات المدفوعة.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
    instructorName: "سارة الجوهري",
    instructorImage: "https://randomuser.me/api/portraits/women/32.jpg",
    instructorBio: "خبيرة تسويق رقمي مع أكثر من 10 سنوات من الخبرة في إدارة حملات وسائل التواصل الاجتماعي لشركات كبرى.",
    rating: 4.9,
    reviews: 245,
    students: 1820,
    duration: "12 ساعة",
    lessons: 54,
    level: "متوسط",
    price: 99,
    currency: "$",
    language: "العربية",
    category: "وسائل التواصل",
    lastUpdated: "مارس 2025",
    features: [
      "54 درس فيديو",
      "8 مشاريع عملية",
      "15 اختبار",
      "موارد قابلة للتنزيل",
      "شهادة إتمام",
      "وصول مدى الحياة"
    ],
    requirements: [
      "معرفة أساسية بوسائل التواصل الاجتماعي",
      "فهم أساسيات التسويق",
      "حساب على منصات التواصل الاجتماعي الرئيسية"
    ],
    modules: [
      {
        title: "مقدمة في تسويق وسائل التواصل الاجتماعي",
        lessons: [
          { title: "أساسيات تسويق وسائل التواصل الاجتماعي", duration: "15 دقيقة" },
          { title: "فهم منصات التواصل المختلفة وجماهيرها", duration: "25 دقيقة" },
          { title: "تحديد أهداف حملتك", duration: "20 دقيقة" }
        ]
      },
      {
        title: "إنشاء استراتيجية محتوى قوية",
        lessons: [
          { title: "فهم جمهورك المستهدف", duration: "30 دقيقة" },
          { title: "إنشاء أنواع مختلفة من المحتوى", duration: "45 دقيقة" },
          { title: "تطوير جدول محتوى", duration: "35 دقيقة" },
          { title: "كتابة نصوص جذابة", duration: "40 دقيقة" }
        ]
      },
      {
        title: "إنشاء حملات مدفوعة",
        lessons: [
          { title: "مقدمة في الإعلانات المدفوعة", duration: "25 دقيقة" },
          { title: "إعداد حملات فيسبوك وانستغرام", duration: "50 دقيقة" },
          { title: "إعداد حملات تويتر ولينكد إن", duration: "40 دقيقة" },
          { title: "استهداف الجمهور وتحسين الحملات", duration: "55 دقيقة" }
        ]
      },
      {
        title: "قياس النجاح وتحليل البيانات",
        lessons: [
          { title: "فهم مقاييس وسائل التواصل الاجتماعي", duration: "35 دقيقة" },
          { title: "إعداد لوحات معلومات للتتبع", duration: "40 دقيقة" },
          { title: "تفسير البيانات واتخاذ قرارات", duration: "45 دقيقة" },
          { title: "إعداد تقارير أداء", duration: "30 دقيقة" }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "أحمد محمد",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        rating: 5,
        date: "قبل 3 أشهر",
        content: "دورة ممتازة! شرح مفصل وواضح، وتغطي جميع جوانب التسويق عبر وسائل التواصل الاجتماعي. استفدت كثيراً من المشاريع العملية، وتمكنت من تطبيق ما تعلمته على الفور في عملي."
      },
      {
        id: 2,
        name: "ليلى عبدالله",
        avatar: "https://randomuser.me/api/portraits/women/29.jpg",
        rating: 4,
        date: "قبل 5 أشهر",
        content: "دورة قيمة جداً للمبتدئين والمحترفين على حد سواء. المحتوى محدث ويشمل آخر الاستراتيجيات والتقنيات. كنت أتمنى المزيد من التفاصيل حول تيك توك وكلابهاوس، لكن بشكل عام أنا راضية جداً."
      },
      {
        id: 3,
        name: "محمد العتيبي",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        date: "قبل 2 أشهر",
        content: "تستحق كل ريال! المدربة سارة متمكنة جداً وتشرح بأسلوب سلس وممتع. الأمثلة العملية والتمارين ساعدتني على فهم المفاهيم بشكل أفضل. أوصي بشدة بهذه الدورة لكل من يريد تطوير مهاراته في التسويق الرقمي."
      },
      {
        id: 4,
        name: "سلمى حسن",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        date: "قبل شهر",
        content: "من أفضل الدورات التي أخذتها في مجال التسويق الرقمي. المحتوى منظم بشكل رائع والشرح واضح جداً. استفدت كثيراً من قسم تحليل البيانات واتخاذ القرارات. شكراً سارة على هذه الدورة القيمة!"
      }
    ]
  },
  {
    id: "2",
    title: "أساسيات واستراتيجية تحسين محركات البحث",
    description: "إتقان تقنيات تحسين محركات البحث لتوجيه حركة المرور العضوية إلى موقع الويب الخاص بك.",
    longDescription: "تعلم كيفية تحسين موقعك الإلكتروني ليظهر في مراتب متقدمة في نتائج محركات البحث. ستتعلم في هذه الدورة أساسيات وتقنيات SEO الحديثة، من تحليل الكلمات المفتاحية وتحسين المحتوى إلى بناء الروابط وتحسين العوامل التقنية. تغطي الدورة استراتيجيات SEO المحلية والعالمية، وكيفية التعامل مع تحديثات خوارزميات جوجل، ومراقبة وتحليل النتائج.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
    instructorName: "أحمد الشمري",
    instructorImage: "https://randomuser.me/api/portraits/men/46.jpg",
    instructorBio: "خبير SEO متخصص مع خبرة 12 عاماً في تحسين مواقع الويب لظهورها في الصفحات الأولى من محركات البحث.",
    rating: 4.8,
    reviews: 189,
    students: 1540,
    duration: "10 ساعات",
    lessons: 42,
    level: "مبتدئ إلى متوسط",
    price: 89,
    currency: "$",
    language: "العربية",
    category: "SEO",
    lastUpdated: "يناير 2025",
    features: [
      "42 درس فيديو",
      "6 مشاريع عملية",
      "10 اختبارات",
      "أدوات وقوالب قابلة للتنزيل",
      "شهادة إتمام",
      "وصول مدى الحياة"
    ],
    requirements: [
      "فهم أساسي لكيفية عمل الإنترنت",
      "معرفة أساسية بمواقع الويب",
      "لا يلزم خبرة برمجية"
    ],
    modules: [
      {
        title: "مقدمة في تحسين محركات البحث",
        lessons: [
          { title: "ما هو SEO ولماذا هو مهم", duration: "20 دقيقة" },
          { title: "كيف تعمل محركات البحث", duration: "25 دقيقة" },
          { title: "أنواع SEO: المحلي، الفني، المحتوى", duration: "30 دقيقة" }
        ]
      },
      {
        title: "بحث الكلمات المفتاحية",
        lessons: [
          { title: "فهم نية البحث", duration: "25 دقيقة" },
          { title: "أدوات بحث الكلمات المفتاحية", duration: "35 دقيقة" },
          { title: "تحليل المنافسين", duration: "40 دقيقة" },
          { title: "إنشاء استراتيجية الكلمات المفتاحية", duration: "45 دقيقة" }
        ]
      },
      {
        title: "تحسين المحتوى",
        lessons: [
          { title: "إنشاء محتوى يتصدر نتائج البحث", duration: "50 دقيقة" },
          { title: "تحسين العناوين والوصف", duration: "30 دقيقة" },
          { title: "استخدام الكلمات المفتاحية بشكل فعال", duration: "35 دقيقة" },
          { title: "تحسين الصور والوسائط", duration: "25 دقيقة" }
        ]
      },
      {
        title: "التحسينات التقنية",
        lessons: [
          { title: "تحسين سرعة الموقع", duration: "40 دقيقة" },
          { title: "تحسين للأجهزة المحمولة", duration: "35 دقيقة" },
          { title: "هيكلة URL وموقع XML", duration: "30 دقيقة" },
          { title: "الترميز الهيكلي وبيانات Schema", duration: "45 دقيقة" }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "سعود العنزي",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        rating: 5,
        date: "قبل 2 أشهر",
        content: "دورة شاملة ومفصلة جداً. استفدت كثيراً من الأمثلة العملية وشروحات الأستاذ أحمد. تمكنت من تطبيق ما تعلمته على موقعي وبدأت أرى نتائج إيجابية خلال أسابيع قليلة."
      },
      {
        id: 2,
        name: "نورة القحطاني",
        avatar: "https://randomuser.me/api/portraits/women/37.jpg",
        rating: 4,
        date: "قبل 4 أشهر",
        content: "دورة ممتازة للمبتدئين في مجال SEO. الشرح واضح والأمثلة عملية. أعجبني قسم بحث الكلمات المفتاحية بشكل خاص لأنه كان شاملاً ومفصلاً."
      },
      {
        id: 3,
        name: "فهد الحربي",
        avatar: "https://randomuser.me/api/portraits/men/62.jpg",
        rating: 5,
        date: "قبل شهر",
        content: "من أفضل الدورات العربية في مجال SEO. المحتوى محدث ويشمل آخر تحديثات خوارزميات جوجل. أوصي بها لكل من يريد تعلم تحسين محركات البحث بطريقة صحيحة."
      },
      {
        id: 4,
        name: "عبير الشمري",
        avatar: "https://randomuser.me/api/portraits/women/24.jpg",
        rating: 5,
        date: "قبل 3 أشهر",
        content: "استثمار رائع! تعلمت الكثير من هذه الدورة وتمكنت من تطبيق استراتيجيات SEO على مواقع عملائي. النتائج كانت مذهلة، وأشكر الأستاذ أحمد على هذه الدورة القيمة."
      }
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Find the course based on the ID
  const course = courses.find(c => c.id === id) || courses[0];
  
  const handleEnroll = () => {
    toast({
      title: "تم تسجيلك في الدورة",
      description: "يمكنك الآن البدء في التعلم. تم إرسال تفاصيل الوصول إلى بريدك الإلكتروني.",
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "تمت الإضافة إلى المفضلة",
      description: "تمت إضافة الدورة إلى قائمة المفضلة الخاصة بك.",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "تمت مشاركة الدورة",
      description: "تم نسخ رابط الدورة إلى الحافظة.",
    });
  };
  
  // Calculate the total course duration
  const getTotalMinutes = () => {
    let total = 0;
    course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        const minutes = parseInt(lesson.duration.split(' ')[0]);
        total += minutes;
      });
    });
    return total;
  };
  
  const totalMinutes = getTotalMinutes();
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  
  return (
    <>
      <Helmet>
        <title>{course.title} | منصة الدورات</title>
        <meta name="description" content={course.description} />
      </Helmet>
      
      <Navbar />
      
      <main className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" className="text-gray-600" asChild>
              <a href="/courses">
                <ChevronLeft className="h-4 w-4 ml-1" />
                العودة إلى الدورات
              </a>
            </Button>
          </div>
          
          {/* Course Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Play className="h-16 w-16 text-white opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h1>
              
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 ml-1" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-gray-500 mr-1">({course.reviews} تقييم)</span>
                </div>
                
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-gray-400 ml-1" />
                  <span>{course.students} طالب</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 ml-1" />
                  <span>{course.duration}</span>
                </div>
                
                <div className="flex items-center">
                  <span>آخر تحديث: {course.lastUpdated}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <Avatar className="h-12 w-12 ml-3">
                  <AvatarImage src={course.instructorImage} alt={course.instructorName} />
                  <AvatarFallback>{course.instructorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{course.instructorName}</p>
                  <p className="text-sm text-gray-500">المدرّب</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Course Content and Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="content">
                <TabsList className="w-full max-w-lg grid grid-cols-4">
                  <TabsTrigger value="content">المحتوى</TabsTrigger>
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="instructor">المدرّب</TabsTrigger>
                  <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">محتوى الدورة</h2>
                        <div className="text-sm text-gray-500">
                          {course.modules.length} وحدات • {course.lessons} درس • {totalHours} ساعة {remainingMinutes > 0 ? `و ${remainingMinutes} دقيقة` : ''}
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {course.modules.map((module, moduleIndex) => (
                          <div key={moduleIndex} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 border-b">
                              <h3 className="font-semibold">{moduleIndex + 1}. {module.title}</h3>
                              <div className="text-sm text-gray-500 mt-1">
                                {module.lessons.length} دروس
                              </div>
                            </div>
                            
                            <div className="divide-y">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <div key={lessonIndex} className="p-4 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 text-sm ml-3">
                                      {moduleIndex + 1}.{lessonIndex + 1}
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{lesson.title}</h4>
                                      <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <Play className="h-3.5 w-3.5 ml-1" />
                                        {lesson.duration}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <Button variant="ghost" size="sm" className="text-gray-500">
                                      معاينة
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">نظرة عامة على الدورة</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">الوصف</h3>
                          <p className="text-gray-700 whitespace-pre-line">{course.longDescription}</p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">ما ستتعلمه</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                            {course.features.map((feature, index) => (
                              <div key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">المتطلبات</h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {course.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">لمن هذه الدورة</h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>مديري التسويق ومديري وسائل التواصل الاجتماعي</li>
                            <li>أصحاب الأعمال الصغيرة الذين يديرون حسابات التواصل الاجتماعي الخاصة بهم</li>
                            <li>المسوقين المبتدئين الراغبين في تطوير مهاراتهم</li>
                            <li>المحترفين الذين يتطلعون إلى تغيير مسارهم المهني إلى التسويق الرقمي</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="instructor" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={course.instructorImage} alt={course.instructorName} />
                          <AvatarFallback>{course.instructorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-xl font-bold">{course.instructorName}</h2>
                          <p className="text-gray-500 mt-1">خبير تسويق رقمي ومدرب معتمد</p>
                          
                          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 ml-1" />
                              <span>{course.rating} تقييم المدرب</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 text-gray-400 ml-1" />
                              <span>5 دورات</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 ml-1" />
                              <span>2,500+ طالب</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="mb-6" />
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">نبذة عن المدرب</h3>
                        <p className="text-gray-700">
                          {course.instructorBio}
                        </p>
                        
                        <div className="mt-6 space-y-4">
                          <p className="text-gray-700">
                            تخرجت من جامعة الملك سعود بتخصص إدارة أعمال وحصلت على شهادات متخصصة في التسويق الرقمي من Google و Facebook و HubSpot.
                          </p>
                          
                          <p className="text-gray-700">
                            عملت مع العديد من الشركات المحلية والعالمية في تطوير استراتيجيات التسويق الرقمي وإدارة حملات وسائل التواصل الاجتماعي. 
                            أقوم حالياً بتدريب وتأهيل المسوقين من خلال دوراتي المتخصصة واستشاراتي للشركات.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-gray-900 mb-2">{course.rating}</div>
                          <div className="flex justify-center text-yellow-500 mb-1">
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                          </div>
                          <div className="text-sm text-gray-500">تقييم الدورة</div>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => {
                              const percentage = rating === 5 ? 75 : rating === 4 ? 18 : rating === 3 ? 5 : rating === 2 ? 1 : 1;
                              return (
                                <div key={rating} className="flex items-center">
                                  <div className="flex items-center w-16 text-sm">
                                    <span>{rating}</span>
                                    <Star className="h-3.5 w-3.5 text-yellow-500 ml-1" />
                                  </div>
                                  <Progress value={percentage} className="h-2 flex-grow mx-3" />
                                  <div className="w-12 text-sm text-gray-500 text-left">{percentage}%</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="mb-6" />
                      
                      <div className="space-y-6">
                        {course.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6 last:border-0">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarImage src={review.avatar} alt={review.name} />
                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-grow">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{review.name}</h4>
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <div className="flex text-yellow-500 mt-1">
                                  {Array(5).fill(0).map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} 
                                    />
                                  ))}
                                </div>
                                <p className="mt-3 text-gray-700">{review.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-center mt-6">
                        <Button variant="outline">عرض جميع التقييمات ({course.reviews})</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-0">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full aspect-video object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-bold text-blue-600">{course.currency}{course.price}</span>
                      <Badge variant="outline" className="font-normal">
                        <Clock className="h-3.5 w-3.5 ml-1" />
                        {course.duration}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <Button onClick={handleEnroll} className="w-full h-11 text-base">
                        سجل الآن
                      </Button>
                      <Button onClick={handleAddToWishlist} variant="outline" className="w-full h-11 text-base">
                        <Heart className="h-4 w-4 ml-1" />
                        أضف إلى المفضلة
                      </Button>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-6 text-center">
                      سياسة ضمان استرداد المال خلال 30 يوماً
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold">تتضمن هذه الدورة:</h3>
                      <ul className="space-y-2">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center">
                      <Button variant="ghost" size="sm" onClick={handleShare} className="text-gray-600">
                        <Share2 className="h-4 w-4 ml-1" />
                        مشاركة الدورة
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default CourseDetail;
