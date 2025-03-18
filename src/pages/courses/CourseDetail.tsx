
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getCourseById, getReviewsByTarget } from '@/lib/supabase';

import {
  Star,
  PlayCircle,
  Clock,
  Users,
  BookOpen,
  Globe,
  BarChart,
  Award,
  Share2,
  Heart,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// نموذج بيانات الكورس (سيتم استبداله بداتا حقيقية من Supabase)
const courseData = {
  id: 1,
  title: 'التسويق الرقمي الشامل: من المبتدئ إلى المحترف',
  slug: 'digital-marketing-comprehensive',
  description: 'دورة شاملة في التسويق الرقمي تغطي جميع جوانب التسويق عبر الإنترنت من البداية وحتى الاحتراف. ستتعلم إنشاء استراتيجيات تسويقية فعالة، وتحسين محركات البحث، والتسويق عبر وسائل التواصل الاجتماعي، وإعلانات الدفع لكل نقرة، والتسويق بالمحتوى، وتحليل البيانات، وغيرها الكثير.',
  price: 199,
  discountPrice: 149,
  rating: 4.8,
  totalReviews: 245,
  students: 1865,
  language: 'العربية',
  lastUpdate: '15 يناير 2023',
  thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
  level: 'جميع المستويات',
  duration: '15 ساعة',
  lessons: 120,
  categories: ['تسويق رقمي', 'أعمال'],
  features: [
    'شهادة إتمام معتمدة',
    'وصول مدى الحياة',
    'موارد وملفات للتحميل',
    'دعم مباشر من المدرب',
    'مشاريع عملية'
  ],
  prerequisites: [
    'لا توجد متطلبات مسبقة، هذه الدورة تبدأ من الصفر',
    'جهاز كمبيوتر مع اتصال بالإنترنت',
    'الرغبة في التعلم والتطبيق'
  ],
  targetAudience: [
    'المبتدئين الذين يرغبون في دخول مجال التسويق الرقمي',
    'أصحاب الأعمال الذين يرغبون في تسويق أعمالهم عبر الإنترنت',
    'المسوقين التقليديين الذين يريدون تطوير مهاراتهم الرقمية',
    'الخريجين الجدد الذين يبحثون عن فرص عمل في مجال التسويق الرقمي'
  ],
  whatYouWillLearn: [
    'إنشاء استراتيجية تسويق رقمي شاملة وفعالة',
    'تحسين محركات البحث (SEO) لزيادة ظهور موقعك في نتائج البحث',
    'إدارة حملات إعلانية ناجحة على منصات التواصل الاجتماعي',
    'إنشاء وإدارة حملات الدفع لكل نقرة (PPC) على جوجل ومنصات أخرى',
    'استخدام التسويق بالمحتوى لجذب العملاء المحتملين وتحويلهم',
    'تحليل وقياس أداء الحملات التسويقية باستخدام جوجل أناليتكس وأدوات أخرى',
    'بناء قائمة بريدية وإدارة حملات التسويق عبر البريد الإلكتروني',
    'تطبيق تقنيات التسويق الفيروسي والتسويق بالعمولة'
  ],
  curriculum: [
    {
      id: 1,
      title: 'مقدمة في التسويق الرقمي',
      lessons: 8,
      duration: '1 ساعة',
      topics: [
        { id: 1, title: 'مقدمة عن الدورة والمدرب', duration: '5 دقائق', free: true },
        { id: 2, title: 'ما هو التسويق الرقمي وأهميته', duration: '15 دقيقة', free: true },
        { id: 3, title: 'تطور التسويق الرقمي والاتجاهات الحديثة', duration: '20 دقيقة' },
        { id: 4, title: 'قنوات التسويق الرقمي المختلفة', duration: '15 دقيقة' }
      ]
    },
    {
      id: 2,
      title: 'استراتيجية التسويق الرقمي',
      lessons: 12,
      duration: '2 ساعة',
      topics: [
        { id: 1, title: 'تحديد الأهداف التسويقية', duration: '15 دقيقة' },
        { id: 2, title: 'تحديد الجمهور المستهدف وإنشاء شخصيات المشتري', duration: '20 دقيقة' },
        { id: 3, title: 'تحليل المنافسين', duration: '25 دقيقة' },
        { id: 4, title: 'بناء استراتيجية محتوى فعالة', duration: '30 دقيقة' }
      ]
    },
    {
      id: 3,
      title: 'تحسين محركات البحث (SEO)',
      lessons: 15,
      duration: '3 ساعة',
      topics: [
        { id: 1, title: 'أساسيات SEO وكيف تعمل محركات البحث', duration: '20 دقيقة' },
        { id: 2, title: 'بحث الكلمات المفتاحية واستراتيجية المحتوى', duration: '25 دقيقة' },
        { id: 3, title: 'تحسين الموقع الداخلي (On-page SEO)', duration: '30 دقيقة' },
        { id: 4, title: 'تحسين الموقع الخارجي (Off-page SEO)', duration: '30 دقيقة' }
      ]
    }
  ],
  instructor: {
    id: 1,
    name: 'أحمد محمد',
    title: 'خبير تسويق رقمي ومؤسس شركة DigitalGrow',
    bio: 'أحمد محمد هو خبير تسويق رقمي مع خبرة تزيد عن 10 سنوات في مجال التسويق الرقمي. عمل مع أكثر من 100 شركة ناشئة وعلامة تجارية معروفة لمساعدتهم على النمو رقمياً. حاصل على شهادات معتمدة من جوجل وفيسبوك في مجال التسويق الرقمي وتحليل البيانات.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    courses: 12,
    reviews: 4.9,
    students: 15000
  },
  reviews: [
    {
      id: 1,
      name: 'سارة أحمد',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
      date: '12 مارس 2023',
      content: 'دورة رائعة ومفيدة جداً، استفدت منها كثيراً في عملي وتطبيق استراتيجيات التسويق الرقمي. شرح المدرب ممتاز وسلس ويغطي جميع الجوانب المهمة.'
    },
    {
      id: 2,
      name: 'محمد خالد',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      rating: 4,
      date: '5 فبراير 2023',
      content: 'دورة شاملة غطت معظم جوانب التسويق الرقمي، استفدت منها في تطوير استراتيجية التسويق لشركتي. لكن كنت أتمنى المزيد من الأمثلة العملية.'
    },
    {
      id: 3,
      name: 'نورا سعيد',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
      rating: 5,
      date: '18 يناير 2023',
      content: 'من أفضل الدورات التي حضرتها في مجال التسويق الرقمي، المدرب محترف ولديه خبرة كبيرة يشاركها بأسلوب سلس وممتع. أنصح بها بشدة لكل من يريد دخول مجال التسويق الرقمي.'
    }
  ]
};

type Review = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [course, setCourse] = useState<any>(courseData);
  const [reviews, setReviews] = useState<Review[]>(courseData.reviews);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        if (id) {
          // تحميل بيانات الكورس من Supabase
          const courseData = await getCourseById(id);
          if (courseData) {
            setCourse(courseData);
            
            // تحميل المراجعات
            const reviewsData = await getReviewsByTarget(id, 'course');
            if (reviewsData) {
              setReviews(reviewsData);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        toast({
          title: "حدث خطأ",
          description: "لم نتمكن من تحميل بيانات الدورة",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    // استخدم البيانات المحلية مؤقتًا في حالة عدم وجود اتصال بالقاعدة
    if (id) {
      fetchCourseData();
    }
  }, [id, toast]);
  
  const handleEnroll = () => {
    setEnrolling(true);
    setTimeout(() => {
      setEnrolling(false);
      toast({
        title: "تم التسجيل بنجاح",
        description: "مبروك! تم تسجيلك في الدورة بنجاح. يمكنك البدء في التعلم الآن.",
      });
    }, 1500);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{course.title} | منصة علّي</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* شريط التنقل */}
        <div className="mb-6 text-sm breadcrumbs">
          <ul className="flex items-center space-x-2 space-x-reverse rtl:space-x-reverse">
            <li><Link to="/" className="text-gray-500 hover:text-primary">الرئيسية</Link></li>
            <li className="mx-2">/</li>
            <li><Link to="/courses" className="text-gray-500 hover:text-primary">الدورات</Link></li>
            <li className="mx-2">/</li>
            <li className="text-primary">{course.title}</li>
          </ul>
        </div>
        
        {/* معلومات الدورة الأساسية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            
            <p className="text-gray-600 mb-4">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center space-x-4 space-x-reverse mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 ml-1" />
                <span className="font-bold">{course.rating}</span>
                <span className="text-gray-500 mr-1">({course.totalReviews} تقييم)</span>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-500 ml-1" />
                <span>{course.students} طالب</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 ml-1" />
                <span>{course.duration}</span>
              </div>
              
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-gray-500 ml-1" />
                <span>{course.lessons} درس</span>
              </div>
              
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-500 ml-1" />
                <span>{course.language}</span>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <Avatar className="h-12 w-12 ml-3">
                <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{course.instructor.name}</p>
                <p className="text-gray-600 text-sm">{course.instructor.title}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {course.categories?.map((category: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-gray-100">
                  {category}
                </Badge>
              ))}
            </div>
            
            <div className="lg:hidden mb-8">
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white">
                      <PlayCircle className="mr-2 h-5 w-5" />
                      معاينة الدورة
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-primary">{course.discountPrice} ر.س</span>
                    {course.discountPrice && course.discountPrice < course.price && (
                      <span className="text-lg text-gray-500 line-through mr-2">{course.price} ر.س</span>
                    )}
                  </div>
                  
                  <Button className="w-full mb-3" size="lg" onClick={handleEnroll} disabled={enrolling}>
                    {enrolling ? 'جارِ التسجيل...' : 'سجل الآن'}
                  </Button>
                  
                  <p className="text-center text-sm text-gray-500 mb-4">ضمان استعادة الأموال خلال 30 يوم</p>
                  
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-2">تتضمن هذه الدورة:</h3>
                    <ul className="space-y-3">
                      {course.features?.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-center space-x-4 space-x-reverse mt-6">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 ml-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 ml-2" />
                      إضافة للمفضلة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <Card className="overflow-hidden sticky top-24">
              <div className="relative aspect-video">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    معاينة الدورة
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-primary">{course.discountPrice} ر.س</span>
                  {course.discountPrice && course.discountPrice < course.price && (
                    <span className="text-lg text-gray-500 line-through mr-2">{course.price} ر.س</span>
                  )}
                </div>
                
                <Button className="w-full mb-3" size="lg" onClick={handleEnroll} disabled={enrolling}>
                  {enrolling ? 'جارِ التسجيل...' : 'سجل الآن'}
                </Button>
                
                <p className="text-center text-sm text-gray-500 mb-4">ضمان استعادة الأموال خلال 30 يوم</p>
                
                <div className="space-y-4">
                  <h3 className="font-bold text-lg mb-2">تتضمن هذه الدورة:</h3>
                  <ul className="space-y-3">
                    {course.features?.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-center space-x-4 space-x-reverse mt-6">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 ml-2" />
                    مشاركة
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 ml-2" />
                    إضافة للمفضلة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* تفاصيل الدورة بالتبويبات */}
        <Tabs defaultValue="content" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="content">محتوى الدورة</TabsTrigger>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="instructor">المحاضر</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">محتوى الدورة</h2>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{course.curriculum?.length} أقسام • {course.lessons} درس • {course.duration} إجمالي المدة</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {course.curriculum?.map((section: any) => (
                    <div key={section.id} className="border rounded-lg overflow-hidden">
                      <div className="flex justify-between items-center bg-gray-50 p-4">
                        <div>
                          <h3 className="font-bold">{section.title}</h3>
                          <p className="text-sm text-gray-500">{section.lessons} دروس • {section.duration}</p>
                        </div>
                      </div>
                      
                      <div className="divide-y">
                        {section.topics?.map((topic: any) => (
                          <div key={topic.id} className="flex justify-between items-center p-4">
                            <div className="flex items-center">
                              <PlayCircle className="h-5 w-5 text-gray-400 ml-3" />
                              <div>
                                <h4 className="font-medium">{topic.title}</h4>
                                <p className="text-sm text-gray-500">{topic.duration}</p>
                              </div>
                            </div>
                            
                            {topic.free && (
                              <Button variant="ghost" size="sm" className="text-primary">
                                معاينة مجانية
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">نظرة عامة على الدورة</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">ما ستتعلمه</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      {course.whatYouWillLearn?.map((item: string, index: number) => (
                        <div key={index} className="flex">
                          <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">المتطلبات المسبقة</h3>
                    <ul className="space-y-2">
                      {course.prerequisites?.map((item: string, index: number) => (
                        <li key={index} className="flex">
                          <AlertCircle className="h-5 w-5 text-blue-500 ml-2 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">الفئة المستهدفة</h3>
                    <ul className="space-y-2">
                      {course.targetAudience?.map((item: string, index: number) => (
                        <li key={index} className="flex">
                          <Users className="h-5 w-5 text-purple-500 ml-2 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="instructor">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">{course.instructor.name}</h2>
                    <p className="text-gray-600 mb-4">{course.instructor.title}</p>
                    
                    <div className="flex flex-wrap gap-6 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 ml-1" />
                        <span>{course.instructor.reviews} تقييم المدرب</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-500 ml-1" />
                        <span>{course.instructor.students} طالب</span>
                      </div>
                      
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-gray-500 ml-1" />
                        <span>{course.instructor.courses} دورة</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6">
                      {course.instructor.bio}
                    </p>
                    
                    <Button variant="outline">عرض الملف الشخصي</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold mb-2">{course.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`h-5 w-5 ${star <= Math.round(course.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{course.totalReviews} تقييم</p>
                    </div>
                    
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        // حساب نسبة التقييمات لكل نجمة
                        const percentage = (rating === 5) ? 75 : (rating === 4) ? 20 : (rating === 3) ? 3 : (rating === 2) ? 1 : 1;
                        
                        return (
                          <div key={rating} className="flex items-center">
                            <div className="flex items-center ml-2">
                              <span className="ml-1">{rating}</span>
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            </div>
                            <Progress value={percentage} className="h-2 flex-1" />
                            <span className="text-gray-500 text-sm mr-2">{percentage}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-bold mb-4">تقييمات الطلاب</h3>
                    
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-center mb-3">
                            <Avatar className="h-10 w-10 ml-3">
                              <AvatarImage src={review.avatar} alt={review.name} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{review.name}</p>
                              <div className="flex items-center">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                      key={star}
                                      className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-gray-500 text-sm mr-2">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* دورات مشابهة */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">دورات ذات صلة</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* سيتم استبدالها بكومبوننت دورات مشابهة */}
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/600x400?marketing&sig=${item}`} 
                    alt="دورة" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">تسويق</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm ml-1">4.7</span>
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2">دورة أساسيات التسويق عبر وسائل التواصل الاجتماعي</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="h-4 w-4 ml-1" />
                    <span>8 ساعات</span>
                    <span className="mx-1">•</span>
                    <BookOpen className="h-4 w-4 ml-1" />
                    <span>42 درس</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 ml-2">
                        <AvatarImage src={`https://randomuser.me/api/portraits/men/${item + 20}.jpg`} />
                        <AvatarFallback>م{item}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">مدرب محترف</span>
                    </div>
                    <span className="font-bold text-primary">199 ر.س</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
