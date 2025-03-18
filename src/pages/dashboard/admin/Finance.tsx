
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { 
  Search, Download, Filter, ArrowUp, ArrowDown, CheckCircle, AlertCircle,
  DollarSign, CreditCard, Calendar, Package, BookOpen, User
} from 'lucide-react';

// بيانات تجريبية للرسوم البيانية
const revenueData = [
  { name: 'يناير', إيرادات: 4000, مصاريف: 2400, صافي: 1600 },
  { name: 'فبراير', إيرادات: 3000, مصاريف: 1398, صافي: 1602 },
  { name: 'مارس', إيرادات: 5000, مصاريف: 3200, صافي: 1800 },
  { name: 'أبريل', إيرادات: 8000, مصاريف: 4000, صافي: 4000 },
  { name: 'مايو', إيرادات: 6000, مصاريف: 3500, صافي: 2500 },
  { name: 'يونيو', إيرادات: 9500, مصاريف: 4200, صافي: 5300 },
];

const sourceData = [
  { name: 'دورات', value: 42 },
  { name: 'خدمات', value: 35 },
  { name: 'عمولات', value: 18 },
  { name: 'اشتراكات', value: 5 },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

// بيانات تجريبية للمعاملات
const mockTransactions = [
  { 
    id: 'TRX-001', 
    date: '2023-06-15', 
    user: 'أحمد محمد',
    type: 'دورة',
    item: 'تطوير تطبيقات الويب باستخدام React',
    amount: 450,
    method: 'بطاقة ائتمان',
    status: 'مكتمل',
  },
  { 
    id: 'TRX-002', 
    date: '2023-06-18', 
    user: 'سارة أحمد',
    type: 'خدمة',
    item: 'تصميم هوية بصرية',
    amount: 350,
    method: 'PayPal',
    status: 'مكتمل',
  },
  { 
    id: 'TRX-003', 
    date: '2023-06-20', 
    user: 'خالد العتيبي',
    type: 'دورة',
    item: 'مقدمة في الذكاء الاصطناعي',
    amount: 550,
    method: 'تحويل بنكي',
    status: 'مكتمل',
  },
  { 
    id: 'TRX-004', 
    date: '2023-06-22', 
    user: 'محمد العبدالله',
    type: 'اشتراك',
    item: 'اشتراك سنوي - Premium',
    amount: 1200,
    method: 'بطاقة ائتمان',
    status: 'مكتمل',
  },
  { 
    id: 'TRX-005', 
    date: '2023-06-25', 
    user: 'فاطمة علي',
    type: 'عمولة',
    item: 'عمولة خدمة تصميم',
    amount: -85,
    method: 'تحويل بنكي',
    status: 'قيد المعالجة',
  },
  { 
    id: 'TRX-006', 
    date: '2023-06-28', 
    user: 'نورة السالم',
    type: 'خدمة',
    item: 'ترجمة إنجليزي - عربي',
    amount: 120,
    method: 'بطاقة ائتمان',
    status: 'مكتمل',
  },
  { 
    id: 'TRX-007', 
    date: '2023-06-30', 
    user: 'عبدالله الزهراني',
    type: 'دورة',
    item: 'تصميم الجرافيك للمبتدئين',
    amount: 350,
    method: 'بطاقة ائتمان',
    status: 'ملغي',
  },
];

const AdminFinance = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setTransactions(mockTransactions);
    } else {
      const filtered = mockTransactions.filter(tx => 
        tx.user.includes(e.target.value) || 
        tx.item.includes(e.target.value) ||
        tx.id.includes(e.target.value)
      );
      setTransactions(filtered);
    }
  };
  
  // حساب إجمالي الإيرادات والمصروفات
  const totalRevenue = mockTransactions
    .filter(tx => tx.status === 'مكتمل' && tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(tx => tx.status === 'مكتمل' && tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  
  const netProfit = totalRevenue - totalExpenses;
  
  const renderTransactionType = (type) => {
    switch (type) {
      case 'دورة':
        return (
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 text-blue-500 ml-1" />
            {type}
          </div>
        );
      case 'خدمة':
        return (
          <div className="flex items-center">
            <Package className="h-4 w-4 text-green-500 ml-1" />
            {type}
          </div>
        );
      case 'اشتراك':
        return (
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 text-purple-500 ml-1" />
            {type}
          </div>
        );
      case 'عمولة':
        return (
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-amber-500 ml-1" />
            {type}
          </div>
        );
      default:
        return type;
    }
  };
  
  const renderTransactionStatus = (status) => {
    switch (status) {
      case 'مكتمل':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 flex items-center justify-center">
            <CheckCircle className="h-3 w-3 ml-1" />
            {status}
          </span>
        );
      case 'قيد المعالجة':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 flex items-center justify-center">
            <Clock className="h-3 w-3 ml-1" />
            {status}
          </span>
        );
      case 'ملغي':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 flex items-center justify-center">
            <AlertCircle className="h-3 w-3 ml-1" />
            {status}
          </span>
        );
      default:
        return status;
    }
  };
  
  return (
    <>
      <Helmet>
        <title>الإدارة المالية | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="الإدارة المالية">
        <div className="space-y-6">
          {/* ملخص مالي */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-700">إجمالي الإيرادات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{totalRevenue.toLocaleString()} ر.س</p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      +12.5% مقارنة بالشهر السابق
                    </p>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-red-700">إجمالي المصروفات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{totalExpenses.toLocaleString()} ر.س</p>
                    <p className="text-xs text-red-600 flex items-center mt-1">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      -3.2% مقارنة بالشهر السابق
                    </p>
                  </div>
                  <div className="bg-red-500 p-3 rounded-full">
                    <ArrowDown className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-700">صافي الربح</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{netProfit.toLocaleString()} ر.س</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      +18.3% مقارنة بالشهر السابق
                    </p>
                  </div>
                  <div className="bg-green-500 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* الرسوم البيانية */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الإيرادات والمصروفات</CardTitle>
                <CardDescription>مقارنة بين الإيرادات والمصروفات شهرياً</CardDescription>
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
                      <Bar dataKey="إيرادات" fill="#3b82f6" />
                      <Bar dataKey="مصاريف" fill="#ef4444" />
                    </BarChart>
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
                        data={sourceData}
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
          
          {/* المعاملات المالية */}
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>المعاملات المالية</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-full md:w-64">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    placeholder="البحث في المعاملات..." 
                    className="pr-10" 
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 ml-2" />
                  فلترة
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4 w-full max-w-md grid grid-cols-3">
                  <TabsTrigger value="all">جميع المعاملات</TabsTrigger>
                  <TabsTrigger value="income">الإيرادات</TabsTrigger>
                  <TabsTrigger value="expense">المصروفات</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <Table>
                    <TableCaption>جميع المعاملات المالية</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم العملية</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>التفاصيل</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>طريقة الدفع</TableHead>
                        <TableHead>الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-medium">{tx.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-500 ml-1" />
                              {tx.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-gray-500 ml-1" />
                              {tx.user}
                            </div>
                          </TableCell>
                          <TableCell>{renderTransactionType(tx.type)}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{tx.item}</TableCell>
                          <TableCell className={tx.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                            {tx.amount < 0 ? '-' : '+'}{Math.abs(tx.amount).toLocaleString()} ر.س
                          </TableCell>
                          <TableCell>{tx.method}</TableCell>
                          <TableCell>{renderTransactionStatus(tx.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="income">
                  <Table>
                    <TableCaption>معاملات الإيرادات</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم العملية</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>التفاصيل</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>طريقة الدفع</TableHead>
                        <TableHead>الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions
                        .filter(tx => tx.amount > 0)
                        .map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell className="font-medium">{tx.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-500 ml-1" />
                                {tx.date}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-gray-500 ml-1" />
                                {tx.user}
                              </div>
                            </TableCell>
                            <TableCell>{renderTransactionType(tx.type)}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{tx.item}</TableCell>
                            <TableCell className="text-green-600">
                              +{tx.amount.toLocaleString()} ر.س
                            </TableCell>
                            <TableCell>{tx.method}</TableCell>
                            <TableCell>{renderTransactionStatus(tx.status)}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="expense">
                  <Table>
                    <TableCaption>معاملات المصروفات</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم العملية</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>التفاصيل</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>طريقة الدفع</TableHead>
                        <TableHead>الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions
                        .filter(tx => tx.amount < 0)
                        .map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell className="font-medium">{tx.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-500 ml-1" />
                                {tx.date}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-gray-500 ml-1" />
                                {tx.user}
                              </div>
                            </TableCell>
                            <TableCell>{renderTransactionType(tx.type)}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{tx.item}</TableCell>
                            <TableCell className="text-red-600">
                              -{Math.abs(tx.amount).toLocaleString()} ر.س
                            </TableCell>
                            <TableCell>{tx.method}</TableCell>
                            <TableCell>{renderTransactionStatus(tx.status)}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

const TrendingUp = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const Clock = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default AdminFinance;
