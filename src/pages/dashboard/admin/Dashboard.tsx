
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { UsersIcon, BookOpenIcon, FileTextIcon, DollarSignIcon, PackageIcon } from 'lucide-react';

// بيانات تجريبية للرسوم البيانية
const usersData = [
  { name: 'يناير', مستقل: 65, محاضر: 42, صاحب_عمل: 28 },
  { name: 'فبراير', مستقل: 59, محاضر: 45, صاحب_عمل: 30 },
  { name: 'مارس', مستقل: 80, محاضر: 50, صاحب_عمل: 35 },
  { name: 'أبريل', مستقل: 81, محاضر: 55, صاحب_عمل: 40 },
  { name: 'مايو', مستقل: 56, محاضر: 58, صاحب_عمل: 45 },
  { name: 'يونيو', مستقل: 55, محاضر: 60, صاحب_عمل: 48 },
];

const revenueData = [
  { name: 'يناير', إيرادات: 4000 },
  { name: 'فبراير', إيرادات: 3000 },
  { name: 'مارس', إيرادات: 5000 },
  { name: 'أبريل', إيرادات: 8000 },
  { name: 'مايو', إيرادات: 6000 },
  { name: 'يونيو', إيرادات: 9500 },
];

// بيانات إحصائية للكروت
const stats = [
  { title: 'إجمالي المستخدمين', value: '2,845', icon: UsersIcon, color: 'bg-blue-500' },
  { title: 'إجمالي الدورات', value: '126', icon: BookOpenIcon, color: 'bg-green-500' },
  { title: 'إجمالي الخدمات', value: '318', icon: PackageIcon, color: 'bg-purple-500' },
  { title: 'إجمالي المقالات', value: '92', icon: FileTextIcon, color: 'bg-amber-500' },
  { title: 'إجمالي الإيرادات', value: '86,342 ر.س', icon: DollarSignIcon, color: 'bg-emerald-500' },
];

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>لوحة تحكم المشرف | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="لوحة تحكم المشرف">
        <div className="space-y-6">
          {/* ملخص الإحصائيات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* الرسوم البيانية */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="mb-4 w-full max-w-md mx-auto grid grid-cols-2">
              <TabsTrigger value="users">المستخدمين</TabsTrigger>
              <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>نمو المستخدمين</CardTitle>
                  <CardDescription>إحصائيات المستخدمين الجدد خلال الستة أشهر الماضية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={usersData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="مستقل" stroke="#3b82f6" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="محاضر" stroke="#10b981" />
                        <Line type="monotone" dataKey="صاحب_عمل" stroke="#8b5cf6" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>إجمالي الإيرادات</CardTitle>
                  <CardDescription>إحصائيات الإيرادات خلال الستة أشهر الماضية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={revenueData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="إيرادات" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* روابط سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>آخر المستخدمين المسجلين</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <UsersIcon className="h-4 w-4" />
                      </div>
                      <span>محمد أحمد</span>
                    </div>
                    <span className="text-sm text-muted-foreground">منذ 2 ساعة</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <UsersIcon className="h-4 w-4" />
                      </div>
                      <span>سارة محمود</span>
                    </div>
                    <span className="text-sm text-muted-foreground">منذ 4 ساعات</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <UsersIcon className="h-4 w-4" />
                      </div>
                      <span>خالد العتيبي</span>
                    </div>
                    <span className="text-sm text-muted-foreground">منذ 8 ساعات</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>آخر الدورات المضافة</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <BookOpenIcon className="h-4 w-4" />
                      </div>
                      <span>تطوير تطبيقات الويب</span>
                    </div>
                    <span className="text-sm text-muted-foreground">منذ 1 يوم</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <BookOpenIcon className="h-4 w-4" />
                      </div>
                      <span>مقدمة في الذكاء الاصطناعي</span>
                    </div>
                    <span className="text-sm text-muted-foreground">منذ 3 أيام</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <BookOpenIcon className="h-4 w-4" />
                      </div>
                      <span>التصميم الجرافيكي</span>
                    </div>
                    <span className="text-sm text-muted-foreground">منذ 5 أيام</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminDashboard;
