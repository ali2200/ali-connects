
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Download, Filter, DollarSign, Clock, CheckCircle } from 'lucide-react';

const ClientPayments = () => {
  return (
    <>
      <Helmet>
        <title>المدفوعات | لوحة تحكم صاحب الأعمال</title>
      </Helmet>
      
      <DashboardLayout type="client" title="المدفوعات">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">المدفوعات</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="ml-1 h-4 w-4" />
                تصفية
              </Button>
              <Button variant="outline">
                <Download className="ml-1 h-4 w-4" />
                تصدير التقرير
              </Button>
            </div>
          </div>
          
          {/* بطاقات ملخص المدفوعات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">إجمالي المدفوعات</p>
                    <h3 className="text-2xl font-bold">48,500 ريال</h3>
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
                    <p className="text-gray-500 text-sm">مدفوعات قيد التنفيذ</p>
                    <h3 className="text-2xl font-bold">3,200 ريال</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
                    <Clock className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">مدفوعات مكتملة</p>
                    <h3 className="text-2xl font-bold">45,300 ريال</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="all">جميع المدفوعات</TabsTrigger>
              <TabsTrigger value="completed">مكتملة</TabsTrigger>
              <TabsTrigger value="pending">قيد التنفيذ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>سجل المدفوعات</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم العملية</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>المشروع</TableHead>
                        <TableHead>المستلم</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-left">المبلغ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 'PAY-001', date: '12/12/2023', project: 'تطوير موقع ويب', recipient: 'علي أحمد', status: 'completed', amount: 4500 },
                        { id: 'PAY-002', date: '05/12/2023', project: 'تصميم هوية بصرية', recipient: 'سارة محمد', status: 'completed', amount: 3500 },
                        { id: 'PAY-003', date: '01/12/2023', project: 'تطوير تطبيق موبايل', recipient: 'أحمد خالد', status: 'pending', amount: 3200 },
                        { id: 'PAY-004', date: '22/11/2023', project: 'تصميم لوجو', recipient: 'نورا علي', status: 'completed', amount: 1800 },
                        { id: 'PAY-005', date: '15/11/2023', project: 'خدمات SEO', recipient: 'محمد عمر', status: 'completed', amount: 2500 }
                      ].map(payment => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.project}</TableCell>
                          <TableCell>{payment.recipient}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                payment.status === 'completed' 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              }
                            >
                              {payment.status === 'completed' ? 'مكتملة' : 'قيد التنفيذ'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-left font-medium">
                            {payment.amount} ريال
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>المدفوعات المكتملة</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم العملية</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>المشروع</TableHead>
                        <TableHead>المستلم</TableHead>
                        <TableHead className="text-left">المبلغ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 'PAY-001', date: '12/12/2023', project: 'تطوير موقع ويب', recipient: 'علي أحمد', amount: 4500 },
                        { id: 'PAY-002', date: '05/12/2023', project: 'تصميم هوية بصرية', recipient: 'سارة محمد', amount: 3500 },
                        { id: 'PAY-004', date: '22/11/2023', project: 'تصميم لوجو', recipient: 'نورا علي', amount: 1800 },
                        { id: 'PAY-005', date: '15/11/2023', project: 'خدمات SEO', recipient: 'محمد عمر', amount: 2500 }
                      ].map(payment => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.project}</TableCell>
                          <TableCell>{payment.recipient}</TableCell>
                          <TableCell className="text-left font-medium">
                            {payment.amount} ريال
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>مدفوعات قيد التنفيذ</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم العملية</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>المشروع</TableHead>
                        <TableHead>المستلم</TableHead>
                        <TableHead className="text-left">المبلغ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 'PAY-003', date: '01/12/2023', project: 'تطوير تطبيق موبايل', recipient: 'أحمد خالد', amount: 3200 }
                      ].map(payment => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.project}</TableCell>
                          <TableCell>{payment.recipient}</TableCell>
                          <TableCell className="text-left font-medium">
                            {payment.amount} ريال
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ClientPayments;
