
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
import { Star, Clock, ChevronLeft, MessageCircle, CheckCircle, AlertCircle, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock data for a service (would be fetched from API in production)
const services = [
  {
    id: "1",
    title: "حملة تسويق عبر البريد الإلكتروني",
    description: "حملات بريد إلكتروني استراتيجية مصممة لإشراك جمهورك، ورعاية العملاء المحتملين، وتعزيز التحويلات.",
    longDescription: "نقدم خدمة إنشاء وإدارة حملات بريد إلكتروني احترافية مصممة لتحقيق أهداف عملك. تشمل خدماتنا تصميم قوالب مخصصة، وإعداد التشغيل الآلي، وتقسيم الجمهور، وتحليل النتائج، وتحسين معدلات الفتح والنقر. نضمن الالتزام بأفضل ممارسات البريد الإلكتروني وقوانين مكافحة البريد المزعج لتحقيق أقصى تفاعل ونتائج.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070",
    sellerName: "خبراء البريد الإلكتروني",
    sellerImage: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4.7,
    reviews: 95,
    price: 249,
    currency: "$",
    tags: ["بريد إلكتروني", "تسويق"],
    features: ["إنشاء استراتيجية", "تصميم قوالب", "إعداد التشغيل الآلي", "تحليلات"],
    faqs: [
      {
        question: "ما هي المدة التي تستغرقها إعداد الحملة؟",
        answer: "يستغرق إعداد الحملة عادة من 3 إلى 5 أيام عمل، اعتمادًا على تعقيد متطلباتك."
      },
      {
        question: "هل تقدمون خدمات متابعة بعد إطلاق الحملة؟",
        answer: "نعم، نقدم تقارير أسبوعية وتحسينات مستمرة لمدة شهر كامل بعد إطلاق الحملة."
      },
      {
        question: "كم عدد الرسائل التي يمكن إرسالها شهريًا؟",
        answer: "باقتنا الأساسية تتضمن ما يصل إلى 10,000 رسالة شهريًا. يمكن زيادة هذا العدد بتكلفة إضافية."
      }
    ],
    packages: [
      {
        name: "أساسية",
        price: 249,
        description: "مناسبة للشركات الصغيرة والمتوسطة",
        features: [
          "استراتيجية بريد إلكتروني",
          "3 قوالب مخصصة",
          "إعداد التشغيل الآلي الأساسي",
          "تقرير أسبوعي",
          "دعم لمدة شهر"
        ],
        deliveryTime: "7 أيام"
      },
      {
        name: "احترافية",
        price: 499,
        description: "مناسبة للشركات المتوسطة والكبيرة",
        features: [
          "استراتيجية بريد إلكتروني متقدمة",
          "5 قوالب مخصصة",
          "إعداد التشغيل الآلي المتقدم",
          "تقسيم الجمهور",
          "تقرير أسبوعي مفصل",
          "دعم لمدة 3 أشهر"
        ],
        deliveryTime: "10 أيام"
      },
      {
        name: "متقدمة",
        price: 999,
        description: "مناسبة للمؤسسات الكبرى",
        features: [
          "استراتيجية بريد إلكتروني متكاملة",
          "10 قوالب مخصصة",
          "إعداد التشغيل الآلي المتقدم",
          "تقسيم الجمهور المتقدم",
          "اختبار A/B",
          "تقرير يومي مفصل",
          "دعم لمدة 6 أشهر"
        ],
        deliveryTime: "15 يوم"
      }
    ]
  },
  {
    id: "2",
    title: "حزمة تحسين محركات البحث",
    description: "تحسين شامل لمحركات البحث لتحسين ترتيب موقع الويب الخاص بك وجذب حركة المرور العضوية.",
    longDescription: "نقدم خدمة تحسين محركات البحث (SEO) الشاملة لتحسين ظهور موقعك في نتائج البحث وزيادة حركة المرور العضوية. تشمل خدماتنا تحليل الكلمات المفتاحية، وتحسين المحتوى، وتحسين العوامل التقنية، وبناء الروابط الخلفية، والتقارير الدورية. نستخدم أحدث التقنيات والاستراتيجيات المتوافقة مع خوارزميات محركات البحث لتحقيق نتائج مستدامة.",
    image: "https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?q=80&w=2070",
    sellerName: "بروز SEO",
    sellerImage: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4.8,
    reviews: 127,
    price: 349,
    currency: "$",
    tags: ["SEO", "موقع الكتروني"],
    features: ["بحث الكلمات المفتاحية", "تحسين الصفحات", "بناء الروابط", "تقرير شهري"],
    faqs: [
      {
        question: "كم من الوقت يستغرق ظهور نتائج SEO؟",
        answer: "عادة ما تبدأ النتائج الأولية في الظهور خلال 1-3 أشهر، ولكن النتائج المستدامة تتحقق على مدى 6-12 شهر."
      },
      {
        question: "هل تقدمون ضمانات للظهور في الصفحة الأولى؟",
        answer: "لا نقدم ضمانات محددة للترتيب، لأن ذلك يتأثر بعوامل خارجية متعددة. لكننا نضمن تطبيق أفضل الممارسات لتحقيق أفضل النتائج الممكنة."
      },
      {
        question: "هل تقدمون تقارير دورية حول التقدم؟",
        answer: "نعم، نقدم تقارير شهرية مفصلة توضح التغييرات في الترتيب، وحركة المرور، ومعدلات التحويل، والتحسينات المطبقة."
      }
    ],
    packages: [
      {
        name: "أساسية",
        price: 349,
        description: "مناسبة للشركات الصغيرة والمواقع الجديدة",
        features: [
          "تحليل 10 كلمات مفتاحية",
          "تحسين 5 صفحات",
          "تحسين العوامل التقنية الأساسية",
          "تقرير شهري"
        ],
        deliveryTime: "30 يوم"
      },
      {
        name: "احترافية",
        price: 699,
        description: "مناسبة للشركات المتوسطة والمواقع القائمة",
        features: [
          "تحليل 25 كلمة مفتاحية",
          "تحسين 15 صفحة",
          "تحسين العوامل التقنية الشامل",
          "5 روابط خلفية عالية الجودة",
          "تقرير أسبوعي"
        ],
        deliveryTime: "45 يوم"
      },
      {
        name: "متقدمة",
        price: 1299,
        description: "مناسبة للمؤسسات الكبرى والمواقع المعقدة",
        features: [
          "تحليل 50 كلمة مفتاحية",
          "تحسين 30 صفحة",
          "تحسين العوامل التقنية المتقدم",
          "15 رابط خلفي عالي الجودة",
          "استراتيجية محتوى",
          "تقرير أسبوعي مفصل"
        ],
        deliveryTime: "60 يوم"
      }
    ]
  }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Find the service based on the ID
  const service = services.find(s => s.id === id) || services[0];
  
  const handleContactSeller = () => {
    toast({
      title: "تم إرسال رسالتك",
      description: "سيتواصل معك البائع قريباً.",
    });
  };
  
  const handleOrder = (packageName: string) => {
    toast({
      title: "تم إضافة الطلب إلى السلة",
      description: `تم إضافة باقة ${packageName} إلى سلة المشتريات.`,
    });
  };
  
  return (
    <>
      <Helmet>
        <title>{service.title} | سوق الخدمات</title>
        <meta name="description" content={service.description} />
      </Helmet>
      
      <Navbar />
      
      <main className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" className="text-gray-600" asChild>
              <a href="/marketplace">
                <ChevronLeft className="h-4 w-4 ml-1" />
                العودة إلى السوق
              </a>
            </Button>
          </div>
          
          {/* Service Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-auto max-h-[400px] object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h1>
                    
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="mx-1 font-medium">{service.rating}</span>
                      </div>
                      <span className="text-gray-500">({service.reviews} تقييم)</span>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{service.longDescription}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 ml-3">
                          <AvatarImage src={service.sellerImage} alt={service.sellerName} />
                          <AvatarFallback>{service.sellerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{service.sellerName}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="h-3 w-3 text-yellow-500 ml-1" />
                            <span>{service.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button onClick={handleContactSeller}>
                        <MessageCircle className="h-4 w-4 ml-2" />
                        تواصل مع البائع
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="description" className="mt-8">
                <TabsList className="w-full max-w-md grid grid-cols-3">
                  <TabsTrigger value="description">الوصف</TabsTrigger>
                  <TabsTrigger value="features">المميزات</TabsTrigger>
                  <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">وصف الخدمة</h3>
                      <p className="text-gray-700">{service.longDescription}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="features" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">مميزات الخدمة</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="faq" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">الأسئلة الشائعة</h3>
                      <div className="space-y-6">
                        {service.faqs.map((faq, index) => (
                          <div key={index}>
                            <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                            <p className="text-gray-700">{faq.answer}</p>
                            {index < service.faqs.length - 1 && <Separator className="mt-4" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">اختر الباقة المناسبة</h3>
                  
                  <div className="space-y-6">
                    {service.packages.map((pkg, index) => (
                      <div 
                        key={index} 
                        className={`border rounded-lg p-4 ${index === 1 ? 'bg-blue-50 border-blue-200' : ''}`}
                      >
                        {index === 1 && (
                          <Badge className="mb-2 bg-blue-500">الأكثر طلباً</Badge>
                        )}
                        <h4 className="text-lg font-semibold">{pkg.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                        <div className="text-2xl font-bold text-blue-600 mb-4">
                          {service.currency}{pkg.price}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <Clock className="h-4 w-4 ml-1" />
                          <span>مدة التسليم: {pkg.deliveryTime}</span>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          {pkg.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Button 
                          className="w-full" 
                          variant={index === 1 ? "default" : "outline"}
                          onClick={() => handleOrder(pkg.name)}
                        >
                          اطلب الآن
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="ghost" className="text-gray-600" size="sm">
                      <Share2 className="h-4 w-4 ml-1" />
                      مشاركة الخدمة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">تقييمات العملاء</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((review) => (
                <Card key={review}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={`https://randomuser.me/api/portraits/${review % 2 === 0 ? 'women' : 'men'}/${20 + review}.jpg`} />
                        <AvatarFallback>عميل</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">عميل {review}</h4>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">منذ {review} {review === 1 ? 'شهر' : 'أشهر'}</p>
                        <p className="mt-3">
                          خدمة ممتازة وتنفيذ احترافي. كانت النتائج أفضل مما توقعت وسأتعامل مع هذا البائع مرة أخرى بالتأكيد.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline">عرض جميع التقييمات ({service.reviews})</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ServiceDetail;
