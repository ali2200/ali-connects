
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
import { User, Mail, Phone, MapPin, Briefcase, Book, Calendar } from 'lucide-react';

const FreelancerProfile = () => {
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
        <title>الملف الشخصي | لوحة تحكم المستقل</title>
      </Helmet>
      
      <DashboardLayout type="freelancer" title="الملف الشخصي">
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
                  <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="عبدالله الزهراني" />
                  <AvatarFallback>عز</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4 text-center md:text-right">
                  <div>
                    <h2 className="text-2xl font-bold">عبدالله الزهراني</h2>
                    <p className="text-gray-600">مطور ويب متخصص</p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 ml-1" />
                      <span>abdullah@example.com</span>
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
                      <Briefcase className="h-4 w-4 ml-1" />
                      <span>أكملت 24 مشروع</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Book className="h-4 w-4 ml-1" />
                      <span>5 سنوات خبرة</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 ml-1" />
                      <span>عضو منذ يناير 2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* نبذة عني */}
          <Card>
            <CardHeader>
              <CardTitle>نبذة عني</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                مطور ويب متخصص بخبرة 5 سنوات في تطوير تطبيقات الويب والموبايل. أعمل بشكل أساسي مع React و Next.js و Node.js. حاصل على شهادة في علوم الحاسب من جامعة الملك سعود. أسعى دائمًا لتقديم حلول مبتكرة وعالية الجودة تلبي احتياجات العملاء.
              </p>
            </CardContent>
          </Card>
          
          {/* المهارات */}
          <Card>
            <CardHeader>
              <CardTitle>المهارات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'TypeScript', 'Node.js', 'Next.js', 'CSS', 'HTML', 'Tailwind CSS', 'MongoDB', 'SQL', 'Git'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* نماذج من أعمالي */}
          <Card>
            <CardHeader>
              <CardTitle>نماذج من أعمالي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(item => (
                  <div key={item} className="border rounded-lg overflow-hidden">
                    <img src={`https://placehold.co/600x400/4338CA/white?text=مشروع+${item}`} alt={`مشروع ${item}`} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <h3 className="font-semibold">موقع ويب تجاري</h3>
                      <p className="text-sm text-gray-600 mt-1">تطوير متجر إلكتروني باستخدام React و Node.js</p>
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
                    <Input id="name" defaultValue="عبدالله الزهراني" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">المسمى الوظيفي</Label>
                    <Input id="title" defaultValue="مطور ويب متخصص" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" defaultValue="abdullah@example.com" />
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
                    <Label htmlFor="experience">سنوات الخبرة</Label>
                    <Input id="experience" type="number" defaultValue="5" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة عني</Label>
                  <Textarea 
                    id="bio" 
                    rows={5}
                    defaultValue="مطور ويب متخصص بخبرة 5 سنوات في تطوير تطبيقات الويب والموبايل. أعمل بشكل أساسي مع React و Next.js و Node.js. حاصل على شهادة في علوم الحاسب من جامعة الملك سعود. أسعى دائمًا لتقديم حلول مبتكرة وعالية الجودة تلبي احتياجات العملاء."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">المهارات (مفصولة بفواصل)</Label>
                  <Input id="skills" defaultValue="React, JavaScript, TypeScript, Node.js, Next.js, CSS, HTML, Tailwind CSS, MongoDB, SQL, Git" />
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

export default FreelancerProfile;
