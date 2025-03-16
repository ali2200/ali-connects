
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DollarSign, Users, Briefcase, Clock, CheckCircle2, PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import CustomButton from '@/components/ui/CustomButton';

// بيانات وهمية للرسوم البيانية
const spendingData = [
  { month: 'يناير', amount: 4800 },
  { month: 'فبراير', amount: 3500 },
  { month: 'مارس', amount: 6200 },
  { month: 'أبريل', amount: 4100 },
  { month: 'مايو', amount: 5700 },
  { month: 'يونيو', amount: 7500 },
];

const projectTypes = [
  { name: 'تطوير ويب', value: 45 },
  { name: 'تصميم جرافيك', value: 30 },
  { name: 'تسويق رقمي', value: 15 },
  { name: 'كتابة محتوى', value: 10 },
];

const COLORS = ['#4338CA', '#10B981', '#F59E0B', '#EC4899'];

const ClientDashboard = () => {
  return (
    <DashboardLayout type="client" title="لوحة تحكم صاحب الأعمال">
      <div className="space-y-6">
        {/* إضافة مشروع جديد */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">مرحباً بك، محمد!</h3>
                <p className="text-gray-600 mt-1 max-w-xl">
                  ابحث عن أفضل المستقلين المحترفين وابدأ في تنفيذ مشروعك اليوم. نحن نضمن لك أفضل جودة وأقل تكلفة.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/dashboard/client/projects/new">
                  <CustomButton variant="primary" leftIcon={<PlusCircle className="h-5 w-5" />}>
                    إنشاء مشروع جديد
                  </CustomButton>
                </Link>
                <Link to="/freelancers">
                  <CustomButton variant="outline" leftIcon={<Search className="h-5 w-5" />}>
                    ابحث عن مستقل
                  </CustomButton>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">إجمالي الإنفاق</p>
                  <h3 className="text-2xl font-bold mt-1">32,100 ريال</h3>
                  <p className="text-xs text-blue-600 mt-1">آخر 12 شهر</p>
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
                  <h3 className="text-2xl font-bold mt-1">17</h3>
                  <p className="text-xs text-green-600 mt-1">بنسبة نجاح 94%</p>
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
                  <h3 className="text-2xl font-bold mt-1">3</h3>
                  <p className="text-xs text-amber-600 mt-1">قيد التنفيذ</p>
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
                  <p className="text-sm text-gray-500">المستقلين المفضلين</p>
                  <h3 className="text-2xl font-bold mt-1">8</h3>
                  <p className="text-xs text-purple-600 mt-1">مستقلين تعاملت معهم</p>
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
              <CardTitle>إنفاق المشاريع الشهري</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} ريال`, 'الإنفاق']} />
                    <Bar dataKey="amount" fill="#4338CA" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>توزيع المشاريع حسب النوع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {projectTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend layout="vertical" verticalAlign="bottom" align="center" />
                    <Tooltip formatter={(value) => [`${value}%`, 'النسبة']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* المشاريع الجارية */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>المشاريع الجارية</CardTitle>
            <Link to="/dashboard/client/projects">
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
                        <h3 className="font-semibold">
                          {project === 1 ? 'تصميم هوية بصرية متكاملة' : 
                           project === 2 ? 'تطوير متجر إلكتروني' : 
                           'كتابة محتوى تسويقي'}
                        </h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          قيد التنفيذ
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {project === 1 ? 'تصميم شعار وهوية بصرية كاملة للشركة تشمل جميع مواد التسويق والعلامة التجارية...' : 
                         project === 2 ? 'تطوير متجر إلكتروني متكامل باستخدام ووردبريس وووكومرس مع دعم الدفع الإلكتروني...' : 
                         'كتابة محتوى تسويقي احترافي للموقع الإلكتروني وحسابات التواصل الاجتماعي...'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 ml-1 text-gray-400" />
                          <span>
                            {project === 1 ? 'تصميم جرافيك' : 
                             project === 2 ? 'تطوير مواقع' : 
                             'كتابة محتوى'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 ml-1 text-gray-400" />
                          <span>
                            {project === 1 ? '3,500 ريال' : 
                             project === 2 ? '6,800 ريال' : 
                             '2,200 ريال'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 ml-1 text-gray-400" />
                          <span>
                            {project === 1 ? 'ينتهي في 7 أيام' : 
                             project === 2 ? 'ينتهي في 20 يوم' : 
                             'ينتهي في 3 أيام'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-40 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>نسبة الإنجاز</span>
                        <span className="font-semibold">
                          {project === 1 ? '80' : 
                           project === 2 ? '45' : 
                           '90'}%
                        </span>
                      </div>
                      <Progress 
                        value={project === 1 ? 80 : project === 2 ? 45 : 90} 
                        className="h-2" 
                      />
                      <Link to={`/dashboard/client/projects/${project}`}>
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
        
        {/* المستقلين المفضلين */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>المستقلين المفضلين</CardTitle>
            <Link to="/freelancers">
              <Button variant="outline" size="sm">
                البحث عن مستقلين
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((freelancer) => (
                <div key={freelancer} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${5 + freelancer}`} />
                      <AvatarFallback>
                        {['أح', 'سع', 'عل'][freelancer - 1]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mt-3">
                      {freelancer === 1 ? 'أحمد عبدالله' : 
                       freelancer === 2 ? 'سعيد الأحمد' : 
                       'علي محمد'}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {freelancer === 1 ? 'مصمم جرافيك' : 
                       freelancer === 2 ? 'مطور ويب' : 
                       'كاتب محتوى'}
                    </p>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`h-4 w-4 ${i < (freelancer === 1 ? 5 : freelancer === 2 ? 4 : 5) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-600 mr-1">
                        ({freelancer === 1 ? '18' : 
                          freelancer === 2 ? '23' : 
                          '15'})
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2 w-full">
                      <Link to={`/freelancers/${freelancer}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          عرض الملف
                        </Button>
                      </Link>
                      <Link to="/dashboard/client/projects/new" className="flex-1">
                        <Button variant="default" size="sm" className="w-full">
                          توظيف
                        </Button>
                      </Link>
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

export default ClientDashboard;
