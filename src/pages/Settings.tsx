
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { User, Bell, Shield, LogOut, CreditCard, Languages, Eye, Moon, Lock, Mail, Phone } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ التغييرات بنجاح",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>الإعدادات | منصة علّي</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">الإعدادات</h1>
              <p className="text-gray-600">إدارة إعدادات حسابك والأمان</p>
            </div>
            <Link to="/">
              <Button variant="outline">العودة للرئيسية</Button>
            </Link>
          </div>
          
          <Tabs defaultValue="account">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-3">
                <div className="sticky top-24">
                  <TabsList className="flex flex-col w-full h-auto bg-transparent p-0 space-y-1">
                    <div className="border rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                          <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg">محمد أحمد</h3>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">عميل</Badge>
                            <span className="text-sm text-gray-500">ID: 143267</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" size="sm">
                        تعديل الملف الشخصي
                      </Button>
                    </div>
                    
                    <TabsTrigger value="account" className="justify-start h-10 px-4 py-2 text-right">
                      <User className="h-4 w-4 ml-2" />
                      الحساب
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="justify-start h-10 px-4 py-2 text-right">
                      <Bell className="h-4 w-4 ml-2" />
                      الإشعارات
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="justify-start h-10 px-4 py-2 text-right">
                      <Shield className="h-4 w-4 ml-2" />
                      الخصوصية والأمان
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="justify-start h-10 px-4 py-2 text-right">
                      <CreditCard className="h-4 w-4 ml-2" />
                      وسائل الدفع
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="justify-start h-10 px-4 py-2 text-right">
                      <Eye className="h-4 w-4 ml-2" />
                      المظهر
                    </TabsTrigger>
                    <TabsTrigger value="language" className="justify-start h-10 px-4 py-2 text-right">
                      <Languages className="h-4 w-4 ml-2" />
                      اللغة
                    </TabsTrigger>
                    
                    <div className="mt-auto">
                      <Button variant="ghost" className="justify-start w-full h-10 px-4 py-2 text-right text-red-600">
                        <LogOut className="h-4 w-4 ml-2" />
                        تسجيل الخروج
                      </Button>
                    </div>
                  </TabsList>
                </div>
              </div>
              
              <div className="col-span-12 lg:col-span-9">
                <div className="bg-white rounded-lg border p-6 lg:p-8">
                  <TabsContent value="account">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">معلومات الحساب</h2>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name">الاسم الكامل</Label>
                            <Input id="name" value="محمد أحمد" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="username">اسم المستخدم</Label>
                            <Input id="username" value="mohammed_ahmed" className="mt-1" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <div className="relative mt-1">
                              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                              <Input id="email" type="email" value="mohammed@example.com" className="pl-3 pr-10" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="phone">رقم الجوال</Label>
                            <div className="relative mt-1">
                              <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                              <Input id="phone" value="+966 55 123 4567" className="pl-3 pr-10" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="bio">نبذة شخصية</Label>
                          <textarea 
                            id="bio" 
                            rows={4} 
                            className="w-full mt-1 rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                            defaultValue="أنا محمد، أعمل في مجال التسويق الرقمي منذ 5 سنوات. مهتم بتطوير مهاراتي في مجالات متعددة من خلال المنصة."
                          />
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">الصورة الشخصية</h3>
                          <div className="flex items-center space-x-6 space-x-reverse">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                              <AvatarFallback>م أ</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                              <div className="flex gap-3">
                                <Button size="sm">تغيير الصورة</Button>
                                <Button size="sm" variant="outline">حذف</Button>
                              </div>
                              <p className="text-sm text-gray-500">
                                يُفضل أن تكون بصيغة JPG أو PNG وبحجم أقل من 1MB
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button onClick={handleSave}>حفظ التغييرات</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notifications">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">إعدادات الإشعارات</h2>
                      
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle>إشعارات البريد الإلكتروني</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">الرسائل الجديدة</p>
                                <p className="text-sm text-gray-500">إشعارات عند استلام رسائل جديدة</p>
                              </div>
                              <Switch checked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">التعليقات والتقييمات</p>
                                <p className="text-sm text-gray-500">إشعارات عند الحصول على تعليقات أو تقييمات</p>
                              </div>
                              <Switch checked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">تحديثات المشاريع</p>
                                <p className="text-sm text-gray-500">إشعارات حول تحديثات المشاريع التي تشترك فيها</p>
                              </div>
                              <Switch />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">العروض الترويجية</p>
                                <p className="text-sm text-gray-500">إشعارات حول العروض والخصومات</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>إشعارات تطبيق الجوال</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">الرسائل الفورية</p>
                                <p className="text-sm text-gray-500">إشعارات فورية عند استلام رسائل</p>
                              </div>
                              <Switch checked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">تحديثات المشاريع</p>
                                <p className="text-sm text-gray-500">إشعارات حول تحديثات المشاريع</p>
                              </div>
                              <Switch checked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">الفرص الجديدة</p>
                                <p className="text-sm text-gray-500">إشعارات حول فرص جديدة تناسب تخصصك</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div className="flex justify-end mt-6">
                        <Button onClick={handleSave}>حفظ التغييرات</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="privacy">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">الخصوصية والأمان</h2>
                      
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle>تغيير كلمة المرور</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                              <div className="relative mt-1">
                                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input id="current-password" type="password" className="pl-3 pr-10" />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                              <div className="relative mt-1">
                                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input id="new-password" type="password" className="pl-3 pr-10" />
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                يجب أن تحتوي على 8 أحرف على الأقل وتتضمن أرقامًا وأحرفًا خاصة
                              </p>
                            </div>
                            
                            <div>
                              <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                              <div className="relative mt-1">
                                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input id="confirm-password" type="password" className="pl-3 pr-10" />
                              </div>
                            </div>
                            
                            <Button>تغيير كلمة المرور</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle>إعدادات الخصوصية</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">عرض الملف الشخصي للعامة</p>
                                <p className="text-sm text-gray-500">السماح للمستخدمين الآخرين برؤية ملفك الشخصي</p>
                              </div>
                              <Switch checked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">إظهار البريد الإلكتروني</p>
                                <p className="text-sm text-gray-500">السماح بعرض بريدك الإلكتروني في ملفك الشخصي</p>
                              </div>
                              <Switch />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">إظهار رقم الجوال</p>
                                <p className="text-sm text-gray-500">السماح بعرض رقم جوالك في ملفك الشخصي</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-red-600">حذف الحساب</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">
                            سيؤدي حذف حسابك إلى إزالة جميع بياناتك بشكل نهائي. لا يمكن التراجع عن هذا الإجراء.
                          </p>
                          <Button variant="destructive">حذف الحساب</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payment">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">وسائل الدفع</h2>
                      
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle>بطاقات الدفع</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4 flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-10 w-16 bg-blue-100 rounded flex items-center justify-center ml-4">
                                  <span className="text-blue-700 font-bold">Visa</span>
                                </div>
                                <div>
                                  <p className="font-medium">•••• •••• •••• 4242</p>
                                  <p className="text-sm text-gray-500">تنتهي في 12/2025</p>
                                </div>
                              </div>
                              <div className="flex space-x-2 space-x-reverse">
                                <Badge>افتراضية</Badge>
                                <Button variant="ghost" size="sm">تعديل</Button>
                                <Button variant="ghost" size="sm" className="text-red-600">حذف</Button>
                              </div>
                            </div>
                            
                            <div className="border rounded-lg p-4 flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-10 w-16 bg-green-100 rounded flex items-center justify-center ml-4">
                                  <span className="text-green-700 font-bold">MC</span>
                                </div>
                                <div>
                                  <p className="font-medium">•••• •••• •••• 5678</p>
                                  <p className="text-sm text-gray-500">تنتهي في 08/2024</p>
                                </div>
                              </div>
                              <div className="flex space-x-2 space-x-reverse">
                                <Button variant="ghost" size="sm">تعديل</Button>
                                <Button variant="ghost" size="sm" className="text-red-600">حذف</Button>
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="outline" className="mt-4">
                            <CreditCard className="ml-2 h-4 w-4" />
                            إضافة بطاقة جديدة
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>الفواتير</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b">
                              <div>
                                <p className="font-medium">شراء دورة التسويق الرقمي</p>
                                <p className="text-sm text-gray-500">20 يونيو 2023</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">199 ر.س</p>
                                <Button variant="link" size="sm" className="h-auto p-0">عرض الفاتورة</Button>
                              </div>
                            </div>
                            
                            <div className="flex justify-between py-2 border-b">
                              <div>
                                <p className="font-medium">تجديد الاشتراك السنوي</p>
                                <p className="text-sm text-gray-500">15 مايو 2023</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">499 ر.س</p>
                                <Button variant="link" size="sm" className="h-auto p-0">عرض الفاتورة</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="appearance">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">المظهر</h2>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>الوضع</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-50 bg-blue-50 border-blue-200">
                              <div className="h-24 w-full bg-white rounded-md border mb-4 flex items-center justify-center">
                                <Sun className="h-8 w-8 text-yellow-500" />
                              </div>
                              <span className="font-medium">فاتح</span>
                            </div>
                            
                            <div className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-50">
                              <div className="h-24 w-full bg-gray-900 rounded-md border mb-4 flex items-center justify-center">
                                <Moon className="h-8 w-8 text-gray-300" />
                              </div>
                              <span className="font-medium">داكن</span>
                            </div>
                            
                            <div className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-50">
                              <div className="h-24 w-full rounded-md border mb-4 overflow-hidden">
                                <div className="h-full w-1/2 bg-white float-right"></div>
                                <div className="h-full w-1/2 bg-gray-900 float-left"></div>
                              </div>
                              <span className="font-medium">تلقائي</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="language">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">إعدادات اللغة</h2>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>لغة التطبيق</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="border rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 bg-blue-50 border-blue-200">
                              <div className="h-8 w-8 rounded-full overflow-hidden ml-3 bg-gray-100 flex-shrink-0">
                                <img src="https://flagcdn.com/sa.svg" alt="العربية" className="w-full h-full object-cover" />
                              </div>
                              <span className="font-medium">العربية</span>
                            </div>
                            
                            <div className="border rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50">
                              <div className="h-8 w-8 rounded-full overflow-hidden ml-3 bg-gray-100 flex-shrink-0">
                                <img src="https://flagcdn.com/us.svg" alt="English" className="w-full h-full object-cover" />
                              </div>
                              <span className="font-medium">English</span>
                            </div>
                            
                            <div className="border rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50">
                              <div className="h-8 w-8 rounded-full overflow-hidden ml-3 bg-gray-100 flex-shrink-0">
                                <img src="https://flagcdn.com/fr.svg" alt="Français" className="w-full h-full object-cover" />
                              </div>
                              <span className="font-medium">Français</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div className="flex justify-end mt-6">
                        <Button onClick={handleSave}>حفظ التغييرات</Button>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

// Sun component for light mode
const Sun = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

export default Settings;
