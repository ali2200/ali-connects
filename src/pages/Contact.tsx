
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, MessageSquare, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // في الحالة الفعلية، سيتم هنا إرسال البيانات إلى API
    toast({
      title: "تم استلام رسالتك",
      description: "سنقوم بالرد عليك في أقرب وقت ممكن. شكراً لتواصلك معنا.",
    });
  };

  return (
    <>
      <Helmet>
        <title>اتصل بنا | علي للأعمال</title>
        <meta name="description" content="تواصل مع فريق دعم علي للأعمال، نحن هنا لمساعدتك والإجابة على جميع استفساراتك" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <section className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">تواصل معنا</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">الهاتف</h3>
                <p className="text-gray-600">+966 12 345 6789</p>
                <p className="text-gray-600">الأحد - الخميس: 9 صباحاً - 5 مساءً</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-600">info@aliworks.sa</p>
                <p className="text-gray-600">support@aliworks.sa</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-purple-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">العنوان</h3>
                <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                <p className="text-gray-600">شارع العليا، برج المملكة، الطابق 20</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">أرسل لنا رسالة</h2>
                <p className="text-gray-700 mb-6">
                  نحن هنا للإجابة على جميع استفساراتك وتقديم الدعم اللازم. يرجى ملء النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input id="name" required placeholder="أدخل اسمك الكامل" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" required placeholder="أدخل بريدك الإلكتروني" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input id="subject" required placeholder="أدخل موضوع الرسالة" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea id="message" required placeholder="اكتب رسالتك هنا..." className="min-h-[150px]" />
                  </div>
                  
                  <Button type="submit" className="w-full">إرسال الرسالة</Button>
                </form>
              </div>
              
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">معلومات إضافية</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        <MessageSquare className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">الدعم الفني</h3>
                        <p className="text-gray-600 text-sm">للمساعدة في حل المشاكل التقنية</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">أوقات العمل</h3>
                        <p className="text-gray-600 text-sm">الأحد - الخميس: 9 صباحاً - 5 مساءً</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-blue-700 mb-2">المساعدة السريعة</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      يمكنك الاطلاع على قسم الأسئلة الشائعة للحصول على إجابات لمعظم الاستفسارات.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/faq">الأسئلة الشائعة</a>
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 lg:mt-0">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">تابعنا على منصات التواصل الاجتماعي</h3>
                    <div className="flex space-x-4 space-x-reverse mt-3">
                      <a href="#" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                        {/* رمز تويتر */}
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition-colors">
                        {/* رمز فيسبوك */}
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
                        {/* رمز انستجرام */}
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                        {/* رمز لينكد إن */}
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
