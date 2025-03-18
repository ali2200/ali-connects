
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
import { getServiceById, getReviewsByTarget } from '@/lib/supabase';

import {
  Star,
  CheckCircle,
  Clock,
  Calendar,
  Globe,
  User,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  ThumbsUp,
  Award,
  Share2,
  Heart,
  MapPin,
  Briefcase,
  ShoppingCart
} from 'lucide-react';

// Define review type
type Review = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
};

const serviceData = {
  id: 1,
  title: 'تصميم وتطوير موقع ويب احترافي متجاوب',
  slug: 'professional-responsive-website-design',
  description: 'أقدم خدمة تصميم وتطوير مواقع الويب الاحترافية المتجاوبة والمتوافقة مع جميع الأجهزة. سأقوم بإنشاء موقع ويب مخصص وفريد يعكس هوية علامتك التجارية ويلبي احتياجاتك الخاصة.',
  price: 'يبدأ من 500 ر.س',
  rating: 4.9,
  totalReviews: 154,
  ordersInQueue: 3,
  lastDelivery: 'منذ يومين',
  language: 'العربية، الإنجليزية',
  location: 'الرياض، المملكة العربية السعودية',
  createdAt: '10 يوليو 2022',
  gallery: [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1552650904-51b290669eda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1079&q=80',
    'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  ],
  categories: ['تصميم وتطوير المواقع', 'تطوير الويب', 'تصميم واجهة المستخدم'],
  features: [
    'موقع متجاوب مع جميع الأجهزة',
    'تصميم مخصص وفريد',
    'سهولة استخدام لوحة التحكم',
    'تحسين محركات البحث SEO',
    'سرعة تحميل عالية',
    'متوافق مع جميع المتصفحات'
  ],
  packages: [
    {
      id: 1,
      title: 'أساسي',
      price: 500,
      description: 'موقع بسيط متجاوب مكون من 5 صفحات',
      features: [
        'تصميم متجاوب',
        '5 صفحات',
        'تعديلان مجانيان',
        'مدة التنفيذ: 7 أيام',
        'تركيب محتوى أساسي',
        'لوحة تحكم بسيطة'
      ]
    },
    {
      id: 2,
      title: 'قياسي',
      price: 1000,
      description: 'موقع احترافي متجاوب مكون من 10 صفحات',
      features: [
        'تصميم احترافي متجاوب',
        '10 صفحات',
        '5 تعديلات مجانية',
        'مدة التنفيذ: 14 يوم',
        'تركيب المحتوى كاملاً',
        'لوحة تحكم شاملة',
        'دعم فني لمدة شهر',
        'تحسين محركات البحث SEO'
      ],
      popular: true
    },
    {
      id: 3,
      title: 'متقدم',
      price: 2000,
      description: 'موقع احترافي متكامل مخصص بالكامل',
      features: [
        'تصميم فريد واحترافي',
        'عدد صفحات غير محدود',
        'تعديلات غير محدودة',
        'مدة التنفيذ: 30 يوم',
        'تركيب المحتوى كاملاً',
        'لوحة تحكم مخصصة',
        'دعم فني لمدة 3 أشهر',
        'تحسين محركات البحث المتقدم',
        'ربط وسائل التواصل الاجتماعي',
        'تدريب على استخدام الموقع'
      ]
    }
  ],
  freelancer: {
    id: 1,
    name: 'محمد أحمد',
    title: 'مطور ويب بخبرة 6 سنوات',
    bio: 'مطور ويب محترف مع خبرة 6 سنوات في تصميم وتطوير مواقع الويب. متخصص في React وNext.js وتطوير واجهات المستخدم. حاصل على شهادة في علوم الحاسب وأكثر من 200 مشروع منجز.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    level: 'مستوى البائع: متميّز',
    memberSince: 'عضو منذ يناير 2020',
    lastDelivery: 'آخر تسليم: منذ 3 أيام',
    completionRate: 98,
    onTimeRate: 97,
    rating: 4.9,
    totalProjects: 172,
    location: 'الرياض، المملكة العربية السعودية',
    languages: ['العربية', 'الإنجليزية'],
    skills: ['React', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'UI/UX', 'Responsive Design']
  },
  reviews: [
    {
      id: 1,
      name: 'فهد العلي',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      rating: 5,
      date: '12 أبريل 2023',
      content: 'تجربة رائعة مع محمد! قام بتصميم موقع احترافي وجميل يتناسب تماماً مع متطلبات شركتي. العمل سريع ودقيق والتواصل ممتاز. سأتعامل معه مجدداً بكل تأكيد.'
    },
    {
      id: 2,
      name: 'سارة الخالد',
      avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
      rating: 5,
      date: '5 مارس 2023',
      content: 'موقع رائع وسريع وسهل الاستخدام. محمد متعاون جداً ويستجيب لجميع الملاحظات بسرعة وإتقان. أنصح بالتعامل معه.'
    },
    {
      id: 3,
      name: 'عبدالله محمد',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4,
      date: '18 فبراير 2023',
      content: 'تجربة جيدة بشكل عام. الموقع جميل ويعمل بشكل جيد، لكن كان هناك بعض التأخير في التسليم. مع ذلك، أنا راضٍ عن النتيجة النهائية والخدمة.'
    }
  ]
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [service, setService] = useState<any>(serviceData);
  const [reviews, setReviews] = useState<Review[]>(serviceData.reviews);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        if (id) {
          // تحميل بيانات الخدمة من Supabase
          const serviceData = await getServiceById(id);
          if (serviceData) {
            setService(serviceData);
            
            // تحميل المراجعات
            const reviewsData = await getReviewsByTarget(id, 'service');
            if (reviewsData) {
              setReviews(reviewsData);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        toast({
          title: "حدث خطأ",
          description: "لم نتمكن من تحميل بيانات الخدمة",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    // استخدم البيانات المحلية مؤقتًا في حالة عدم وجود اتصال بالقاعدة
    if (id) {
      fetchServiceData();
    }
  }, [id, toast]);
  
  const handleOrder = (packageId: number) => {
    setSelectedPackage(packageId);
    setOrdering(true);
    
    setTimeout(() => {
      setOrdering(false);
      toast({
        title: "تم الطلب بنجاح",
        description: "سيتواصل معك المستقل قريباً لبدء العمل على طلبك.",
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
        <title>{service.title} | منصة علّي</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* شريط التنقل */}
        <div className="mb-6 text-sm breadcrumbs">
          <ul className="flex items-center space-x-2 space-x-reverse rtl:space-x-reverse">
            <li><Link to="/" className="text-gray-500 hover:text-primary">الرئيسية</Link></li>
            <li className="mx-2">/</li>
            <li><Link to="/marketplace" className="text-gray-500 hover:text-primary">سوق الخدمات</Link></li>
            <li className="mx-2">/</li>
            <li className="text-primary">{service.title}</li>
          </ul>
        </div>
        
        {/* معلومات الخدمة الأساسية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 ml-1" />
                <span className="font-bold">{service.rating}</span>
                <span className="text-gray-500 mr-1">({service.totalReviews} تقييم)</span>
              </div>
              
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 text-gray-500 ml-1" />
                <span>{service.ordersInQueue} طلبات في قائمة الانتظار</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 ml-1" />
                <span>آخر تسليم: {service.lastDelivery}</span>
              </div>
            </div>
            
            {/* معرض الصور */}
            <div className="mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                <img 
                  src={service.gallery[activeImageIndex]} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {service.gallery.map((image: string, index: number) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden aspect-video transition ${index === activeImageIndex ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`عرض ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* معلومات الخدمة بالتبويبات */}
            <Tabs defaultValue="description" className="mb-12">
              <TabsList className="mb-6">
                <TabsTrigger value="description" onClick={() => setActiveTab('description')}>وصف الخدمة</TabsTrigger>
                <TabsTrigger value="packages" onClick={() => setActiveTab('packages')}>الباقات والأسعار</TabsTrigger>
                <TabsTrigger value="reviews" onClick={() => setActiveTab('reviews')}>التقييمات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">وصف الخدمة</h2>
                    
                    <p className="text-gray-700 mb-8">
                      {service.description}
                    </p>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">ما الذي تحصل عليه</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        {service.features?.map((feature: string, index: number) => (
                          <div key={index} className="flex">
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0 mt-1" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">معلومات إضافية</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 text-gray-500 ml-3 mt-1" />
                          <div>
                            <p className="font-semibold">تاريخ إنشاء الخدمة</p>
                            <p className="text-gray-600">{service.createdAt}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 text-gray-500 ml-3 mt-1" />
                          <div>
                            <p className="font-semibold">اللغات المدعومة</p>
                            <p className="text-gray-600">{service.language}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-gray-500 ml-3 mt-1" />
                          <div>
                            <p className="font-semibold">الموقع</p>
                            <p className="text-gray-600">{service.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Briefcase className="h-5 w-5 text-gray-500 ml-3 mt-1" />
                          <div>
                            <p className="font-semibold">التصنيفات</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {service.categories?.map((category: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-gray-100">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="packages">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">الباقات والأسعار</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {service.packages?.map((pkg: any) => (
                        <div 
                          key={pkg.id} 
                          className={`border rounded-lg overflow-hidden transition-shadow ${pkg.popular ? 'shadow-lg ring-2 ring-primary ring-opacity-50' : 'shadow hover:shadow-md'}`}
                        >
                          {pkg.popular && (
                            <div className="bg-primary text-white text-center py-1 text-sm font-bold">
                              الأكثر طلباً
                            </div>
                          )}
                          
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-1">{pkg.title}</h3>
                            <p className="text-gray-600 mb-4">{pkg.description}</p>
                            
                            <div className="text-3xl font-bold text-primary mb-6">
                              {pkg.price} ر.س
                            </div>
                            
                            <div className="space-y-3 mb-6">
                              {pkg.features?.map((feature: string, index: number) => (
                                <div key={index} className="flex">
                                  <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                            
                            <Button 
                              className="w-full" 
                              onClick={() => handleOrder(pkg.id)}
                              disabled={ordering && selectedPackage === pkg.id}
                            >
                              {ordering && selectedPackage === pkg.id ? 'جارِ الطلب...' : 'اطلب الآن'}
                            </Button>
                          </div>
                        </div>
                      ))}
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
                          <div className="text-5xl font-bold mb-2">{service.rating}</div>
                          <div className="flex justify-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`h-5 w-5 ${star <= Math.round(service.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{service.totalReviews} تقييم</p>
                        </div>
                        
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            // حساب نسبة التقييمات لكل نجمة
                            const percentage = (rating === 5) ? 80 : (rating === 4) ? 15 : (rating === 3) ? 3 : (rating === 2) ? 1 : 1;
                            
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
                        <h3 className="text-lg font-bold mb-4">تقييمات العملاء</h3>
                        
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
            
            {/* المستقل مزود الخدمة */}
            <Card className="mb-10">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">مزود الخدمة</h2>
                
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={service.freelancer.avatar} alt={service.freelancer.name} />
                    <AvatarFallback>{service.freelancer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{service.freelancer.name}</h3>
                    <p className="text-gray-600 mb-4">{service.freelancer.title}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-4">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-primary ml-2" />
                        <span>{service.freelancer.level}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-500 ml-2" />
                        <span>{service.freelancer.memberSince}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-500 ml-2" />
                        <span>{service.freelancer.lastDelivery}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-500 ml-2" />
                        <span>{service.freelancer.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <ThumbsUp className="h-5 w-5 text-green-500 ml-2" />
                        <span>معدل الإكمال: {service.freelancer.completionRate}%</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 ml-2" />
                        <span>تقييم {service.freelancer.rating} من {service.freelancer.totalProjects} مشروع</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6">
                      {service.freelancer.bio}
                    </p>
                    
                    {service.freelancer.skills && (
                      <div className="mb-6">
                        <h4 className="font-bold mb-2">المهارات</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.freelancer.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <Button>
                        عرض الملف الشخصي
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="ml-2 h-4 w-4" />
                        تواصل مع المستقل
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="hidden lg:block">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 ml-1" />
                      <span className="font-bold">{service.rating}</span>
                      <span className="text-gray-500 mr-1">({service.totalReviews} تقييم)</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-1">الباقات تبدأ من:</p>
                    <div className="text-3xl font-bold text-primary">
                      {service.packages && service.packages.length > 0 
                        ? `${service.packages[0].price} ر.س` 
                        : service.price}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-semibold">حزم الخدمة:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {service.packages?.map((pkg: any) => (
                        <Button
                          key={pkg.id}
                          variant={selectedPackage === pkg.id ? "default" : "outline"}
                          className={pkg.popular ? "border-primary" : ""}
                          onClick={() => setSelectedPackage(pkg.id)}
                        >
                          {pkg.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedPackage && service.packages?.find((pkg: any) => pkg.id === selectedPackage) && (
                      <div className="border rounded-lg p-4">
                        <h4 className="font-bold mb-2">
                          {service.packages.find((pkg: any) => pkg.id === selectedPackage).title}
                        </h4>
                        <p className="text-gray-600 mb-3">
                          {service.packages.find((pkg: any) => pkg.id === selectedPackage).description}
                        </p>
                        <div className="text-xl font-bold text-primary mb-4">
                          {service.packages.find((pkg: any) => pkg.id === selectedPackage).price} ر.س
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => handleOrder(selectedPackage)}
                          disabled={ordering}
                        >
                          {ordering ? 'جارِ الطلب...' : 'اطلب الآن'}
                        </Button>
                      </div>
                    )}
                    
                    {!selectedPackage && (
                      <div className="text-center p-4 border rounded-lg bg-gray-50">
                        <p className="mb-3">الرجاء اختيار إحدى الباقات للمتابعة</p>
                        <ArrowRight className="h-5 w-5 mx-auto text-gray-400 animate-bounce" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <ShieldCheck className="h-5 w-5 text-green-500 ml-2" />
                        <span>ضمان استرداد الأموال</span>
                      </div>
                      <AlertCircle className="h-5 w-5 text-gray-400 cursor-help" />
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <ShieldCheck className="h-5 w-5 text-green-500 ml-2" />
                        <span>الدفع الآمن</span>
                      </div>
                      <AlertCircle className="h-5 w-5 text-gray-400 cursor-help" />
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <ShieldCheck className="h-5 w-5 text-green-500 ml-2" />
                        <span>دعم على مدار الساعة</span>
                      </div>
                      <AlertCircle className="h-5 w-5 text-gray-400 cursor-help" />
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4 space-x-reverse mt-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 ml-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 ml-2" />
                      حفظ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* خدمات مشابهة */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">خدمات ذات صلة</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* سيتم استبدالها بكومبوننت خدمات مشابهة */}
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/600x400?website,design&sig=${item}`} 
                    alt="خدمة" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">تطوير الويب</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm ml-1">4.8</span>
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2">إنشاء موقع إلكتروني متجاوب مع جميع الأجهزة</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="h-4 w-4 ml-1" />
                    <span>يبدأ من 3 أيام</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 ml-2">
                        <AvatarImage src={`https://randomuser.me/api/portraits/men/${item + 20}.jpg`} />
                        <AvatarFallback>م{item}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">مستقل محترف</span>
                    </div>
                    <span className="font-bold text-primary">500 ر.س</span>
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

export default ServiceDetail;
