
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Clock, Users, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const certifications = [
  {
    id: 1,
    title: "مطور الواجهات الأمامية المعتمد",
    category: "تطوير ويب",
    level: "متقدم",
    duration: "3 ساعات",
    questions: 120,
    price: 199,
    popular: true,
    description: "شهادة احترافية تثبت مهاراتك في تطوير واجهات المستخدم باستخدام HTML5 و CSS3 و JavaScript والأطر الحديثة.",
    topics: [
      "HTML5 و CSS3 المتقدمة",
      "JavaScript ES6+",
      "إطار العمل React.js",
      "إدارة الحالة (State Management)",
      "تحسين الأداء والوصول"
    ]
  },
  {
    id: 2,
    title: "محلل بيانات معتمد",
    category: "تحليل بيانات",
    level: "متوسط",
    duration: "2.5 ساعة",
    questions: 90,
    price: 149,
    popular: false,
    description: "شهادة تؤكد قدرتك على تحليل البيانات واستخلاص الرؤى منها باستخدام الأدوات والتقنيات الحديثة.",
    topics: [
      "تحليل البيانات الإحصائي",
      "استخدام Python للتحليل",
      "إنشاء التقارير والرسوم البيانية",
      "استخدام SQL للاستعلام عن البيانات",
      "التعلم الآلي الأساسي"
    ]
  },
  {
    id: 3,
    title: "مدير مشاريع رقمية",
    category: "إدارة مشاريع",
    level: "متقدم",
    duration: "4 ساعات",
    questions: 150,
    price: 249,
    popular: true,
    description: "شهادة تثبت قدرتك على إدارة المشاريع الرقمية بكفاءة من البداية إلى النهاية باستخدام المنهجيات الحديثة.",
    topics: [
      "منهجيات Agile و Scrum",
      "إدارة الموارد والميزانيات",
      "إدارة المخاطر",
      "أدوات إدارة المشاريع",
      "مهارات التواصل والقيادة"
    ]
  },
  {
    id: 4,
    title: "أخصائي تسويق رقمي معتمد",
    category: "تسويق",
    level: "متوسط",
    duration: "3 ساعات",
    questions: 110,
    price: 179,
    popular: false,
    description: "شهادة تثبت خبرتك في مجال التسويق الرقمي وقدرتك على تنفيذ استراتيجيات تسويقية ناجحة.",
    topics: [
      "تحسين محركات البحث (SEO)",
      "الإعلانات المدفوعة (PPC)",
      "التسويق عبر وسائل التواصل الاجتماعي",
      "التسويق بالمحتوى",
      "تحليل البيانات التسويقية"
    ]
  }
];

const Certifications = () => {
  return (
    <>
      <Helmet>
        <title>الشهادات والاختبارات | علي للأعمال</title>
        <meta name="description" content="احصل على شهادات احترافية معتمدة تؤكد مهاراتك وتعزز فرصك في سوق العمل" />
      </Helmet>
      <Navbar />
      
      <main className="pt-28 pb-16">
        <section className="bg-ali-blue/5 py-12 mb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">الشهادات والاختبارات المهنية</h1>
              <p className="text-gray-600 mb-6">حصّل شهادات معتمدة تثبت مهاراتك وتفتح لك آفاق فرص عمل جديدة</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg">استعرض الشهادات</Button>
                <Button variant="outline" size="lg">كيف تعمل الاختبارات؟</Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 mb-14">
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">الشهادات المتاحة</h2>
              <TabsList>
                <TabsTrigger value="all">الجميع</TabsTrigger>
                <TabsTrigger value="development">تطوير</TabsTrigger>
                <TabsTrigger value="design">تصميم</TabsTrigger>
                <TabsTrigger value="marketing">تسويق</TabsTrigger>
                <TabsTrigger value="business">أعمال</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {certifications.map((cert) => (
                <Card key={cert.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-0">
                    <div className="relative p-6">
                      {cert.popular && (
                        <Badge className="absolute top-6 left-6 bg-ali-blue text-white">الأكثر طلباً</Badge>
                      )}
                      <div className="flex items-center mb-3 gap-2">
                        <Award className="h-5 w-5 text-ali-blue" />
                        <span className="text-sm font-medium text-ali-blue">{cert.category}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{cert.title}</h3>
                      <p className="text-gray-600 mb-5">{cert.description}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-5">
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 ml-1 text-gray-500" />
                          <span>المستوى: {cert.level}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 ml-1 text-gray-500" />
                          <span>المدة: {cert.duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 ml-1 text-gray-500" />
                          <span>{cert.questions} سؤال</span>
                        </div>
                      </div>
                      
                      <h4 className="font-medium mb-2">الموضوعات:</h4>
                      <ul className="space-y-1 mb-5">
                        {cert.topics.map((topic, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {topic}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 flex justify-between items-center">
                      <div>
                        <span className="text-ali-blue font-bold text-lg">{cert.price} ر.س</span>
                      </div>
                      <Button>
                        التسجيل الآن
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="development">
              <div className="min-h-[200px] flex items-center justify-center">
                <p className="text-gray-500">عرض شهادات تطوير الويب والبرمجة فقط</p>
              </div>
            </TabsContent>
            
            <TabsContent value="design">
              <div className="min-h-[200px] flex items-center justify-center">
                <p className="text-gray-500">عرض شهادات التصميم والجرافيك فقط</p>
              </div>
            </TabsContent>
            
            <TabsContent value="marketing">
              <div className="min-h-[200px] flex items-center justify-center">
                <p className="text-gray-500">عرض شهادات التسويق الرقمي فقط</p>
              </div>
            </TabsContent>
            
            <TabsContent value="business">
              <div className="min-h-[200px] flex items-center justify-center">
                <p className="text-gray-500">عرض شهادات إدارة الأعمال فقط</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Certifications;
