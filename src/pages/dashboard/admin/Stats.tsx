
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer 
} from 'recharts';
import { 
  UsersIcon, BookOpenIcon, FileTextIcon, DollarSignIcon, PackageIcon, 
  TrendingUpIcon, DownloadIcon, EyeIcon, ThumbsUpIcon, CalendarIcon
} from 'lucide-react';

// بيانات تجريبية للرسوم البيانية
const usersData = [
  { name: 'يناير', مستقل: 65, محاضر: 42, صاحب_عمل: 28, مجموع: 135 },
  { name: 'فبراير', مستقل: 59, محاضر: 45, صاحب_عمل: 30, مجموع: 134 },
  { name: 'مارس', مستقل: 80, محاضر: 50, صاحب_عمل: 35, مجموع: 165 },
  { name: 'أبريل', مستقل: 81, محاضر: 55, صاحب_عمل: 40, مجموع: 176 },
  { name: 'مايو', مستقل: 56, محاضر: 58, صاحب_عمل: 45, مجموع: 159 },
  { name: 'يونيو', مستقل: 55, محاضر: 60, صاحب_عمل: 48, مجموع: 163 },
];

const revenueData = [
  { name: 'يناير', إيرادات: 4000, مصاريف: 2400, صافي: 1600 },
  { name: 'فبراير', إيرادات: 3000, مصاريف: 1398, صافي: 1602 },
  { name: 'مارس', إيرادات: 5000, مصاريف: 3200, صافي: 1800 },
  { name: 'أبريل', إيرادات: 8000, مصاريف: 4000, صافي: 4000 },
  { name: 'مايو', إيرادات: 6000, مصاريف: 3500, صافي: 2500 },
  { name: 'يونيو', إيرادات: 9500, مصاريف: 4200, صافي: 5300 },
];

const contentData = [
  { name: 'يناير', دورات: 15, خدمات: 25, مقالات: 10 },
  { name: 'فبراير', دورات: 12, خدمات: 30, مقالات: 8 },
  { name: 'مارس', دورات: 20, خدمات: 28, مقالات: 12 },
  { name: 'أبريل', دورات: 22, خدمات: 32, مقالات: 15 },
  { name: 'مايو', دورات: 18, خدمات: 35, مقالات: 13 },
  { name: 'يونيو', دورات: 25, خدمات: 40, مقالات: 18 },
];

