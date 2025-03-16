
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgeCheck, BookOpen, ArrowUpRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const learningPaths = [
  {
    id: 1,
    title: "مطور واجهات أمامية متكامل",
    description: "تعلم تطوير واجهات المستخدم من الصفر وحتى مستوى متقدم باستخدام أحدث التقنيات.",
    level: "مبتدئ إلى متقدم",
    duration: "6 أشهر",
    courses: 12,
    features: [
      "شهادة معتمدة عند الانتهاء",
      "مشاريع عملية واقعية",
      "دعم فني على مدار الساعة",
      "منتدى خاص للمتعلمين"
    ]
  },
  {
    id: 2,
    title: "تصميم تجربة المستخدم UI/UX",
    description: "احترف تصميم واجهات تطبيقات الويب والجوال مع التركيز على تجربة المستخدم.",
    level: "متوسط",
    duration: "4 أشهر",
    courses: 8,
    features: [
      "تعلم استخدام Figma و Adobe XD",
      "بناء محفظة أعمال احترافية",
      "جلسات نقد وتقييم مع الخبراء",
      "مشروع تخرج تحت إشراف مصممين محترفين"
    ]
  },
  {
    id: 3,
    title: "تطوير تطبيقات الموبايل",
    description: "تعلم برمجة تطبيقات الجوال لنظامي Android و iOS باستخدام تقنيات حديثة.",
    level: "متوسط إلى متقدم",
    duration: "5 أشهر",
    courses: 10,
    features: [
      "التعرف على React Native و Flutter",
      "بناء مشاريع حقيقية قابلة للنشر",
      "التكامل مع واجهات برمجة التطبيقات",
      "الربط مع خدمات السحابة"
    ]
  },
  {
    id: 4,
    title: "التسويق الرقمي المتكامل",
    description: "أتقن مهارات التسويق الرقمي المختلفة وكيفية تنفيذ حملات تسويقية ناجحة.",
    level: "مبتدئ إلى متوسط",
    duration: "3 أشهر",
    courses: 7,
    features: [
      "تحسين محركات البحث SEO",
      "إعلانات Google و Facebook",
      "إدارة وسائل التواصل الاجتماعي",
      "تحليل البيانات واستخراج التقارير"
    ]
  }
];

const LearningPaths = () => {
  return (
    <>
      <Helmet>
        <title>مسارات التعلم | علي للأعمال</title>
        <meta name="description" content="مسارات التعلم المتكاملة لتطوير مهاراتك وتعزيز فرصك في سوق العمل" />
      </Helmet>
      <Navbar />
      
      <main className="pt-28 pb-16">
        <section className="bg-ali-blue/5 py-12 mb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">مسارات التعلم المتكاملة</h1>
              <p className="text-gray-600 mb-6">ابدأ رحلتك الاحترافية من خلال مسارات تعليمية منظمة ومدروسة لتحقيق أهدافك المهنية</p>
              <Button size="lg">استكشف المسارات</Button>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {learningPaths.map((path) => (
              <Card key={path.id} className="overflow-hidden border-2 hover:border-ali-blue/50 transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                    <p className="text-gray-600 mb-4">{path.description}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        المستوى: {path.level}
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        المدة: {path.duration}
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                        <BookOpen className="h-4 w-4 ml-1" />
                        {path.courses} دورة
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <h4 className="font-medium mb-3">المميزات:</h4>
                    <ul className="space-y-2">
                      {path.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <BadgeCheck className="h-5 w-5 text-green-500 ml-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 flex justify-between items-center">
                    <span className="font-medium">سجل الآن</span>
                    <Button>
                      عرض التفاصيل
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default LearningPaths;
