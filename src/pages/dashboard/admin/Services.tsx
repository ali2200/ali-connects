
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Search, Plus, Edit, Trash2, Package, CheckCircle, XCircle, Eye, Filter, DollarSign
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// بيانات تجريبية للخدمات
const mockServices = [
  { 
    id: '1', 
    title: 'تصميم هوية بصرية', 
    category: 'تصميم',
    freelancer: 'أحمد محمد',
    price: 350,
    rating: 4.8,
    sales: 68,
    date: '2023-06-15',
    status: 'نشط',
  },
  { 
    id: '2', 
    title: 'تطوير موقع ويب', 
    category: 'برمجة',
    freelancer: 'محمد العبدالله',
    price: 1200,
    rating: 4.6,
    sales: 54,
    date: '2023-07-20',
    status: 'نشط',
  },
  { 
    id: '3', 
    title: 'كتابة محتوى تسويقي', 
    category: 'كتابة وترجمة',
    freelancer: 'سارة أحمد',
    price: 180,
    rating: 4.7,
    sales: 48,
    date: '2023-08-05',
    status: 'نشط',
  },
  { 
    id: '4', 
    title: 'تحرير فيديو احترافي', 
    category: 'فيديو',
    freelancer: 'خالد العتيبي',
    price: 450,
    rating: 4.5,
    sales: 42,
    date: '2023-09-10',
    status: 'مراجعة',
  },
  { 
    id: '5', 
    title: 'ترجمة إنجليزي - عربي', 
    category: 'كتابة وترجمة',
    freelancer: 'نورة السالم',
    price: 120,
    rating: 4.4,
    sales: 36,
    date: '2023-10-18',
    status: 'محظور',
  },
];

