
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Star, Eye, ArrowUpDown, MoreHorizontal, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// نموذج بيانات الكتب
const books = [
  {
    id: 1,
    title: 'أساسيات التسويق الرقمي',
    cover: 'https://source.unsplash.com/random/300x400?book&sig=1',
    price: 85,
    sales: 124,
    rating: 4.8,
    status: 'published',
    date: '15 مارس 2023',
    category: 'تسويق'
  },
  {
    id: 2,
    title: 'البرمجة بلغة جافاسكريبت للمبتدئين',
    cover: 'https://source.unsplash.com/random/300x400?programming&sig=2',
    price: 95,
    sales: 86,
    rating: 4.6,
    status: 'published',
    date: '10 أبريل 2023',
    category: 'برمجة'
  },
  {
    id: 3,
    title: 'تصميم واجهات المستخدم الحديثة',
    cover: 'https://source.unsplash.com/random/300x400?design&sig=3',
    price: 75,
    sales: 142,
    rating: 4.9,
    status: 'published',
    date: '5 مايو 2023',
    category: 'تصميم'
  },
  {
    id: 4,
    title: 'تحليل البيانات والذكاء الاصطناعي',
    cover: 'https://source.unsplash.com/random/300x400?data&sig=4',
    price: 120,
    sales: 67,
    rating: 4.7,
    status: 'draft',
    date: '20 يونيو 2023',
    category: 'تحليل بيانات'
  }
];

const LecturerBooks = () => {
  return (
    <>
      <Helmet>
        <title>الكتب | لوحة تحكم المحاضر</title>
      </Helmet>
      
      <DashboardLayout type="lecturer" title="إدارة الكتب">
        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">الكتب</h1>
              <p className="text-gray-500">إدارة ونشر الكتب الإلكترونية الخاصة بك</p>
            </div>
            <Link to="/dashboard/lecturer/books/upload">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                رفع كتاب جديد
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">إجمالي الكتب</h3>
                <p className="text-3xl font-bold">4</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">متوسط التقييم</h3>
                <p className="text-3xl font-bold">4.7</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">إجمالي المبيعات</h3>
                <p className="text-3xl font-bold">419</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-amber-100 p-3 rounded-full mb-4">
                  <ArrowUpDown className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">الإيرادات (الشهر)</h3>
                <p className="text-3xl font-bold">3,750 ر.س</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>كتبي المنشورة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div key={book.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <img 
                        src={book.cover} 
                        alt={book.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={book.status === 'published' ? 'default' : 'secondary'}>
                          {book.status === 'published' ? 'منشور' : 'مسودة'}
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              تعديل الكتاب
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              معاينة الكتاب
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="text-xs">
                          {book.category}
                        </Badge>
                        <div className="flex items-center mr-auto text-yellow-500">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs mr-1">{book.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{book.title}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 ml-1" />
                          {book.date}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                        <span className="text-gray-500 text-sm">{book.sales} مبيعات</span>
                        <span className="font-bold text-green-600">{book.price} ر.س</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default LecturerBooks;
