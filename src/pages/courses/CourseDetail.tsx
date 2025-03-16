
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, BookOpen, Star, Users, Award, Play, ShoppingCart, Calendar, User } from 'lucide-react';

const courseData = {
  id: 1,
  title: 'التسويق الرقمي للمبتدئين: دليل شامل من الصفر للاحتراف',
  description: 'دورة شاملة للمبتدئين في مجال التسويق الرقمي، تغطي جميع أساسيات وتقنيات التسويق الإلكتروني بأسلوب عملي وتطبيقي. ستتعلم كيفية إنشاء استراتيجيات تسويقية ناجحة، وإدارة حملات إعلانية فعالة، وتحسين ظهور موقعك في محركات البحث، والتسويق عبر وسائل التواصل الاجتماعي.',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  instructor: {
    name: 'د. أحمد محمد الزهراني',
    title: 'خبير تسويق رقمي ومحاضر في مجال التسويق',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    courses: 5,
    students: 1250,
    rating: 4.8
  },
  price: 199,
  originalPrice: 399,
  discount: 50,
  duration: '12 ساعة',
  lessons: 24,
  students: 3842,
  language: 'العربية',
  lastUpdate: '15 أبريل 2023',
  level: 'مبتدئ',
  rating: 4.7,
  reviews: 348,
  features: [
    'شهادة إتمام معتمدة',
    'الوصول مدى الحياة',
    'دعم فني على مدار الساعة',
    'مشاريع عملية',
    'موارد قابلة للتنزيل',
    'اختبارات للتقييم'
  ],
  curriculum: [
    {
      title: 'مقدمة في التسويق الرقمي',
      lessons: [
        { title: 'ما هو التسويق الرقمي؟', duration: '15 دقيقة', isFree: true },
        { title: 'أهمية التسويق الرقمي في عصرنا الحالي', duration: '20 دقيقة', isFree: true },
        { title: 'قنوات التسويق الرقمي المختلفة', duration: '25 دقيقة', isFree: false },
        { title: 'كيفية بناء استراتيجية تسويق رقمي متكاملة', duration: '30 دقيقة', isFree: false }
      ]
    },
    {
      title: 'تحسين محركات البحث (SEO)',
      lessons: [
        { title: 'أساسيات تحسين محركات البحث', duration: '30 دقيقة', isFree: false },
        { title: 'البحث عن الكلمات المفتاحية وتحليلها', duration: '35 دقيقة', isFree: false },
        { title: 'تحسين المحتوى لمحركات البحث', duration: '40 دقيقة', isFree: false },
        { title: 'بناء الروابط الخلفية بطرق فعالة', duration: '35 دقيقة', isFree: false },
        { title: 'قياس نتائج تحسين محركات البحث', duration: '25 دقيقة', isFree: false }
      ]
    },
    {
      title: 'التسويق عبر وسائل التواصل الاجتماعي',
      lessons: [
        { title: 'استراتيجيات التسويق عبر فيسبوك', duration: '35 دقيقة', isFree: false },
        { title: 'التسويق عبر انستغرام', duration: '30 دقيقة', isFree: false },
        { title: 'استخدام تويتر للأعمال', duration: '25 دقيقة', isFree: false },
        { title: 'التسويق عبر لينكد إن', duration: '30 دقيقة', isFree: false },
        { title: 'إنشاء خطة محتوى متكاملة', duration: '40 دقيقة', isFree: false }
      ]
    },
    {
      title: 'إعلانات الدفع لكل نقرة (PPC)',
      lessons: [
        { title: 'أساسيات إعلانات جوجل', duration: '30 دقيقة', isFree: false },
        { title: 'إنشاء حملات إعلانية فعالة', duration: '35 دقيقة', isFree: false },
        { title: 'استهداف الجمهور المناسب', duration: '25 دقيقة', isFree: false },
        { title: 'تحسين معدل التحويل', duration: '30 دقيقة', isFree: false },
        { title: 'تحليل أداء الحملات الإعلانية', duration: '35 دقيقة', isFree: false }
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      user: 'محمد السعيد',
      rating: 5,
      date: 'منذ شهر',
      comment: 'دورة ممتازة ومفيدة جداً للمبتدئين في مجال التسويق الرقمي. شرح المدرب واضح ومفصل، والأمثلة العملية ساعدتني كثيراً في فهم المفاهيم.'
    },
    {
      id: 2,
      user: 'سارة العتيبي',
      rating: 4,
      date: 'منذ شهرين',
      comment: 'محتوى الدورة شامل ومفيد، استفدت كثيراً من الجزء الخاص بتحسين محركات البحث. أتمنى لو كان هناك تعمق أكثر في جزء التسويق عبر وسائل التواصل الاجتماعي.'
    },
    {
      id: 3,
      user: 'خالد الغامدي',
      rating: 5,
      date: 'منذ 3 أشهر',
      comment: 'من أفضل الدورات التي حضرتها في مجال التسويق الرقمي. المدرب متمكن من المادة العلمية ويشرح بأسلوب سلس وواضح. أنصح بها بشدة لكل من يريد دخول عالم التسويق الرقمي.'
    }
  ]
};

const CourseDetail = () => {
  const { id } = useParams();
  
  return (
    <>
      <Helmet>
        <title>{courseData.title} | علي للأعمال</title>
        <meta name="description" content={courseData.description.substring(0, 160)} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{courseData.title}</h1>
                <p className="text-gray-300 mb-6">{courseData.description.substring(0, 200)}...</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 ml-1" />
                    <span>{courseData.rating}</span>
                    <span className="text-gray-400 mr-1">({courseData.reviews} تقييم)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 ml-1" />
                    <span>{courseData.students} طالب</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 ml-1" />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-gray-400 ml-1" />
                    <span>{courseData.lessons} درس</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-8">
                  <img
                    src={courseData.instructor.image}
                    alt={courseData.instructor.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white ml-3"
                  />
                  <div>
                    <h3 className="font-medium">{courseData.instructor.name}</h3>
                    <p className="text-sm text-gray-400">{courseData.instructor.title}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-ali-blue hover:bg-ali-dark-blue">
                    <ShoppingCart className="ml-2 h-5 w-5" />
                    اشترك الآن
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    عرض المنهج
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="overflow-hidden shadow-xl">
                  <div className="relative">
                    <img
                      src={courseData.image}
                      alt={courseData.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button variant="ghost" className="rounded-full h-16 w-16 bg-white/20 hover:bg-white/30 text-white">
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl font-bold">{courseData.price} ر.س</span>
                        <span className="text-gray-500 line-through">{courseData.originalPrice} ر.س</span>
                      </div>
                      <div className="text-green-600 text-sm mb-4">خصم {courseData.discount}% - ينتهي خلال 2 يوم</div>
                      
                      <Button className="w-full mb-3 bg-ali-blue hover:bg-ali-dark-blue text-lg">
                        <ShoppingCart className="ml-2 h-5 w-5" />
                        اشترك الآن
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        إضافة إلى السلة
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg mb-2">تشمل هذه الدورة:</h3>
                      
                      {courseData.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 ml-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="content">
              <TabsList className="mb-8 grid w-full grid-cols-4">
                <TabsTrigger value="content">محتوى الدورة</TabsTrigger>
                <TabsTrigger value="details">التفاصيل</TabsTrigger>
                <TabsTrigger value="instructor">المحاضر</TabsTrigger>
                <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">محتوى الدورة</h2>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-lg font-medium">{courseData.lessons} درس</div>
                      <div className="text-gray-600">{courseData.duration} إجمالي المدة</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {courseData.curriculum.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b">
                          <h3 className="font-bold text-lg">{section.title}</h3>
                          <div className="text-sm text-gray-600">{section.lessons.length} دروس</div>
                        </div>
                        
                        <div className="divide-y">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="p-4 flex items-center justify-between">
                              <div className="flex items-center">
                                <Play className="h-5 w-5 text-gray-500 ml-3" />
                                <div>
                                  <h4 className="font-medium">{lesson.title}</h4>
                                  <div className="text-sm text-gray-600">{lesson.duration}</div>
                                </div>
                              </div>
                              
                              {lesson.isFree && (
                                <Link to="#preview" className="text-ali-blue font-medium hover:underline">
                                  معاينة مجانية
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">تفاصيل الدورة</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">وصف الدورة</h3>
                      <p className="text-gray-700 mb-6">{courseData.description}</p>
                      
                      <h3 className="text-xl font-semibold mb-4">ماذا ستتعلم</h3>
                      <ul className="list-disc list-inside space-y-2 mr-4 text-gray-700 mb-6">
                        <li>أساسيات التسويق الرقمي ومفاهيمه الأساسية</li>
                        <li>كيفية إنشاء استراتيجية تسويق رقمي ناجحة</li>
                        <li>تحسين ظهور موقعك في نتائج محركات البحث (SEO)</li>
                        <li>إدارة حملات إعلانية فعالة على جوجل وفيسبوك</li>
                        <li>التسويق عبر وسائل التواصل الاجتماعي</li>
                        <li>تحليل أداء الحملات التسويقية وتحسينها</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mb-4">المتطلبات</h3>
                      <ul className="list-disc list-inside space-y-2 mr-4 text-gray-700">
                        <li>لا توجد متطلبات مسبقة - هذه الدورة مصممة للمبتدئين</li>
                        <li>جهاز كمبيوتر متصل بالإنترنت</li>
                        <li>الرغبة في التعلم والتطبيق العملي</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">معلومات الدورة</h3>
                      
                      <div className="space-y-4">
                        <div className="flex border-b pb-3">
                          <div className="w-1/3 font-medium text-gray-600">المستوى</div>
                          <div>{courseData.level}</div>
                        </div>
                        
                        <div className="flex border-b pb-3">
                          <div className="w-1/3 font-medium text-gray-600">اللغة</div>
                          <div>{courseData.language}</div>
                        </div>
                        
                        <div className="flex border-b pb-3">
                          <div className="w-1/3 font-medium text-gray-600">المدة</div>
                          <div>{courseData.duration}</div>
                        </div>
                        
                        <div className="flex border-b pb-3">
                          <div className="w-1/3 font-medium text-gray-600">الدروس</div>
                          <div>{courseData.lessons} درس</div>
                        </div>
                        
                        <div className="flex border-b pb-3">
                          <div className="w-1/3 font-medium text-gray-600">الطلاب</div>
                          <div>{courseData.students} طالب</div>
                        </div>
                        
                        <div className="flex border-b pb-3">
                          <div className="w-1/3 font-medium text-gray-600">آخر تحديث</div>
                          <div>{courseData.lastUpdate}</div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-1/3 font-medium text-gray-600">الشهادة</div>
                          <div>شهادة إتمام معتمدة</div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mt-8 mb-4">الفئة المستهدفة</h3>
                      <ul className="list-disc list-inside space-y-2 mr-4 text-gray-700">
                        <li>المبتدئين في مجال التسويق الرقمي</li>
                        <li>أصحاب المشاريع الصغيرة والمتوسطة</li>
                        <li>المسوقين التقليديين الراغبين في تطوير مهاراتهم الرقمية</li>
                        <li>خريجي كليات التسويق والإدارة</li>
                        <li>الراغبين في العمل في مجال التسويق الرقمي</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructor">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="mb-6 text-center">
                        <img
                          src={courseData.instructor.image}
                          alt={courseData.instructor.name}
                          className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
                        />
                        <h3 className="text-xl font-bold mt-4">{courseData.instructor.name}</h3>
                        <p className="text-gray-600">{courseData.instructor.title}</p>
                      </div>
                      
                      <div className="flex justify-around text-center mb-6">
                        <div>
                          <div className="text-xl font-bold text-ali-blue">{courseData.instructor.courses}</div>
                          <div className="text-sm text-gray-600">دورات</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-ali-blue">{courseData.instructor.students}</div>
                          <div className="text-sm text-gray-600">طالب</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-ali-blue">{courseData.instructor.rating}</div>
                          <div className="text-sm text-gray-600">تقييم</div>
                        </div>
                      </div>
                      
                      <Button className="w-full">عرض الملف الشخصي</Button>
                    </div>
                    
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold mb-4">نبذة عن المحاضر</h3>
                      
                      <div className="text-gray-700 space-y-4">
                        <p>
                          د. أحمد محمد الزهراني هو خبير تسويق رقمي متخصص بأكثر من 10 سنوات من الخبرة في مجال التسويق الرقمي والإلكتروني. حاصل على درجة الدكتوراه في التسويق الإلكتروني من جامعة الملك سعود.
                        </p>
                        
                        <p>
                          عمل د. أحمد مع العديد من الشركات المحلية والعالمية في تطوير استراتيجيات التسويق الرقمي وتحسين أدائها. كما قام بتدريب أكثر من 5000 متدرب في مجال التسويق الرقمي من خلال دوراته التدريبية المختلفة.
                        </p>
                        
                        <p>
                          يتميز أسلوب د. أحمد بالشرح المبسط والعملي، حيث يركز على تقديم المعلومات بطريقة سهلة وواضحة مع التركيز على الجوانب التطبيقية والعملية. يؤمن بأن التسويق الرقمي هو مزيج من العلم والفن، ويسعى لتمكين طلابه من إتقان كلا الجانبين.
                        </p>
                      </div>
                      
                      <h3 className="text-xl font-semibold mt-6 mb-4">الدورات الأخرى للمحاضر</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="overflow-hidden">
                          <div className="h-32 overflow-hidden">
                            <img
                              src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                              alt="التسويق عبر وسائل التواصل الاجتماعي"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-medium line-clamp-1">التسويق عبر وسائل التواصل الاجتماعي</h4>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-ali-blue font-bold">249 ر.س</div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Star className="h-4 w-4 text-yellow-400 ml-1" />
                                <span>4.9</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="overflow-hidden">
                          <div className="h-32 overflow-hidden">
                            <img
                              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5hbHl0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                              alt="تحليلات جوجل للمسوقين"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-medium line-clamp-1">تحليلات جوجل للمسوقين</h4>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-ali-blue font-bold">179 ر.س</div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Star className="h-4 w-4 text-yellow-400 ml-1" />
                                <span>4.6</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 mb-2">{courseData.rating}</div>
                        <div className="flex justify-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-6 w-6 ${star <= Math.floor(courseData.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill={star <= Math.floor(courseData.rating) ? 'currentColor' : 'none'} 
                            />
                          ))}
                        </div>
                        <div className="text-gray-600">{courseData.reviews} تقييم</div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-semibold mb-4">تصنيف التقييمات</h3>
                        
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center mb-2">
                            <div className="w-10 text-gray-600 text-sm">{rating} نجوم</div>
                            <div className="flex-grow mx-3">
                              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div 
                                  className="bg-yellow-400 h-full" 
                                  style={{ 
                                    width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 1 : 1}%` 
                                  }}
                                />
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 w-10">
                              {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '8%' : rating === 2 ? '1%' : '1%'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold">التقييمات والمراجعات</h3>
                        <Button variant="outline" size="sm">كتابة مراجعة</Button>
                      </div>
                      
                      <div className="space-y-6">
                        {courseData.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6 last:border-0">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center text-gray-700 font-bold ml-3">
                                  <User className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{review.user}</h4>
                                  <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star 
                                        key={star} 
                                        className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                        fill={star <= review.rating ? 'currentColor' : 'none'} 
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">{review.date}</div>
                            </div>
                            <p className="text-gray-700 mt-2">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 text-center">
                        <Button variant="outline">عرض المزيد من التقييمات</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Related Courses */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">دورات ذات صلة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="overflow-hidden h-full">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${item}/500/300`}
                      alt="صورة الدورة"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col h-[calc(100%-10rem)]">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {item === 1 ? 'استراتيجيات التسويق المتقدمة' : 
                       item === 2 ? 'إدارة وسائل التواصل الاجتماعي' : 
                       item === 3 ? 'تحسين محركات البحث للمبتدئين' : 
                       'التسويق بالفيديو على يوتيوب'}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <User className="h-4 w-4 ml-1" />
                      <span>د. أحمد الزهراني</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 ml-1" />
                        <span className="text-sm">4.8</span>
                        <span className="text-xs text-gray-500 mr-1">(120)</span>
                      </div>
                      <div className="text-sm flex items-center">
                        <Users className="h-4 w-4 text-gray-500 ml-1" />
                        <span>365</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-3 flex items-center justify-between border-t">
                      <div className="font-bold text-ali-blue">
                        {item === 1 ? '299' : 
                         item === 2 ? '249' : 
                         item === 3 ? '199' : 
                         '229'} ر.س
                      </div>
                      <Link to={`/courses/${item}`}>
                        <Button variant="outline" size="sm">
                          التفاصيل
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default CourseDetail;