const sourceData = [
  { name: 'جوجل', value: 60 },
  { name: 'وسائل التواصل', value: 20 },
  { name: 'مباشر', value: 15 },
  { name: 'آخر', value: 5 },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

// بيانات إحصائية للكروت
const stats = [
  { title: 'عدد المستخدمين', value: '2,845', increase: '+12.5%', icon: UsersIcon, color: 'bg-blue-500' },
  { title: 'الإيرادات', value: '86,342 ر.س', increase: '+23.8%', icon: DollarSignIcon, color: 'bg-green-500' },
  { title: 'المشاهدات', value: '152,256', increase: '+18.3%', icon: EyeIcon, color: 'bg-purple-500' },
  { title: 'معدل التحويل', value: '3.2%', increase: '+0.5%', icon: TrendingUpIcon, color: 'bg-amber-500' },
];

const AdminStats = () => {
  return (
    <>
      <Helmet>
        <title>الإحصائيات | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="الإحصائيات والتحليلات">
        <div className="space-y-6">
          {/* ملخص الإحصائيات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      <span className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUpIcon className="h-3 w-3 mr-1" />
                        {stat.increase} مقارنة بالشهر السابق
                      </span>
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
            <TabsList className="mb-4 w-full max-w-md mx-auto grid grid-cols-3">
              <TabsTrigger value="users">المستخدمين</TabsTrigger>
              <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
              <TabsTrigger value="content">المحتوى</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>نمو المستخدمين</CardTitle>
                    <CardDescription>إحصائيات نمو المستخدمين خلال الأشهر الستة الماضية</CardDescription>
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
                          <Line type="monotone" dataKey="مجموع" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>توزيع المستخدمين</CardTitle>
                    <CardDescription>توزيع المستخدمين حسب النوع</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'مستقل', value: 328 },
                              { name: 'محاضر', value: 156 },
                              { name: 'صاحب عمل', value: 215 },
                              { name: 'مشرف', value: 12 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {sourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>تفاصيل التسجيل</CardTitle>
                    <CardDescription>عدد المستخدمين المسجلين حسب النوع شهرياً</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
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
                          <Bar dataKey="مستقل" fill="#3b82f6" />
                          <Bar dataKey="محاضر" fill="#10b981" />
                          <Bar dataKey="صاحب_عمل" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>معدل النشاط</CardTitle>
                    <CardDescription>معدل نشاط المستخدمين خلال الأشهر الماضية</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={[
                            { month: 'يناير', نشط: 60, خامل: 40 },
                            { month: 'فبراير', نشط: 58, خامل: 42 },
                            { month: 'مارس', نشط: 68, خامل: 32 },
                            { month: 'أبريل', نشط: 72, خامل: 28 },
                            { month: 'مايو', نشط: 65, خامل: 35 },
                            { month: 'يونيو', نشط: 70, خامل: 30 },
                          ]}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="نشط" stackId="1" stroke="#10b981" fill="#10b981" />
                          <Area type="monotone" dataKey="خامل" stackId="1" stroke="#f87171" fill="#f87171" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>مصادر المستخدمين</CardTitle>
                  <CardDescription>من أين يأتي مستخدمو المنصة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sourceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إجمالي الإيرادات</CardTitle>
                    <CardDescription>إحصائيات الإيرادات خلال الأشهر الستة الماضية</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={revenueData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="إيرادات" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>الإيرادات والمصاريف</CardTitle>
                    <CardDescription>مقارنة بين الإيرادات والمصاريف شهرياً</CardDescription>
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
                          <Bar dataKey="مصاريف" fill="#f87171" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>صافي الربح</CardTitle>
                    <CardDescription>صافي الربح شهرياً</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
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
                          <Line type="monotone" dataKey="صافي" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>مصادر الإيرادات</CardTitle>
                    <CardDescription>توزيع الإيرادات حسب المصدر</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'دورات', value: 42 },
                              { name: 'خدمات', value: 35 },
                              { name: 'عمولات', value: 18 },
                              { name: 'اشتراكات', value: 5 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {sourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>نمو المحتوى</CardTitle>
                    <CardDescription>إحصائيات نمو المحتوى خلال الأشهر الستة الماضية</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={contentData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="دورات" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                          <Area type="monotone" dataKey="خدمات" stackId="1" stroke="#10b981" fill="#10b981" />
                          <Area type="monotone" dataKey="مقالات" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>أكثر الدورات مشاهدة</CardTitle>
                    <CardDescription>أكثر الدورات مشاهدة على المنصة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { name: 'تطوير تطبيقات الويب', مشاهدات: 1840 },
                            { name: 'الذكاء الاصطناعي', مشاهدات: 1620 },
                            { name: 'تصميم الجرافيك', مشاهدات: 1250 },
                            { name: 'تطوير تطبيقات الجوال', مشاهدات: 1120 },
                            { name: 'التسويق الرقمي', مشاهدات: 980 },
                          ]}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="مشاهدات" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>أكثر الخدمات مبيعاً</CardTitle>
                    <CardDescription>أكثر الخدمات مبيعاً على المنصة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { name: 'تصميم هوية بصرية', مبيعات: 68 },
                            { name: 'تطوير موقع ويب', مبيعات: 54 },
                            { name: 'كتابة محتوى', مبيعات: 48 },
                            { name: 'تحرير فيديو', مبيعات: 42 },
                            { name: 'ترجمة', مبيعات: 36 },
                          ]}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="مبيعات" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>أكثر المقالات مشاهدة</CardTitle>
                    <CardDescription>أكثر المقالات مشاهدة على المنصة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { name: 'كيف تبدأ في العمل الحر؟', مشاهدات: 2450 },
                            { name: 'أفضل 10 منصات للعمل الحر', مشاهدات: 1920 },
                            { name: 'أساسيات تصميم واجهات المستخدم', مشاهدات: 1580 },
                            { name: 'نصائح لتحسين الإنتاجية', مشاهدات: 1350 },
                            { name: 'مستقبل الذكاء الاصطناعي في التعليم', مشاهدات: 1240 },
                          ]}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="مشاهدات" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminStats;
