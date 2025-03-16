
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Calendar, Clock, BookText, Star, TrendingUp } from 'lucide-react';

const LecturerDashboard = () => {
  return (
    <>
      <Helmet>
        <title>لوحة تحكم المحاضر | علي للأعمال</title>
      </Helmet>
      
      <DashboardLayout type="lecturer" title="لوحة تحكم المحاضر">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">مرحباً بك، أحمد محمد</h1>
            <p className="text-sm text-gray-500">آخر تسجيل دخول: اليوم، 10:30 صباحًا</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">الدورات النشطة</h3>
                <p className="text-3xl font-bold">5</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">إجمالي الطلاب</h3>
                <p className="text-3xl font-bold">285</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">متوسط التقييم</h3>
                <p className="text-3xl font-bold">4.8</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-amber-100 p-3 rounded-full mb-4">
                  <TrendingUp className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">المبيعات (الشهر)</h3>
                <p className="text-3xl font-bold">14,500 ر.س</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>الدورات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: 'مقدمة في التسويق الرقمي للمبتدئين',
                      students: 78,
                      progress: 100,
                      lastUpdate: 'منذ يومين'
                    },
                    { 
                      title: 'التسويق عبر وسائل التواصل الاجتماعي',
                      students: 65,
                      progress: 80,
                      lastUpdate: 'اليوم'
                    },
                    { 
                      title: 'تحليلات جوجل للمسوقين',
                      students: 42,
                      progress: 60,
                      lastUpdate: 'منذ أسبوع'
                    },
                    { 
                      title: 'استراتيجيات تحسين محركات البحث المتقدمة',
                      students: 56,
                      progress: 90,
                      lastUpdate: 'منذ 3 أيام'
                    }
                  ].map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="bg-gray-100 text-gray-800 w-10 h-10 rounded-lg flex items-center justify-center ml-4">
                          <BookText className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-gray-500">{course.students} طالب</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>آخر تحديث: {course.lastUpdate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>المحاضرات القادمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: 'مقدمة في تحليلات جوجل',
                      date: 'اليوم',
                      time: '2:00 م - 4:00 م',
                      attendees: 45
                    },
                    { 
                      title: 'استراتيجيات التسويق المتقدمة',
                      date: 'غدًا',
                      time: '10:00 ص - 12:00 م',
                      attendees: 28
                    },
                    { 
                      title: 'تحسين معدل التحويل',
                      date: 'بعد غد',
                      time: '1:00 م - 3:00 م',
                      attendees: 32
                    }
                  ].map((lecture, index) => (
                    <div key={index} className="flex flex-col p-4 border rounded-lg">
                      <div className="mb-2">
                        <h4 className="font-medium">{lecture.title}</h4>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 ml-1" />
                          <span>{lecture.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 ml-1" />
                          <span>{lecture.time}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <Users className="h-4 w-4 inline ml-1" />
                        {lecture.attendees} مشارك
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default LecturerDashboard;
