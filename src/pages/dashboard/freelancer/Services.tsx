
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Clock, 
  DollarSign, 
  Star
} from 'lucide-react';

const FreelancerServices = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState("all");
  
  const handleCreateService = () => {
    toast({
      title: "قريباً",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };
  
  const handleEditService = (id: string) => {
    toast({
      title: "قريباً",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };
  
  const handleDeleteService = (id: string) => {
    toast({
      title: "تم حذف الخدمة",
      description: "تم حذف الخدمة بنجاح",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>خدماتي | لوحة تحكم المستقل</title>
      </Helmet>
      
      <DashboardLayout type="freelancer" title="خدماتي">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">خدماتي</h1>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="البحث عن خدمة..." 
                  className="px-10 py-2 w-full sm:w-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline">
                <Filter className="ml-1 h-4 w-4" />
                تصفية
              </Button>
              <Button onClick={handleCreateService}>
                <Plus className="ml-1 h-4 w-4" />
                إضافة خدمة
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="active">نشطة</TabsTrigger>
              <TabsTrigger value="pending">معلقة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-4">
              <ServicesList 
                services={[
                  { 
                    id: '1', 
                    title: 'تصميم وتطوير مواقع ويب احترافية', 
                    description: 'تصميم وتطوير مواقع ويب متجاوبة وعصرية تناسب احتياجات الشركات والأفراد بأحدث التقنيات.',
                    category: 'تطوير مواقع',
                    price: 1500,
                    deliveryTime: '7-10 أيام',
                    status: 'active',
                    rating: 4.8,
                    reviews: 24,
                    orders: 35
                  },
                  { 
                    id: '2', 
                    title: 'تطوير تطبيقات الجوال', 
                    description: 'تطوير تطبيقات للهواتف الذكية بنظامي Android و iOS بتصاميم عصرية وأداء متميز.',
                    category: 'تطوير تطبيقات',
                    price: 3000,
                    deliveryTime: '15-20 يوم',
                    status: 'active',
                    rating: 4.7,
                    reviews: 18,
                    orders: 22
                  },
                  { 
                    id: '3', 
                    title: 'خدمات تسويق رقمي', 
                    description: 'تحسين محركات البحث، إدارة وسائل التواصل الاجتماعي، والتسويق بالمحتوى لزيادة الزوار وتحسين المبيعات.',
                    category: 'تسويق',
                    price: 1200,
                    deliveryTime: '5-7 أيام',
                    status: 'pending',
                    rating: 0,
                    reviews: 0,
                    orders: 0
                  }
                ]} 
                onEdit={handleEditService}
                onDelete={handleDeleteService}
              />
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4 mt-4">
              <ServicesList 
                services={[
                  { 
                    id: '1', 
                    title: 'تصميم وتطوير مواقع ويب احترافية', 
                    description: 'تصميم وتطوير مواقع ويب متجاوبة وعصرية تناسب احتياجات الشركات والأفراد بأحدث التقنيات.',
                    category: 'تطوير مواقع',
                    price: 1500,
                    deliveryTime: '7-10 أيام',
                    status: 'active',
                    rating: 4.8,
                    reviews: 24,
                    orders: 35
                  },
                  { 
                    id: '2', 
                    title: 'تطوير تطبيقات الجوال', 
                    description: 'تطوير تطبيقات للهواتف الذكية بنظامي Android و iOS بتصاميم عصرية وأداء متميز.',
                    category: 'تطوير تطبيقات',
                    price: 3000,
                    deliveryTime: '15-20 يوم',
                    status: 'active',
                    rating: 4.7,
                    reviews: 18,
                    orders: 22
                  }
                ]} 
                onEdit={handleEditService}
                onDelete={handleDeleteService}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4 mt-4">
              <ServicesList 
                services={[
                  { 
                    id: '3', 
                    title: 'خدمات تسويق رقمي', 
                    description: 'تحسين محركات البحث، إدارة وسائل التواصل الاجتماعي، والتسويق بالمحتوى لزيادة الزوار وتحسين المبيعات.',
                    category: 'تسويق',
                    price: 1200,
                    deliveryTime: '5-7 أيام',
                    status: 'pending',
                    rating: 0,
                    reviews: 0,
                    orders: 0
                  }
                ]} 
                onEdit={handleEditService}
                onDelete={handleDeleteService}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  deliveryTime: string;
  status: 'active' | 'pending' | 'rejected';
  rating: number;
  reviews: number;
  orders: number;
}

const ServicesList = ({ 
  services, 
  onEdit, 
  onDelete 
}: { 
  services: Service[], 
  onEdit: (id: string) => void, 
  onDelete: (id: string) => void 
}) => {
  if (services.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">لا توجد خدمات في هذه الفئة</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {services.map(service => (
        <Card key={service.id}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{service.title}</h3>
                  <Badge variant="outline" className={
                    service.status === 'active' ? "bg-green-50 text-green-700 border-green-200" :
                    service.status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-200" :
                    "bg-red-50 text-red-700 border-red-200"
                  }>
                    {service.status === 'active' ? 'نشطة' :
                     service.status === 'pending' ? 'قيد المراجعة' : 'مرفوضة'}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 ml-1 text-gray-400" />
                    <span>{service.category}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 ml-1 text-gray-400" />
                    <span>{service.price} ريال</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 ml-1 text-gray-400" />
                    <span>{service.deliveryTime}</span>
                  </div>
                </div>
                
                {service.rating > 0 && (
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 ml-1" />
                      <span>{service.rating}</span>
                      <span className="text-gray-500 mr-1">({service.reviews} تقييم)</span>
                    </div>
                    <div>
                      <span>{service.orders} طلب</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex md:flex-col gap-2 justify-end">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 ml-1" />
                  عرض
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit(service.id)}>
                  <Edit className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => onDelete(service.id)}>
                  <Trash2 className="h-4 w-4 ml-1" />
                  حذف
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FreelancerServices;
