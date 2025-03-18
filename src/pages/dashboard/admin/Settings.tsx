
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, 
  SheetTitle, SheetTrigger 
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, Save, Globe, Mail, Bell, Lock, 
  FileText, Image, UserPlus, Key, ShieldCheck, Rocket 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ إعدادات الموقع بنجاح",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>إعدادات الموقع | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="إعدادات الموقع">
        <div className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-6 w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-5 h-auto">
              <TabsTrigger value="general" className="py-2">
                <Globe className="h-4 w-4 ml-2" />
                عام
              </TabsTrigger>
              <TabsTrigger value="email" className="py-2">
                <Mail className="h-4 w-4 ml-2" />
                البريد الإلكتروني
              </TabsTrigger>
              <TabsTrigger value="appearance" className="py-2">
                <Image className="h-4 w-4 ml-2" />
                المظهر
              </TabsTrigger>
              <TabsTrigger value="security" className="py-2">
                <ShieldCheck className="h-4 w-4 ml-2" />
                الأمان
              </TabsTrigger>
              <TabsTrigger value="advanced" className="py-2">
                <Rocket className="h-4 w-4 ml-2" />
                متقدم
              </TabsTrigger>
            </TabsList>
            
            {/* إعدادات عامة */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>الإعدادات العامة</CardTitle>
                  <CardDescription>
                    إعدادات الموقع الأساسية
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">اسم الموقع</label>
                    <Input defaultValue="منصة علي" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">شعار الموقع</label>
                    <div className="flex items-center gap-2">
                      <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                        <img src="/placeholder.svg" alt="شعار الموقع" className="max-h-12" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Image className="h-4 w-4 ml-2" />
                        تغيير الشعار
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">وصف الموقع</label>
                    <Textarea 
                      defaultValue="منصة علي هي المنصة الرائدة للعمل الحر والتعليم عن بعد في العالم العربي" 
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رابط الموقع</label>
                    <Input defaultValue="https://ali-platform.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البريد الإلكتروني للإدارة</label>
                    <Input defaultValue="admin@ali-platform.com" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">وضع الصيانة</label>
                      <p className="text-xs text-muted-foreground">
                        تفعيل وضع الصيانة سيمنع الوصول للموقع من قبل الزوار
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* إعدادات البريد الإلكتروني */}
            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات البريد الإلكتروني</CardTitle>
                  <CardDescription>
                    إعداد خدمة البريد الإلكتروني لإرسال الإشعارات والرسائل
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">مزود خدمة البريد الإلكتروني</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>SMTP مخصص</option>
                      <option>SendGrid</option>
                      <option>Mailgun</option>
                      <option>Amazon SES</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">خادم SMTP</label>
                    <Input defaultValue="smtp.example.com" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">منفذ SMTP</label>
                      <Input defaultValue="587" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">تشفير</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>TLS</option>
                        <option>SSL</option>
                        <option>بدون تشفير</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">اسم المستخدم</label>
                    <Input defaultValue="noreply@ali-platform.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">كلمة المرور</label>
                    <Input type="password" defaultValue="********" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البريد الإلكتروني المرسل</label>
                    <Input defaultValue="منصة علي <noreply@ali-platform.com>" />
                  </div>
                  
                  <Button variant="outline">
                    إرسال بريد تجريبي
                  </Button>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>قوالب البريد الإلكتروني</CardTitle>
                  <CardDescription>
                    تخصيص قوالب البريد الإلكتروني المرسلة للمستخدمين
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <UserPlus className="h-4 w-4 ml-2" />
                          ترحيب المستخدمين الجدد
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-full max-w-lg sm:max-w-xl">
                        <SheetHeader>
                          <SheetTitle>قالب ترحيب المستخدمين الجدد</SheetTitle>
                          <SheetDescription>
                            البريد الإلكتروني المرسل للمستخدمين الجدد عند التسجيل
                          </SheetDescription>
                        </SheetHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">عنوان البريد</label>
                            <Input defaultValue="مرحباً بك في منصة علي" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">محتوى البريد</label>
                            <Textarea 
                              className="min-h-[200px]"
                              defaultValue={`مرحباً {user_name}،

نرحب بك في منصة علي، المنصة الرائدة للعمل الحر والتعليم في العالم العربي.

للبدء، يمكنك استكمال ملفك الشخصي من خلال الرابط التالي:
{profile_link}

إذا كان لديك أي استفسار، لا تتردد في التواصل معنا.

مع أطيب التحيات،
فريق منصة علي`}
                            />
                          </div>
                        </div>
                        <SheetFooter>
                          <Button onClick={handleSaveSettings}>حفظ القالب</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Key className="h-4 w-4 ml-2" />
                      استعادة كلمة المرور
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 ml-2" />
                      إشعارات النظام
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 ml-2" />
                      تأكيد الطلبات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* إعدادات المظهر */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات المظهر</CardTitle>
                  <CardDescription>
                    تخصيص مظهر الموقع وشكله
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">السمة الرئيسية</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="theme" 
                          id="theme-light" 
                          className="sr-only" 
                          defaultChecked 
                        />
                        <label 
                          htmlFor="theme-light"
                          className="block border-2 border-primary p-2 rounded-lg cursor-pointer"
                        >
                          <div className="h-20 bg-white rounded flex flex-col">
                            <div className="bg-blue-500 h-6 rounded-t"></div>
                            <div className="flex-1 p-2">
                              <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                              <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                          <p className="text-center mt-2 text-sm">فاتح</p>
                        </label>
                      </div>
                      
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="theme" 
                          id="theme-dark" 
                          className="sr-only" 
                        />
                        <label 
                          htmlFor="theme-dark"
                          className="block border-2 border-gray-200 p-2 rounded-lg cursor-pointer"
                        >
                          <div className="h-20 bg-gray-900 rounded flex flex-col">
                            <div className="bg-blue-600 h-6 rounded-t"></div>
                            <div className="flex-1 p-2">
                              <div className="w-full h-2 bg-gray-700 rounded mb-1"></div>
                              <div className="w-3/4 h-2 bg-gray-700 rounded"></div>
                            </div>
                          </div>
                          <p className="text-center mt-2 text-sm">داكن</p>
                        </label>
                      </div>
                      
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="theme" 
                          id="theme-auto" 
                          className="sr-only" 
                        />
                        <label 
                          htmlFor="theme-auto"
                          className="block border-2 border-gray-200 p-2 rounded-lg cursor-pointer"
                        >
                          <div className="h-20 bg-gradient-to-r from-white to-gray-900 rounded flex flex-col">
                            <div className="bg-blue-500 h-6 rounded-t"></div>
                            <div className="flex-1 p-2">
                              <div className="w-full h-2 bg-gray-400 rounded mb-1"></div>
                              <div className="w-3/4 h-2 bg-gray-400 rounded"></div>
                            </div>
                          </div>
                          <p className="text-center mt-2 text-sm">تلقائي</p>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">اللون الرئيسي</label>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-primary cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 border border-gray-200 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-green-500 border border-gray-200 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-amber-500 border border-gray-200 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-red-500 border border-gray-200 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-500 border border-gray-200 cursor-pointer"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">صورة الخلفية للصفحة الرئيسية</label>
                    <div className="flex items-center gap-2">
                      <div className="h-16 w-32 bg-gray-100 rounded overflow-hidden">
                        <img src="/placeholder.svg" alt="صورة الخلفية" className="w-full h-full object-cover" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Image className="h-4 w-4 ml-2" />
                        تغيير الصورة
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تخطيط الصفحة الرئيسية</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>الافتراضي</option>
                      <option>مدونة</option>
                      <option>متجر</option>
                      <option>تعليمي</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">تأثيرات الحركة</label>
                      <p className="text-xs text-muted-foreground">
                        تفعيل تأثيرات الحركة والانتقالات في الموقع
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">أزرار وسائل التواصل الاجتماعي</label>
                      <p className="text-xs text-muted-foreground">
                        إظهار أزرار مشاركة المحتوى على وسائل التواصل الاجتماعي
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* إعدادات الأمان */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الأمان</CardTitle>
                  <CardDescription>
                    إعدادات الأمان وحماية الموقع
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">المصادقة الثنائية</label>
                      <p className="text-xs text-muted-foreground">
                        إلزام المشرفين بتفعيل المصادقة الثنائية
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">تسجيل محاولات الدخول الفاشلة</label>
                      <p className="text-xs text-muted-foreground">
                        تسجيل جميع محاولات الدخول الفاشلة للحساب
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">حظر عنوان IP بعد محاولات فاشلة متعددة</label>
                      <p className="text-xs text-muted-foreground">
                        حظر عنوان IP بعد 5 محاولات دخول فاشلة
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رمز التحقق reCAPTCHA</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>معطل</option>
                      <option>reCAPTCHA v2</option>
                      <option>reCAPTCHA v3</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">مفتاح الموقع reCAPTCHA</label>
                    <Input placeholder="أدخل مفتاح الموقع" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المفتاح السري reCAPTCHA</label>
                    <Input type="password" placeholder="أدخل المفتاح السري" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الحد الأدنى لطول كلمة المرور</label>
                    <Input type="number" defaultValue="8" min="6" max="16" />
                    <p className="text-xs text-muted-foreground">
                      الحد الأدنى المطلوب لطول كلمة المرور (6-16 حرف)
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">تشفير HTTPS</label>
                      <p className="text-xs text-muted-foreground">
                        إجبار جميع الاتصالات عبر HTTPS
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* إعدادات متقدمة */}
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات متقدمة</CardTitle>
                  <CardDescription>
                    إعدادات متقدمة للموقع
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">حجم تحميل الملفات الأقصى (بالميجابايت)</label>
                    <Input type="number" defaultValue="10" min="1" max="100" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">أنواع الملفات المسموح بها</label>
                    <Input defaultValue="jpg, jpeg, png, pdf, doc, docx, xls, xlsx, zip" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">عدد النتائج في الصفحة</label>
                    <Input type="number" defaultValue="10" min="5" max="100" />
                    <p className="text-xs text-muted-foreground">
                      عدد العناصر التي تظهر في كل صفحة من صفحات النتائج
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">شفرة Google Analytics</label>
                    <Input placeholder="UA-XXXXXXXXX-X أو G-XXXXXXXXXX" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رموز الميتا (Meta Tags)</label>
                    <Textarea 
                      className="min-h-[100px]"
                      placeholder='<meta name="description" content="وصف الموقع هنا">'
                    />
                    <p className="text-xs text-muted-foreground">
                      رموز HTML إضافية ليتم إضافتها في رأس الصفحة
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">حذف الكاش</label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        مسح كاش الصور
                      </Button>
                      <Button variant="outline" className="flex-1">
                        مسح كاش التطبيق
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تصدير قاعدة البيانات</label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        تصدير قاعدة البيانات
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminSettings;
