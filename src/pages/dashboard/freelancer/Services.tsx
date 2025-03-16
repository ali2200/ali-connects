
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Briefcase, DollarSign, Clock, Star, Plus } from 'lucide-react';

const FreelancerServices = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("active");
  
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تمت إضافة الخدمة",
      description: "تم إضافة الخدمة بنجاح وستظهر في صفحة الخدمات",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>الخدمات | لوحة تحكم المستقل</title>
      </Helmet>
      
      <DashboardLayout type="freelancer" title="الخدمات">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">الخدمات</h1>
            <div>
              <Button onClick={() => document.getElementById('add-service-form')?.scrollIntoView({ behavior: 'smooth' })}>
                <Plus className="ml-1 h-4 w-4" />
                إضافة خدمة جديدة
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="active">نشطة</TabsTrigger>
              <TabsTrigger value="pending">قيد المراجعة</TabsTrigger>
              <TabsTrigger value="rejected">مرفوضة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-4 space-y-4">
              <ServicesGrid
                services={[
                  {
                    id: "1",
                    title: "تصميم واجهات المستخدم الاحترافية",
                    description: "تصميم احترافي لواجهات المستخدم مع مراعاة تجربة المستخدم وسهولة الاستخدام",
                    price: 1500,
                    delivery: "3-5 أيام",
                    category: "تصميم",
                    image: "https://placehold.co/500x300/4338CA/white?text=UI+Design",
                    rating: 4.8,
                    reviewsCount: 32
                  },
                  {
                    id: "2",
                    title: "تطوير مواقع ويب تفاعلية",
                    description: "إنشاء مواقع ويب تفاعلية مع تصميم متجاوب ومتوافق مع جميع الأجهزة",
                    price: 3000,
                    delivery: "7-10 أيام",
                    category: "برمجة",
                    image: "https://placehold.co/500x300/4338CA/white?text=Web+Dev",
                    rating: 4.6,
                    reviewsCount: 24
                  }
                ]}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-4 space-y-4">
              <ServicesGrid
                services={[
                  {
                    id: "3",
                    title: "تصميم لوجو وهوية بصرية",
                    description: "تصميم لوجو وهوية بصرية متكاملة لشركتك مع عدة نماذج مختلفة",
                    price: 2500,
                    delivery: "4-7 أيام",
                    category: "تصميم جرافيك",
                    image: "https://placehold.co/500x300/4338CA/white?text=Logo+Design",
                    rating: 0,
                    reviewsCount: 0,
                    status: "pending"
                  }
                ]}
              />
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-4 space-y-4">
              <ServicesGrid
                services={[
                  {
                    id: "4",
                    title: "تحليل بيانات وإعداد تقارير",
                    description: "تحليل بيانات شركتك وإعداد تقارير احترافية مع توصيات",
                    price: 2000,
                    delivery: "5-8 أيام",
                    category: "تحليل بيانات",
                    image: "https://placehold.co/500x300/4338CA/white?text=Data+Analysis",
                    rating: 0,
                    reviewsCount: 0,
                    status: "rejected",
                    rejectionReason: "تحتاج إلى وصف أكثر تفصيلاً للخدمة وتعديل السعر ليكون مناسباً للسوق"
                  }
                ]}
              />
            </TabsContent>
          </Tabs>
          
          <Card id="add-service-form">
            <CardHeader>
              <CardTitle>إضافة خدمة جديدة</CardTitle>
              <CardDescription>أضف خدمة جديدة لعرضها في سوق الخدمات</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddService} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان الخدمة</Label>
                    <Input id="title" placeholder="مثال: تصميم موقع ويب احترافي" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">تصنيف الخدمة</Label>
                    <Input id="category" placeholder="مثال: تصميم، برمجة، تسويق" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">السعر (بالريال)</Label>
                    <Input id="price" type="number" min={1} placeholder="مثال: 1500" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery">مدة التسليم</Label>
                    <Input id="delivery" placeholder="مثال: 3-5 أيام" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">وصف الخدمة</Label>
                  <Textarea 
                    id="description" 
                    placeholder="اكتب وصفاً مفصلاً للخدمة..." 
                    rows={5}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">صورة الخدمة</Label>
                  <Input id="image" type="file" accept="image/*" required />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">إضافة الخدمة</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

// مكون عرض الخدمات
interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  delivery: string;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  status?: 'active' | 'pending' | 'rejected';
  rejectionReason?: string;
}

const ServicesGrid = ({ services }: { services: Service[] }) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map(service => (
        <Card key={service.id}>
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {service.status === 'pending' && (
                <Badge className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                  قيد المراجعة
                </Badge>
              )}
              {service.status === 'rejected' && (
                <Badge className="absolute top-2 right-2 bg-red-100 text-red-800 border-red-300">
                  مرفوضة
                </Badge>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <p className="text-gray-600 line-clamp-2 text-sm mt-1">{service.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-3 text-sm">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {service.category}
                </Badge>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 ml-1 text-gray-400" />
                  <span>{service.delivery}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 ml-1 text-gray-400" />
                  <span>{service.price} ريال</span>
                </div>
              </div>
              
              {service.status === 'rejected' && (
                <div className="bg-red-50 p-2 rounded-md mt-2">
                  <p className="text-sm text-red-800">سبب الرفض: {service.rejectionReason}</p>
                </div>
              )}
              
              {service.rating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{service.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({service.reviewsCount} تقييم)</span>
                </div>
              )}
              
              <div className="flex gap-2 mt-3">
                {!service.status || service.status === 'active' ? (
                  <>
                    <Button variant="outline" size="sm">
                      تعديل
                    </Button>
                    <Button variant="destructive" size="sm">
                      إيقاف
                    </Button>
                  </>
                ) : service.status === 'rejected' ? (
                  <Button size="sm">
                    إعادة تقديم
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    إلغاء التقديم
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FreelancerServices;
