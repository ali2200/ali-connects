
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, TrendingUp, ArrowUpRight, Calendar, Download, Filter, CreditCard } from 'lucide-react';
import { AreaChart, BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const LecturerEarnings = () => {
  const [period, setPeriod] = useState("monthly");
  const [year, setYear] = useState("2023");
  
  const monthlyData = [
    { name: 'يناير', total: 1800 },
    { name: 'فبراير', total: 2100 },
    { name: 'مارس', total: 3500 },
    { name: 'أبريل', total: 3000 },
    { name: 'مايو', total: 3900 },
    { name: 'يونيو', total: 4500 },
    { name: 'يوليو', total: 4000 },
    { name: 'أغسطس', total: 5200 },
    { name: 'سبتمبر', total: 5500 },
    { name: 'أكتوبر', total: 6000 },
    { name: 'نوفمبر', total: 5200 },
    { name: 'ديسمبر', total: 5600 }
  ];
  
  const sourceData = [
    { name: 'دورات البرمجة', total: 22500 },
    { name: 'دورات التصميم', total: 14300 },
    { name: 'دورات التسويق', total: 9200 },
    { name: 'الكتب الإلكترونية', total: 6100 },
    { name: 'الاستشارات', total: 3500 }
  ];
  
  return (
    <>
      <Helmet>
        <title>الأرباح | لوحة تحكم المحاضر</title>
      </Helmet>
      
      <DashboardLayout type="lecturer" title="الأرباح">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-2xl font-bold">الأرباح</h1>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline">
                <CreditCard className="ml-1 h-4 w-4" />
                طلب سحب الرصيد
              </Button>
              <Button variant="outline">
                <Download className="ml-1 h-4 w-4" />
                تصدير التقرير
              </Button>
            </div>
          </div>
          
          {/* البطاقات الإحصائية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">الرصيد المتاح</p>
                    <h3 className="text-2xl font-bold">16,800 ريال</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">قيد التحويل</p>
                    <h3 className="text-2xl font-bold">3,500 ريال</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <CreditCard className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">إجمالي الشهر</p>
                    <h3 className="text-2xl font-bold">5,600 ريال</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">نسبة النمو</p>
                    <h3 className="text-2xl font-bold">
                      +18.2%
                      <span className="text-sm text-green-600 mr-1">
                        <ArrowUpRight className="inline h-3 w-3" />
                      </span>
                    </h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* الرسم البياني */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle>تقرير الأرباح</CardTitle>
                  <CardDescription>مخطط الأرباح على مدار العام</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="المدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">أسبوعي</SelectItem>
                      <SelectItem value="monthly">شهري</SelectItem>
                      <SelectItem value="yearly">سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="السنة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    total: {
                      label: "الإجمالي",
                      color: "#3b82f6",
                    },
                  }}
                >
                  <AreaChart
                    data={monthlyData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      stroke="#888888"
                      fontSize={12}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      stroke="#888888"
                      fontSize={12}
                      width={70}
                      tickFormatter={(value) => `${value} ريال`}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area
                      dataKey="total"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#total)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* المشاريع والمعاملات */}
          <Tabs defaultValue="transactions">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="transactions">المعاملات</TabsTrigger>
              <TabsTrigger value="sources">مصادر الدخل</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>سجل المعاملات</CardTitle>
                    <Button variant="outline" size="sm">
                      <Filter className="ml-1 h-4 w-4" />
                      تصفية
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المعاملة</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>المصدر</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-left">المبلغ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 1, type: 'دفعة', date: '10/12/2023', source: 'مبيعات الدورات', status: 'completed', amount: 3500 },
                        { id: 2, type: 'سحب', date: '05/12/2023', source: '-', status: 'completed', amount: -4000 },
                        { id: 3, type: 'دفعة', date: '30/11/2023', source: 'مبيعات الكتب', status: 'completed', amount: 2100 },
                        { id: 4, type: 'عمولة', date: '30/11/2023', source: 'مبيعات الكتب', status: 'completed', amount: -210 },
                        { id: 5, type: 'دفعة', date: '20/11/2023', source: 'استشارات', status: 'pending', amount: 1500 }
                      ].map(transaction => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.source}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                transaction.status === 'completed' 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              }
                            >
                              {transaction.status === 'completed' ? 'مكتملة' : 'قيد التنفيذ'}
                            </Badge>
                          </TableCell>
                          <TableCell className={`text-left font-medium ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {transaction.amount < 0 ? transaction.amount : `+${transaction.amount}`} ريال
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sources" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>مصادر الدخل</CardTitle>
                  <CardDescription>توزيع الدخل حسب نوع المصادر</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        total: {
                          label: "الإجمالي",
                          color: "#3b82f6",
                        },
                      }}
                    >
                      <BarChart
                        data={sourceData}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 0,
                        }}
                      >
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          stroke="#888888"
                          fontSize={12}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          stroke="#888888"
                          fontSize={12}
                          width={70}
                          tickFormatter={(value) => `${value} ريال`}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
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

export default LecturerEarnings;
