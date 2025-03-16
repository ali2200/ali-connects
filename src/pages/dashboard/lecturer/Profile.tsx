
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, BookOpen, Award, Mail, Phone, Globe, MapPin, Calendar, AtSign } from 'lucide-react';

const LecturerProfile = () => {
  return (
    <>
      <Helmet>
        <title>الملف الشخصي للمحاضر | علي للأعمال</title>
      </Helmet>
      
      <DashboardLayout type="lecturer" title="الملف الشخصي">
        <div className="grid gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="صورة المحاضر"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 left-0 bg-ali-blue text-white p-2 rounded-full hover:bg-ali-dark-blue">
                      <User className="h-4 w-4" />
                    </button>
                  </div>
                  <Button variant="outline" size="sm">
                    تغيير الصورة
                  </Button>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">د. أحمد محمد الزهراني</h1>
                  <p className="text-gray-600 mb-4">خبير تسويق رقمي ومحاضر في مجال التسويق لأكثر من 10 سنوات</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <BookOpen className="h-5 w-5 ml-2 text-gray-500" />
                      <span>5 دورات تدريبية</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Award className="h-5 w-5 ml-2 text-gray-500" />
                      <span>دكتوراه في التسويق الإلكتروني</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail className="h-5 w-5 ml-2 text-gray-500" />
                      <span>ahmed@example.com</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="h-5 w-5 ml-2 text-gray-500" />
                      <span>+966 55 123 4567</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">التسويق الرقمي</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">تحسين محركات البحث</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">التسويق عبر وسائل التواصل</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">تحليلات البيانات</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="personal">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="personal">المعلومات الشخصية</TabsTrigger>
              <TabsTrigger value="education">المؤهلات العلمية</TabsTrigger>
              <TabsTrigger value="experience">الخبرات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>المعلومات الشخصية</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">الاسم الأول</Label>
                        <Input id="firstName" defaultValue="أحمد" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">الاسم الأخير</Label>
                        <Input id="lastName" defaultValue="الزهراني" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input id="email" type="email" defaultValue="ahmed@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input id="phone" defaultValue="+966 55 123 4567" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">نبذة شخصية</Label>
                        <Textarea 
                          id="bio" 
                          rows={4}
                          defaultValue="خبير تسويق رقمي ومحاضر في مجال التسويق لأكثر من 10 سنوات. حاصل على دكتوراه في التسويق الإلكتروني من جامعة الملك سعود."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">الموقع الإلكتروني</Label>
                        <Input id="website" defaultValue="www.ahmedmarketing.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">الموقع</Label>
                        <Input id="location" defaultValue="الرياض، المملكة العربية السعودية" />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-0 space-x-reverse space-x-2">
                      <Button variant="outline">إلغاء</Button>
                      <Button>حفظ التغييرات</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="education">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>المؤهلات العلمية</CardTitle>
                  <Button size="sm">إضافة مؤهل</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        degree: 'دكتوراه في التسويق الإلكتروني',
                        institution: 'جامعة الملك سعود',
                        year: '2015 - 2019',
                        description: 'تخصص في استراتيجيات التسويق الرقمي وتأثيرها على سلوك المستهلك'
                      },
                      {
                        degree: 'ماجستير في إدارة الأعمال',
                        institution: 'جامعة الملك عبد العزيز',
                        year: '2012 - 2014',
                        description: 'تخصص في التسويق والإدارة الاستراتيجية'
                      },
                      {
                        degree: 'بكالوريوس في إدارة الأعمال',
                        institution: 'جامعة الملك سعود',
                        year: '2008 - 2012',
                        description: 'تخرج بمرتبة الشرف'
                      }
                    ].map((education, index) => (
                      <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{education.degree}</h3>
                            <div className="text-gray-600 mb-2">{education.institution}</div>
                            <div className="flex items-center text-gray-500 text-sm mb-2">
                              <Calendar className="h-4 w-4 ml-1" />
                              <span>{education.year}</span>
                            </div>
                            <p className="text-gray-700">{education.description}</p>
                          </div>
                          <div className="flex space-x-0 space-x-reverse space-x-2">
                            <Button variant="ghost" size="sm">تعديل</Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">حذف</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>الخبرات العملية</CardTitle>
                  <Button size="sm">إضافة خبرة</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        position: 'رئيس قسم التسويق الرقمي',
                        company: 'شركة تسويق الخليج',
                        period: '2019 - الآن',
                        description: 'مسؤول عن كافة استراتيجيات التسويق الرقمي للشركة ومتابعة تنفيذها وتطويرها.'
                      },
                      {
                        position: 'مستشار تسويق',
                        company: 'مجموعة البركة التجارية',
                        period: '2016 - 2019',
                        description: 'تقديم الاستشارات التسويقية وتطوير استراتيجيات تسويقية فعالة لعملاء المجموعة.'
                      },
                      {
                        position: 'أخصائي تسويق إلكتروني',
                        company: 'شركة المسوق العربي',
                        period: '2014 - 2016',
                        description: 'إدارة حملات التسويق الإلكتروني وتحسين محركات البحث وإدارة وسائل التواصل الاجتماعي.'
                      }
                    ].map((experience, index) => (
                      <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{experience.position}</h3>
                            <div className="text-gray-600 mb-2">{experience.company}</div>
                            <div className="flex items-center text-gray-500 text-sm mb-2">
                              <Calendar className="h-4 w-4 ml-1" />
                              <span>{experience.period}</span>
                            </div>
                            <p className="text-gray-700">{experience.description}</p>
                          </div>
                          <div className="flex space-x-0 space-x-reverse space-x-2">
                            <Button variant="ghost" size="sm">تعديل</Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">حذف</Button>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default LecturerProfile;
