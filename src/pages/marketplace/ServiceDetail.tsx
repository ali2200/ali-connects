
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getServiceById, getReviewsByTarget } from '@/lib/supabase';

import {
  Star,
  Clock,
  Check,
  Users,
  MessageSquare,
  ThumbsUp,
  MapPin,
  Calendar,
  Award,
  Share2,
  Heart,
  AlertCircle,
  Briefcase,
  ShoppingCart
} from 'lucide-react';

const serviceData = {
  id: 1,
  title: 'تصميم وتطوير مواقع ويب احترافية متجاوبة',
  description: 'سأقوم بتصميم وتطوير موقع ويب احترافي متجاوب باستخدام أحدث التقنيات والأدوات. الموقع سيكون متوافقًا مع جميع أحجام الشاشات، سريع، وصديق لمحركات البحث (SEO). يشمل العمل تصميم الواجهة، تطوير الموقع، وضبط الأداء للحصول على أفضل النتائج.',
  longDescription: 'إذا كنت تبحث عن تصميم وتطوير موقع ويب احترافي، فأنت في المكان الصحيح. أنا مطور ويب متخصص مع خبرة أكثر من 7 سنوات في بناء مواقع ويب عالية الجودة لمختلف المجالات والصناعات. أعتمد على أحدث التقنيات وأفضل الممارسات في تطوير الويب لضمان حصولك على موقع سريع، متجاوب، وصديق لمحركات البحث.\n\nعند اختيار هذه الخدمة، ستحصل على تصميم مخصص يعكس هوية علامتك التجارية ويلبي احتياجات عملك وجمهورك المستهدف. سأهتم بكل التفاصيل من الألوان والخطوط إلى تجربة المستخدم وسهولة التنقل. كما سأضمن أن يكون موقعك متوافقًا مع معايير الويب الحديثة وقابلًا للوصول لجميع المستخدمين.',
  price: 1500,
  deliveryTime: '7-10 أيام',
  revisions: 'غير محدود',
  category: 'تطوير مواقع',
  rating: 4.9,
  reviews: 87,
  orders: 124,
  status: 'active',
  tags: ['تصميم مواقع', 'تطوير ويب', 'ووردبريس', 'HTML/CSS', 'تصميم متجاوب'],
  images: [
    'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1736&q=80'
  ],
  packages: [
    {
      id: 1,
      name: 'أساسي',
      price: 1500,
      deliveryTime: '7 أيام',
      revisions: 2,
      features: [
        'تصميم متجاوب',
        'حتى 5 صفحات',
        'تحسين SEO أساسي',
        'توافق مع المتصفحات',
        'تكامل وسائل التواصل الاجتماعي'
      ]
    },
    {
      id: 2,
      name: 'قياسي',
      price: 2500,
      deliveryTime: '10 أيام',
      revisions: 5,
      features: [
        'جميع مميزات الباقة الأساسية',
        'حتى 10 صفحات',
        'لوحة تحكم سهلة',
        'تدريب على استخدام الموقع',
        'تحسين SEO متقدم',
        'تكامل نموذج اتصال'
      ]
    },
    {
      id: 3,
      name: 'متقدم',
      price: 4000,
      deliveryTime: '15 يوم',
      revisions: 'غير محدود',
      features: [
        'جميع مميزات الباقة القياسية',
        'حتى 20 صفحة',
        'متجر إلكتروني',
        'نظام حجز/دفع',
        'تكامل وسائل الدفع',
        'دعم فني لمدة شهر',
        'تحسين سرعة الموقع',
        'شهادة SSL'
      ]
    }
  ],
  freelancer: {
    id: 1,
    name: 'محمد أحمد',
    title: 'مطور ويب محترف',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    country: 'المملكة العربية السعودية',
    city: 'الرياض',
    memberSince: 'يناير 2020',
    completedProjects: 124,
    rating: 4.9,
    responseTime: '2 ساعة',
    lastDelivery: 'قبل يومين',
    description: 'مطور ويب بخبرة أكثر من 7 سنوات في تصميم وتطوير مواقع الويب الاحترافية. متخصص في تقنيات الواجهة الأمامية والخلفية، وخبير في تحسين تجربة المستخدم وأداء المواقع. حاصل على شهادات في React و Node.js و WordPress وغيرها من التقنيات الحديثة.'
  },
  faq: [
    {
      question: 'ما هي المعلومات التي تحتاجها مني لبدء المشروع؟',
      answer: 'سأحتاج إلى فهم متطلباتك بالتفصيل، مثل نوع الموقع، والمحتوى، والألوان المفضلة، وأمثلة على المواقع التي تعجبك. سأرسل لك استبيانًا مفصلاً بعد الطلب لجمع كل المعلومات اللازمة.'
    },
    {
      question: 'هل يمكنني طلب تعديلات على التصميم؟',
      answer: 'نعم بالطبع، يمكنك طلب تعديلات حسب الباقة التي تختارها. الباقة الأساسية تتضمن تعديلين، والقياسية 5 تعديلات، والمتقدمة تعديلات غير محدودة حتى تكون راضيًا تمامًا عن النتيجة.'
    },
    {
      question: 'هل تقدم خدمات الاستضافة والدومين؟',
      answer: 'لا أقدم خدمات الاستضافة والدومين مباشرة، لكن يمكنني مساعدتك في اختيار أفضل الخيارات المناسبة لموقعك وإرشادك خلال عملية الشراء والإعداد.'
    },
    {
      question: 'هل يمكنني تحديث الموقع بنفسي بعد الانتهاء؟',
      answer: 'نعم، سأقوم بإنشاء الموقع باستخدام نظام إدارة محتوى سهل الاستخدام (مثل ووردبريس) وسأقدم لك تدريبًا على كيفية تحديث المحتوى بنفسك بسهولة.'
    }
  ],
  reviews: [
    {
      id: 1,
      name: 'أحمد محمود',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      rating: 5,
      date: '15 مايو 2023',
      content: 'تجربة رائعة، حصلت على موقع احترافي تمامًا كما توقعت وأكثر. التسليم كان في الوقت المحدد والتواصل كان ممتازًا. سأتعامل معه مرة أخرى بالتأكيد.'
    },
    {
      id: 2,
      name: 'سارة علي',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      rating: 5,
      date: '3 أبريل 2023',
      content: 'محمد محترف جدًا وملتزم بالمواعيد. صمم لي موقعًا مميزًا لمتجري الإلكتروني وساعدني في كل خطوة. الموقع يعمل بشكل ممتاز على جميع الأجهزة وسريع جدًا. شكرًا جزيلاً!'
    },
    {
      id: 3,
      name: 'خالد عبدالله',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4,
      date: '20 مارس 2023',
      content: 'تجربة جيدة بشكل عام. الموقع جميل ويعمل بشكل جيد، لكن كان هناك بعض التأخير في التسليم. مع ذلك، أنا راضٍ عن النتيجة النهائية والخدمة.'
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

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [service, setService] = useState<any>(serviceData);
  const [reviews, setReviews] = useState<Review[]>(serviceData.reviews);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<number>(0);
  
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        if (id) {
          const serviceData = await getServiceById(id);
          if (serviceData) {
            setService(serviceData);
            
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
    
    if (id) {
      fetchServiceData();
    }
  }, [id, toast]);
  
  const handleOrder = (packageId: number) => {
    toast({
      title: "تم إضافة الطلب بنجاح",
      description: "سيتم التواصل معك قريبًا لبدء العمل على المشروع",
    });
  };
  
  const handleContactFreelancer = () => {
    toast({
      title: "تم إرسال الرسالة",
      description: "سيتم الرد عليك في أقرب وقت ممكن",
    });
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
        <div className="mb-6 text-sm breadcrumbs">
          <ul className="flex items-center space-x-2 space-x-reverse rtl:space-x-reverse">
            <li><Link to="/" className="text-gray-500 hover:text-primary">الرئيسية</Link></li>
            <li className="mx-2">/</li>
            <li><Link to="/marketplace" className="text-gray-500 hover:text-primary">سوق الخدمات</Link></li>
            <li className="mx-2">/</li>
            <li className="text-primary">{service.title}</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 ml-2">
                  <AvatarImage src={service.freelancer.avatar} alt={service.freelancer.name} />
                  <AvatarFallback>{service.freelancer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{service.freelancer.name}</p>
                  <p className="text-gray-500 text-sm">{service.freelancer.title}</p>
                </div>
              </div>
              
              <div className="flex items-center mr-auto">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 ml-1" />
                <span className="font-bold">{service.rating}</span>
                <span className="text-gray-500 mr-1">({service.reviews} تقييم)</span>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="relative rounded-lg overflow-hidden mb-4 aspect-[16/9]">
                <img
                  src={service.images[currentImage]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {service.images.map((image: string, index: number) => (
                  <div 
                    key={index}
                    className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 ${index === currentImage ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img
                      src={image}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">وصف الخدمة</h2>
              <div className="prose prose-lg max-w-none">
                {service.longDescription.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>
              <div className="space-y-4">
                {service.faq.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-bold mb-2">{item.question}</h3>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">التقييمات ({service.reviews})</h2>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 ml-1" />
                  <span className="font-bold text-lg">{service.rating}</span>
                </div>
              </div>
              
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
          
          <div className="col-span-1">
            <Card className="sticky top-24">
              <div className="border-b">
                <TabsList className="w-full rounded-none border-b">
                  {service.packages.map((pkg: any) => (
                    <TabsTrigger 
                      key={pkg.id} 
                      value={pkg.id.toString()} 
                      className="flex-1"
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {service.packages.map((pkg: any) => (
                <CardContent key={pkg.id} className={`p-6 ${selectedPackage === pkg.id ? 'block' : 'hidden'}`}>
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-lg font-bold">{pkg.name}</h3>
                    <span className="text-2xl font-bold text-primary">{pkg.price} ر.س</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="h-4 w-4 ml-2" />
                    <span>مدة التسليم: {pkg.deliveryTime}</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold">المميزات:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 ml-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button onClick={() => handleOrder(pkg.id)} className="w-full" size="lg">
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    طلب الخدمة الآن
                  </Button>
                </CardContent>
              ))}
              
              <CardFooter className="p-4 bg-gray-50 flex justify-center border-t">
                <Button variant="outline" onClick={handleContactFreelancer}>
                  <MessageSquare className="h-4 w-4 ml-2" />
                  تواصل مع البائع
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-16 w-16 ml-4">
                    <AvatarImage src={service.freelancer.avatar} alt={service.freelancer.name} />
                    <AvatarFallback>{service.freelancer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{service.freelancer.name}</h3>
                    <p className="text-gray-600">{service.freelancer.title}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 ml-1" />
                      <span>{service.freelancer.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 ml-2 text-gray-500" />
                    <span>{service.freelancer.city}، {service.freelancer.country}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 ml-2 text-gray-500" />
                    <span>عضو منذ {service.freelancer.memberSince}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 ml-2 text-gray-500" />
                    <span>متوسط وقت الرد: {service.freelancer.responseTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 ml-2 text-gray-500" />
                    <span>المشاريع المكتملة: {service.freelancer.completedProjects}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 ml-2 text-gray-500" />
                    <span>آخر تسليم: {service.freelancer.lastDelivery}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  {service.freelancer.description}
                </p>
                
                <Button variant="outline" className="w-full">
                  عرض الملف الشخصي
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">خدمات مشابهة قد تعجبك</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/600x400?webdesign&sig=${item}`} 
                    alt="خدمة" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white/80 text-gray-800">{item + 1499} ر.س</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                      تطوير مواقع
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm ml-1">4.8</span>
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2">تصميم وتطوير موقع إلكتروني احترافي متكامل</h3>
                  <div className="flex items-center mb-3">
                    <Avatar className="h-6 w-6 ml-2">
                      <AvatarImage src={`https://randomuser.me/api/portraits/men/${item + 15}.jpg`} />
                      <AvatarFallback>م{item}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">مستقل محترف</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 justify-between">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 ml-1" />
                      <span>97%</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 ml-1" />
                      <span>78 عميل</span>
                    </div>
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
