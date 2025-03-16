
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Building } from 'lucide-react';

const ClientProfile = () => {
  const { toast } = useToast();
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم حفظ الملف الشخصي",
      description: "تم تحديث بياناتك الشخصية بنجاح.",
    });
  };

  return (
    <>
      <Helmet>
        <title>الملف الشخصي | لوحة تحكم صاحب الأعمال</title>
      </Helmet>
      
      <DashboardLayout type="client" title="الملف الشخصي">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">الملف الشخصي</h1>
            <Button className="mt-4 md:mt-0" onClick={() => document.getElementById('profile-form')?.scrollIntoView({ behavior: 'smooth' })}>
              تعديل الملف الشخصي
            </Button>
          </div>
          
          {/* البطاقة الشخصية */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="محمد السالم" />
                  <AvatarFallback>مح</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4 text-center md:text-right">
                  <div>
                    <h2 className="text-2xl font-bold">محمد السالم</h2>
                    <p className="text-gray-600">مدير شركة تقنية</p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 ml-1" />
                      <span>mohammed@example.com</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 ml-1" />
                      <span>+966 5xx xxx xxx</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 ml-1" />
                      <span>الرياض، المملكة العربية السعودية</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center text-gray-600">
                      <Building className="h-4 w-4 ml-1" />
                      <span>شركة التقنية المبتكرة</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-4 w-4 ml-1" />
                      <span>17 مشروع منجز</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 ml-1" />
                      <span>عضو منذ مارس 2021</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* نبذة عن الشركة */}
          <Card>
            <CardHeader>
              <CardTitle>نبذة عن الشركة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                شركة التقنية المبتكرة هي شركة متخصصة في مجال تطوير البرمجيات وتقديم الحلول التقنية المتكاملة للشركات والمؤسسات. تأسست الشركة في عام 2018 ولديها فريق متخصص من المبرمجين والمصممين وخبراء تجربة المستخدم.
              </p>
            </CardContent>
          </Card>
          
          {/* المشاريع المكتملة */}
          <Card>
            <CardHeader>
              <CardTitle>المشاريع المكتملة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(item => (
                  <div key={item} className="border rounded-lg overflow-hidden">
                    <img src={`https://placehold.co/600x400/4338CA/white?text=مشروع+${item}`} alt={`مشروع ${item}`} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <h3 className="font-semibold">
                        {item === 1 ? "تطوير موقع ويب تجاري" : 
                         item === 2 ? "تصميم هوية بصرية" : 
                         "تطوير تطبيق موبايل"}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item === 1 ? "تم تطوير موقع ويب تجاري متكامل مع نظام إدارة المحتوى." : 
                         item === 2 ? "تصميم شعار وهوية بصرية متكاملة للشركة." : 
                         "تطوير تطبيق جوال للمتاجر الإلكترونية."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Separator id="profile-form" />
          
          {/* نموذج تعديل الملف الشخصي */}
          <Card>
            <CardHeader>
              <CardTitle>تعديل الملف الشخصي</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input id="name" defaultValue="محمد السالم" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">المسمى الوظيفي</Label>
                    <Input id="title" defaultValue="مدير شركة تقنية" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" defaultValue="mohammed@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" defaultValue="+966 5xx xxx xxx" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">الموقع</Label>
                    <Input id="location" defaultValue="الرياض، المملكة العربية السعودية" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">اسم الشركة</Label>
                    <Input id="company" defaultValue="شركة التقنية المبتكرة" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة عن الشركة</Label>
                  <Textarea 
                    id="bio" 
                    rows={5}
                    defaultValue="شركة التقنية المبتكرة هي شركة متخصصة في مجال تطوير البرمجيات وتقديم الحلول التقنية المتكاملة للشركات والمؤسسات. تأسست الشركة في عام 2018 ولديها فريق متخصص من المبرمجين والمصممين وخبراء تجربة المستخدم."
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">حفظ التغييرات</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ClientProfile;
