
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Users, Briefcase, Clock, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// بيانات وهمية للرسوم البيانية
const earningsData = [
  { month: 'يناير', amount: 1200 },
  { month: 'فبراير', amount: 1800 },
  { month: 'مارس', amount: 2400 },
  { month: 'أبريل', amount: 2200 },
  { month: 'مايو', amount: 2800 },
  { month: 'يونيو', amount: 3500 },
];

const projectStatusData = [
  { status: 'مكتملة', count: 12 },
  { status: 'جارية', count: 5 },
  { status: 'معلقة', count: 2 },
  { status: 'ملغاة', count: 1 },
];

const FreelancerDashboard = () => {
  return (
    <DashboardLayout type="freelancer" title="لوحة التحكم">
      <div className="space-y-6">
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">الإيرادات الكلية</p>
                  <h3 className="text-2xl font-bold mt-1">12,500 ريال</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <span className="flex items-center">
                      <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      15%
                    </span>
                    مقارنة بالشهر الماضي
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-ali-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">المشاريع المكتملة</p>
                  <h3 className="text-2xl font-bold mt-1">24</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <span className="flex items-center">
                      <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      8%
                    </span>
                    مقارنة بالشهر الماضي
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">المشاريع الجارية</p>
                  <h3 className="text-2xl font-bold mt-1">5</h3>
                  <p className="text-xs text-blue-600 mt-1">تحديث قبل 2 ساعة</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">متوسط التقييم</p>
                  <h3 className="text-2xl font-bold mt-1">4.8/5</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : i === 4 ? 'text-yellow-300' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* الرسوم البيانية */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>الإيرادات الشهرية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} ريال`, 'الإيرادات']} />
                    <Bar dataKey="amount" fill="#4338CA" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>حالة المشاريع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={projectStatusData}>
                    <XAxis type="number" />
                    <YAxis dataKey="status" type="category" />
                    <Tooltip formatter={(value) => [`${value} مشروع`, 'العدد']} />
                    <Bar dataKey="count" fill="#10B981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* المشاريع الجارية */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>المشاريع الجارية</CardTitle>
            <Link to="/dashboard/freelancer/projects">
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[1, 2, 3].map((project) => (
                <div key={project} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">تطوير موقع ويب لشركة تجارية</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          قيد التنفيذ
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        تصميم وتطوير موقع ويب احترافي لشركة متخصصة في مجال التجارة الإلكترونية...
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 ml-1 text-gray-400" />
                          <span>تطوير مواقع</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 ml-1 text-gray-400" />
                          <span>4,500 ريال</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 ml-1 text-gray-400" />
                          <span>ينتهي في 15 يوم</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-40 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>نسبة الإنجاز</span>
                        <span className="font-semibold">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <Link to={`/dashboard/freelancer/projects/${project}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          إدارة المشروع
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* آخر التقييمات */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>آخر التقييمات</CardTitle>
            <Link to="/dashboard/freelancer/reviews">
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((review) => (
                <div key={review} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${2 + review}`} />
                      <AvatarFallback>
                        {['عم', 'فس'][review - 1]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-semibold">{['عمر محمد', 'فيصل السعيد'][review - 1]}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`h-4 w-4 ${i < (review === 1 ? 5 : 4) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {review === 1 
                          ? 'عمل ممتاز للغاية، تم تسليم المشروع قبل الموعد المحدد مع جودة عالية. سعيد جداً بالتعامل معه وأنصح به بشدة.' 
                          : 'المستقل محترف وملتزم بالمواعيد، وقدم عمل جيد جداً. سأتعامل معه مرة أخرى في المستقبل.'}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {['قبل 3 أيام', 'قبل أسبوع'][review - 1]}
                        </span>
                        <Link to={`/dashboard/freelancer/projects/${review}`} className="text-xs text-ali-blue">
                          مشروع: {['تصميم هوية بصرية', 'تطوير تطبيق موبايل'][review - 1]}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FreelancerDashboard;
