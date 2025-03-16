
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Filter, Download, CreditCard, Plus } from 'lucide-react';

const ClientPayments = () => {
  return (
    <>
      <Helmet>
        <title>المدفوعات | لوحة تحكم صاحب الأعمال</title>
      </Helmet>
      
      <DashboardLayout type="client" title="المدفوعات">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-2xl font-bold">المدفوعات</h1>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline">
                <Filter className="ml-1 h-4 w-4" />
                تصفية
              </Button>
              <Button variant="outline">
                <Download className="ml-1 h-4 w-4" />
                تصدير
              </Button>
              <Button>
                <Plus className="ml-1 h-4 w-4" />
                إضافة بطاقة
              </Button>
            </div>
          </div>
          
          {/* البطاقات الإحصائية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">إجمالي المدفوعات</p>
                    <h3 className="text-2xl font-bold">15,800 ريال</h3>
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
                    <p className="text-gray-500 text-sm">مدفوعات الشهر الحالي</p>
                    <h3 className="text-2xl font-bold">3,200 ريال</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">مدفوعات معلقة</p>
                    <h3 className="text-2xl font-bold">1,500 ريال</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <CreditCard className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* طرق الدفع والمعاملات */}
          <Tabs defaultValue="transactions">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="transactions">المعاملات</TabsTrigger>
              <TabsTrigger value="payment-methods">طرق الدفع</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>سجل المعاملات</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم العملية</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الوصف</TableHead>
                        <TableHead>طريقة الدفع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-left">المبلغ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 'INV-001', date: '10/12/2023', description: 'دفعة مشروع تصميم موقع', method: 'فيزا ****4582', status: 'completed', amount: 3500 },
                        { id: 'INV-002', date: '25/11/2023', description: 'دفعة مشروع تطوير تطبيق', method: 'ماستركارد ****6291', status: 'completed', amount: 4200 },
                        { id: 'INV-003', date: '15/11/2023', description: 'دفعة مشروع تسويق', method: 'باي بال', status: 'completed', amount: 1800 },
                        { id: 'INV-004', date: '05/11/2023', description: 'دفعة مشروع تصميم شعار', method: 'فيزا ****4582', status: 'completed', amount: 800 },
                        { id: 'INV-005', date: '01/12/2023', description: 'دفعة مشروع برمجة', method: 'ماستركارد ****6291', status: 'pending', amount: 1500 }
                      ].map(transaction => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                transaction.status === 'completed' 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              }
                            >
                              {transaction.status === 'completed' ? 'مكتملة' : 'قيد المعالجة'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-left font-medium">
                            {transaction.amount} ريال
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payment-methods" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>بطاقات الدفع</CardTitle>
                  <CardDescription>إدارة بطاقات الدفع المحفوظة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-center">
                        <div className="h-10 w-14 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold mr-4">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">فيزا تنتهي بـ 4582</p>
                          <p className="text-sm text-gray-500">تنتهي في 05/2025</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-green-50 text-green-700 border-green-200">
                          افتراضية
                        </Badge>
                        <Button variant="outline" size="sm">
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          حذف
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-center">
                        <div className="h-10 w-14 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold mr-4">
                          MC
                        </div>
                        <div>
                          <p className="font-medium">ماستركارد تنتهي بـ 6291</p>
                          <p className="text-sm text-gray-500">تنتهي في 09/2024</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          تعيين كافتراضية
                        </Button>
                        <Button variant="outline" size="sm">
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          حذف
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-center">
                        <div className="h-10 w-14 bg-blue-400 rounded-md flex items-center justify-center text-white font-bold mr-4">
                          PAYPAL
                        </div>
                        <div>
                          <p className="font-medium">حساب باي بال</p>
                          <p className="text-sm text-gray-500">example@mail.com</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          تعيين كافتراضية
                        </Button>
                        <Button variant="outline" size="sm">
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          حذف
                        </Button>
                      </div>
                    </div>
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

export default ClientPayments;
