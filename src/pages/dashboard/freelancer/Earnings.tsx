
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, BarChart } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, TrendingUp, ArrowUpRight, Calendar, Download, Filter, CreditCard } from 'lucide-react';

const FreelancerEarnings = () => {
  const [period, setPeriod] = useState("monthly");
  const [year, setYear] = useState("2023");
  
  return (
    <>
      <Helmet>
        <title>الأرباح | لوحة تحكم المستقل</title>
      </Helmet>
      
      <DashboardLayout type="freelancer" title="الأرباح">
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
                    <h3 className="text-2xl font-bold">14,500 ريال</h3>
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
                    <h3 className="text-2xl font-bold">2,800 ريال</h3>
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
                    <h3 className="text-2xl font-bold">5,250 ريال</h3>
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
                      +16.5%
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
                <AreaChart 
                  data={[
                    { name: 'يناير', total: 1500 },
                    { name: 'فبراير', total: 2300 },
                    { name: 'مارس', total: 3200 },
                    { name: 'أبريل', total: 2800 },
                    { name: 'مايو', total: 3800 },
                    { name: 'يونيو', total: 4200 },
                    { name: 'يوليو', total: 3700 },
                    { name: 'أغسطس', total: 4800 },
                    { name: 'سبتمبر', total: 5100 },
                    { name: 'أكتوبر', total: 5800 },
                    { name: 'نوفمبر', total: 4900 },
                    { name: 'ديسمبر', total: 5250 }
                  ]}
                  categories={['total']}
                  index="name"
                  colors={['#3b82f6']}
                  valueFormatter={(value) => `${value} ريال`}
                  yAxisWidth={70}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* المشاريع والمعاملات */}
          <Tabs defaultValue="transactions">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="transactions">المعاملات</TabsTrigger>
              <TabsTrigger value="projects">مصادر الدخل</TabsTrigger>
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
                        <TableHead>المشروع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-left">المبلغ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 1, type: 'دفعة', date: '10/12/2023', project: 'تصميم موقع ويب', status: 'completed', amount: 3000 },
                        { id: 2, type: 'سحب', date: '05/12/2023', project: '-', status: 'completed', amount: -5000 },
                        { id: 3, type: 'دفعة', date: '28/11/2023', project: 'تطوير تطبيق موبايل', status: 'completed', amount: 4500 },
                        { id: 4, type: 'عمولة', date: '28/11/2023', project: 'تطوير تطبيق موبايل', status: 'completed', amount: -450 },
                        { id: 5, type: 'دفعة', date: '15/11/2023', project: 'تصميم هوية بصرية', status: 'pending', amount: 2800 }
                      ].map(transaction => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.project}</TableCell>
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
            
            <TabsContent value="projects" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>مصادر الدخل</CardTitle>
                  <CardDescription>توزيع الدخل حسب نوع المشاريع والخدمات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <BarChart 
                      data={[
                        { name: 'تطوير مواقع', total: 18500 },
                        { name: 'تطوير تطبيقات', total: 12300 },
                        { name: 'تصميم واجهات', total: 8200 },
                        { name: 'خدمات SEO', total: 5100 },
                        { name: 'تصميم جرافيك', total: 3500 }
                      ]}
                      categories={['total']}
                      index="name"
                      colors={['#3b82f6']}
                      valueFormatter={(value) => `${value} ريال`}
                      yAxisWidth={70}
                    />
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

export default FreelancerEarnings;
