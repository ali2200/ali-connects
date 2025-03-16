
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Users, Clock, Search, Plus, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const coursesData = [
  {
    id: 1,
    title: 'مقدمة في التسويق الرقمي للمبتدئين',
    description: 'دورة شاملة للمبتدئين في مجال التسويق الرقمي، تغطي أساسيات وتقنيات التسويق الإلكتروني.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    students: 78,
    status: 'active',
    lessons: 24,
    duration: '12 ساعة',
    price: 199,
    rating: 4.7,
    published: true
  },
  {
    id: 2,
    title: 'التسويق عبر وسائل التواصل الاجتماعي',
    description: 'استراتيجيات متقدمة للتسويق عبر منصات التواصل الاجتماعي المختلفة وتحسين التفاعل.',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    students: 65,
    status: 'active',
    lessons: 18,
    duration: '9 ساعات',
    price: 249,
    rating: 4.9,
    published: true
  },
  {
    id: 3,
    title: 'تحليلات جوجل للمسوقين',
    description: 'تعلم كيفية استخدام تحليلات جوجل لتحسين أداء حملاتك التسويقية وموقعك الإلكتروني.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5hbHl0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    students: 42,
    status: 'active',
    lessons: 15,
    duration: '7 ساعات',
    price: 179,
    rating: 4.6,
    published: true
  },
  {
    id: 4,
    title: 'استراتيجيات تحسين محركات البحث المتقدمة',
    description: 'استراتيجيات متقدمة لتحسين ظهور موقعك في نتائج البحث وزيادة الزيارات العضوية.',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    students: 56,
    status: 'active',
    lessons: 20,
    duration: '10 ساعات',
    price: 299,
    rating: 4.8,
    published: true
  },
  {
    id: 5,
    title: 'إعلانات الدفع لكل نقرة (PPC)',
    description: 'دورة شاملة حول إدارة حملات الدفع لكل نقرة على جوجل وفيسبوك وكيفية تحسين عائد الاستثمار.',
    image: 'https://images.unsplash.com/photo-1607703703520-bb638e84caf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBwY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    students: 38,
    status: 'draft',
    lessons: 22,
    duration: '11 ساعة',
    price: 249,
    rating: 0,
    published: false
  }
];

const LecturerCourses = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredCourses = coursesData.filter(course => 
    course.title.includes(searchTerm) || 
    course.description.includes(searchTerm)
  );
  
  return (
    <>
      <Helmet>
        <title>إدارة الدورات | لوحة تحكم المحاضر</title>
      </Helmet>
      
      <DashboardLayout type="lecturer" title="إدارة الدورات">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">الدورات التدريبية</h1>
            
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  placeholder="بحث عن دورة..." 
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button className="md:w-auto">
                <Plus className="ml-2 h-4 w-4" />
                دورة جديدة
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {!course.published && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">
                      مسودة
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 bg-black/20 text-white hover:bg-black/40 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link to={`/dashboard/lecturer/courses/${course.id}`} className="flex items-center">
                            <Eye className="ml-2 h-4 w-4" />
                            <span>عرض</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to={`/dashboard/lecturer/courses/${course.id}/edit`} className="flex items-center">
                            <Edit className="ml-2 h-4 w-4" />
                            <span>تعديل</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="ml-2 h-4 w-4" />
                          <span>حذف</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{course.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Users className="h-4 w-4 ml-2 text-gray-500" />
                      <span>{course.students} طالب</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <BookOpen className="h-4 w-4 ml-2 text-gray-500" />
                      <span>{course.lessons} درس</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 ml-2 text-gray-500" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="font-bold text-lg">{course.price} ر.س</div>
                    <div className="flex items-center">
                      {course.published ? (
                        <Button variant="outline" size="sm" className="ml-2">
                          إيقاف النشر
                        </Button>
                      ) : (
                        <Button size="sm" className="ml-2">
                          نشر
                        </Button>
                      )}
                      <Link to={`/dashboard/lecturer/courses/${course.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد دورات</h3>
                <p className="text-gray-500 mb-6">لم يتم العثور على أي دورات تطابق معايير البحث.</p>
                <Button onClick={() => setSearchTerm('')}>عرض كل الدورات</Button>
              </div>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default LecturerCourses;