const AdminServices = () => {
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setServices(mockServices);
    } else {
      const filtered = mockServices.filter(service => 
        service.title.includes(e.target.value) || 
        service.category.includes(e.target.value) ||
        service.freelancer.includes(e.target.value)
      );
      setServices(filtered);
    }
  };
  
  const handleDeleteService = (serviceId) => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      setServices(services.filter(service => service.id !== serviceId));
      toast({
        title: "تم حذف الخدمة",
        description: "تم حذف الخدمة بنجاح",
      });
    }
  };
  
  const handleUpdateStatus = (serviceId, newStatus) => {
    setServices(services.map(service => 
      service.id === serviceId ? { ...service, status: newStatus } : service
    ));
    
    toast({
      title: "تم تحديث حالة الخدمة",
      description: `تم تغيير حالة الخدمة إلى ${newStatus}`,
    });
  };
  
  const renderStatus = (status) => {
    switch (status) {
      case 'نشط':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            نشط
          </span>
        );
      case 'مراجعة':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
            مراجعة
          </span>
        );
      case 'محظور':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
            محظور
          </span>
        );
      default:
        return status;
    }
  };
  
  return (
    <>
      <Helmet>
        <title>إدارة الخدمات | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="إدارة الخدمات">
        <div className="space-y-6">
          {/* رأس الصفحة */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="البحث عن خدمة..." 
                className="pr-10" 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 ml-2" />
                فلترة
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة خدمة
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>إضافة خدمة جديدة</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">عنوان الخدمة</label>
                      <Input placeholder="أدخل عنوان الخدمة" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">التصنيف</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>تصميم</option>
                        <option>برمجة</option>
                        <option>كتابة وترجمة</option>
                        <option>فيديو</option>
                        <option>صوتيات</option>
                        <option>تسويق</option>
                        <option>أعمال</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">المستقل</label>
                      <Input placeholder="اسم المستقل" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">السعر</label>
                      <Input type="number" placeholder="سعر الخدمة" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الحالة</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>نشط</option>
                        <option>مراجعة</option>
                        <option>محظور</option>
                      </select>
                    </div>
                    <Button className="w-full">إضافة الخدمة</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* تبويبات الخدمات */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 w-full max-w-md grid grid-cols-3">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="active">نشط</TabsTrigger>
              <TabsTrigger value="pending">مراجعة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>جميع الخدمات</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>قائمة بجميع الخدمات في المنصة</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>الخدمة</TableHead>
                        <TableHead>التصنيف</TableHead>
                        <TableHead>المستقل</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>التقييم</TableHead>
                        <TableHead>المبيعات</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>{service.id}</TableCell>
                          <TableCell className="font-medium">{service.title}</TableCell>
                          <TableCell>{service.category}</TableCell>
                          <TableCell>{service.freelancer}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 text-gray-500 ml-1" />
                              {service.price} ر.س
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 ml-1" />
                              {service.rating}/5
                            </div>
                          </TableCell>
                          <TableCell>{service.sales}</TableCell>
                          <TableCell>
                            {renderStatus(service.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>تعديل الخدمة</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">عنوان الخدمة</label>
                                      <Input defaultValue={service.title} />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">التصنيف</label>
                                      <select 
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        defaultValue={service.category}
                                      >
                                        <option>تصميم</option>
                                        <option>برمجة</option>
                                        <option>كتابة وترجمة</option>
                                        <option>فيديو</option>
                                        <option>صوتيات</option>
                                        <option>تسويق</option>
                                        <option>أعمال</option>
                                      </select>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">المستقل</label>
                                      <Input defaultValue={service.freelancer} />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">السعر</label>
                                      <Input type="number" defaultValue={service.price} />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">الحالة</label>
                                      <select 
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        defaultValue={service.status}
                                      >
                                        <option>نشط</option>
                                        <option>مراجعة</option>
                                        <option>محظور</option>
                                      </select>
                                    </div>
                                    <Button className="w-full">حفظ التغييرات</Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteService(service.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => window.open(`/marketplace/${service.id}`, '_blank')}
                              >
                                <Eye className="h-4 w-4 text-blue-500" />
                              </Button>
                              
                              {service.status !== 'نشط' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(service.id, 'نشط')}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                              
                              {service.status !== 'محظور' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(service.id, 'محظور')}
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>الخدمات النشطة</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>قائمة بالخدمات النشطة في المنصة</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>الخدمة</TableHead>
                        <TableHead>التصنيف</TableHead>
                        <TableHead>المستقل</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>التقييم</TableHead>
                        <TableHead>المبيعات</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services
                        .filter(service => service.status === 'نشط')
                        .map((service) => (
                          <TableRow key={service.id}>
                            <TableCell>{service.id}</TableCell>
                            <TableCell className="font-medium">{service.title}</TableCell>
                            <TableCell>{service.category}</TableCell>
                            <TableCell>{service.freelancer}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-gray-500 ml-1" />
                                {service.price} ر.س
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 ml-1" />
                                {service.rating}/5
                              </div>
                            </TableCell>
                            <TableCell>{service.sales}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleDeleteService(service.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => window.open(`/marketplace/${service.id}`, '_blank')}
                                >
                                  <Eye className="h-4 w-4 text-blue-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(service.id, 'محظور')}
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>الخدمات قيد المراجعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>قائمة بالخدمات قيد المراجعة في المنصة</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>الخدمة</TableHead>
                        <TableHead>التصنيف</TableHead>
                        <TableHead>المستقل</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>تاريخ التقديم</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services
                        .filter(service => service.status === 'مراجعة')
                        .map((service) => (
                          <TableRow key={service.id}>
                            <TableCell>{service.id}</TableCell>
                            <TableCell className="font-medium">{service.title}</TableCell>
                            <TableCell>{service.category}</TableCell>
                            <TableCell>{service.freelancer}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-gray-500 ml-1" />
                                {service.price} ر.س
                              </div>
                            </TableCell>
                            <TableCell>{service.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleDeleteService(service.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(service.id, 'نشط')}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(service.id, 'محظور')}
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
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

const Star = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

export default AdminServices;
