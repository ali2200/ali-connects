
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Lock, Mail, BellRing, Globe, UserCircle, UploadCloud } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم حفظ التغييرات",
      description: "تم تحديث بيانات الملف الشخصي بنجاح",
    });
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم تغيير كلمة المرور",
      description: "تم تغيير كلمة المرور بنجاح",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>الإعدادات | المنصة</title>
      </Helmet>
      
      <DashboardLayout type="freelancer" title="الإعدادات">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">الإعدادات</h1>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
              <TabsTrigger value="password">كلمة المرور</TabsTrigger>
              <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
              <TabsTrigger value="privacy">الخصوصية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>الملف الشخصي</CardTitle>
                  <CardDescription>
                    قم بتحديث معلومات ملفك الشخصي
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-6 border-b">
                      <div className="flex flex-col items-center gap-3">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="أحمد محمد" />
                          <AvatarFallback>AM</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                          <UploadCloud className="ml-1 h-4 w-4" />
                          تغيير الصورة
                        </Button>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">الاسم الأول</Label>
                            <Input id="firstName" defaultValue="أحمد" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">الاسم الأخير</Label>
                            <Input id="lastName" defaultValue="محمد" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">البريد الإلكتروني</Label>
                          <Input id="email" type="email" defaultValue="ahmed@example.com" />
                        </div>
                        <div>
                          <Label htmlFor="phone">رقم الهاتف</Label>
                          <Input id="phone" defaultValue="+966 50 123 4567" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bio">نبذة عني</Label>
                        <textarea 
                          id="bio" 
                          className="w-full min-h-[100px] p-3 rounded-md border"
                          defaultValue="مطور ويب محترف مع خبرة 5 سنوات في تطوير مواقع الويب وتطبيقات الويب المتقدمة."
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">الموقع</Label>
                          <Input id="location" defaultValue="الرياض، المملكة العربية السعودية" />
                        </div>
                        <div>
                          <Label htmlFor="website">الموقع الإلكتروني</Label>
                          <Input id="website" defaultValue="https://example.com" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">حفظ التغييرات</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="password" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>تغيير كلمة المرور</CardTitle>
                  <CardDescription>
                    قم بتحديث كلمة المرور الخاصة بك
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Lock className="ml-1 h-4 w-4" />
                        تغيير كلمة المرور
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الإشعارات</CardTitle>
                  <CardDescription>
                    تحكم في طريقة تلقي الإشعارات
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">إشعارات البريد الإلكتروني</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>الرسائل الجديدة</Label>
                            <p className="text-xs text-gray-500">إشعار عند استلام رسالة جديدة</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>المشاريع الجديدة</Label>
                            <p className="text-xs text-gray-500">إشعار عند نشر مشاريع جديدة تناسب مهاراتك</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>تحديثات المشاريع</Label>
                            <p className="text-xs text-gray-500">إشعار عند وجود تحديثات في مشاريعك الحالية</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>نشرة الأخبار</Label>
                            <p className="text-xs text-gray-500">استلام نشرة إخبارية أسبوعية</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">إشعارات الموقع</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>جميع الإشعارات</Label>
                            <p className="text-xs text-gray-500">عرض الإشعارات على الموقع</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>التنبيهات الصوتية</Label>
                            <p className="text-xs text-gray-500">تفعيل صوت الإشعارات</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>
                        <BellRing className="ml-1 h-4 w-4" />
                        حفظ التغييرات
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الخصوصية</CardTitle>
                  <CardDescription>
                    تحكم في خصوصية حسابك
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">الملف الشخصي</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>إظهار ملفي الشخصي للزوار</Label>
                            <p className="text-xs text-gray-500">السماح للزوار بعرض ملفك الشخصي</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>إظهار معلومات التواصل</Label>
                            <p className="text-xs text-gray-500">عرض معلومات التواصل في ملفك الشخصي</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">الأمان</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>المصادقة الثنائية</Label>
                            <p className="text-xs text-gray-500">تفعيل المصادقة الثنائية لتسجيل الدخول</p>
                          </div>
                          <Switch />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>تسجيل الدخول من جهاز جديد</Label>
                            <p className="text-xs text-gray-500">إرسال إشعار عند تسجيل الدخول من جهاز جديد</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>
                        <Globe className="ml-1 h-4 w-4" />
                        حفظ التغييرات
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Settings;
