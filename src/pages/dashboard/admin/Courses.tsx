
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Search, Plus, Edit, Trash2, BookOpen, CheckCircle, XCircle, Eye, Filter, DollarSign, User
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// بيانات تجريبية للدورات
const mockCourses = [
  { 
    id: '1', 
    title: 'تطوير تطبيقات الويب باستخدام React', 
    category: 'برمجة',
    instructor: 'محمد العبدالله',
    students: 128,
    price: 450,
    rating: 4.8,
    lessons: 24,
    duration: '12 ساعة',
    level: 'متوسط',
    date: '2023-05-15',
    status: 'نشط',
  },
  { 
    id: '2', 
    title: 'مقدمة في الذكاء الاصطناعي', 
    category: 'ذكاء اصطناعي',
    instructor: 'خالد العتيبي',
    students: 96,
    price: 550,
    rating: 4.7,
    lessons: 32,
    duration: '16 ساعة',
    level: 'متقدم',
    date: '2023-06-20',
    status: 'نشط',
  },
  { 
    id: '3', 
    title: 'تصميم الجرافيك للمبتدئين', 
    category: 'تصميم',
    instructor: 'سارة أحمد',
    students: 215,
    price: 350,
    rating: 4.6,
    lessons: 18,
    duration: '8 ساعات',
    level: 'مبتدئ',
    date: '2023-07-10',
    status: 'نشط',
  },
  { 
    id: '4', 
    title: 'تطوير تطبيقات الجوال باستخدام Flutter', 
    category: 'برمجة',
    instructor: 'أحمد محمد',
    students: 86,
    price: 480,
    rating: 4.5,
    lessons: 28,
    duration: '14 ساعة',
    level: 'متوسط',
    date: '2023-08-15',
    status: 'مراجعة',
  },
  { 
    id: '5', 
    title: 'التسويق الرقمي الشامل', 
    category: 'تسويق',
    instructor: 'نورة السالم',
    students: 175,
    price: 420,
    rating: 4.4,
    lessons: 22,
    duration: '10 ساعات',
    level: 'مبتدئ',
    date: '2023-09-05',
    status: 'محظور',
  },
];

const AdminCourses = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setCourses(mockCourses);
    } else {
      const filtered = mockCourses.filter(course => 
        course.title.includes(e.target.value) || 
        course.category.includes(e.target.value) ||
        course.instructor.includes(e.target.value)
      );
      setCourses(filtered);
    }
  };
  
  const handleDeleteCourse = (courseId) => {
    if (confirm('هل أنت متأكد من حذف هذه الدورة؟')) {
      setCourses(courses.filter(course => course.id !== courseId));
      toast({
        title: "تم حذف الدورة",
        description: "تم حذف الدورة بنجاح",
      });
    }
  };
  
  const handleUpdateStatus = (courseId, newStatus) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: newStatus } : course
    ));
    
    toast({
      title: "تم تحديث حالة الدورة",
      description: `تم تغيير حالة الدورة إلى ${newStatus}`,
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
        <title>إدارة الدورات | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="إدارة الدورات">
        <div className="space-y-6">
          {/* رأس الصفحة */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="البحث عن دورة..." 
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
                    إضافة دورة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>إضافة دورة جديدة</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">عنوان الدورة</label>
                      <Input placeholder="أدخل عنوان الدورة" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">التصنيف</label>
                        <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>برمجة</option>
                          <option>تصميم</option>
                          <option>ذكاء اصطناعي</option>
                          <option>تسويق</option>
                          <option>أعمال</option>
                          <option>لغات</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">المحاضر</label>
                        <Input placeholder="اسم المحاضر" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">السعر</label>
                        <Input type="number" placeholder="سعر الدورة" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">عدد الدروس</label>
                        <Input type="number" placeholder="عدد الدروس" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">المستوى</label>
                        <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>مبتدئ</option>
                          <option>متوسط</option>
                          <option>متقدم</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">وصف الدورة</label>
                      <Textarea placeholder="أدخل وصف الدورة" className="min-h-[100px]" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">صورة الدورة</label>
                      <div className="flex items-center gap-2">
                        <Input type="file" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الحالة</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>نشط</option>
                        <option>مراجعة</option>
                        <option>محظور</option>
                      </select>
                    </div>
                    
                    <Button className="w-full">إضافة الدورة</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* تبويبات الدورات */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 w-full max-w-md grid grid-cols-3">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="active">نشط</TabsTrigger>
              <TabsTrigger value="pending">مراجعة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>جميع الدورات</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>قائمة بجميع الدورات في المنصة</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>الدورة</TableHead>
                        <TableHead>التصنيف</TableHead>
                        <TableHead>المحاضر</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>التقييم</TableHead>
                        <TableHead>الطلاب</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>{course.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{course.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {course.level} • {course.lessons} درس • {course.duration}
                            </div>
                          </TableCell>
                          <TableCell>{course.category}</TableCell>
                          <TableCell>{course.instructor}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 text-gray-500 ml-1" />
                              {course.price} ر.س
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 ml-1" />
                              {course.rating}/5
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-gray-500 ml-1" />
                              {course.students}
                            </div>
                          </TableCell>
                          <TableCell>
                            {renderStatus(course.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>تعديل الدورة</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">عنوان الدورة</label>
                                      <Input defaultValue={course.title} />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">التصنيف</label>
                                        <select 
                                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                          defaultValue={course.category}
                                        >
                                          <option>برمجة</option>
                                          <option>تصميم</option>
                                          <option>ذكاء اصطناعي</option>
                                          <option>تسويق</option>
                                          <option>أعمال</option>
                                          <option>لغات</option>
                                        </select>
                                      </div>
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">المحاضر</label>
                                        <Input defaultValue={course.instructor} />
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">السعر</label>
                                        <Input type="number" defaultValue={course.price} />
                                      </div>
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">عدد الدروس</label>
                                        <Input type="number" defaultValue={course.lessons} />
                                      </div>
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">المستوى</label>
                                        <select 
                                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                          defaultValue={course.level}
                                        >
                                          <option>مبتدئ</option>
                                          <option>متوسط</option>
                                          <option>متقدم</option>
                                        </select>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">الحالة</label>
                                      <select 
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        defaultValue={course.status}
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
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => window.open(`/courses/${course.id}`, '_blank')}
                              >
                                <Eye className="h-4 w-4 text-blue-500" />
                              </Button>
                              
                              {course.status !== 'نشط' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(course.id, 'نشط')}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                              
                              {course.status !== 'محظور' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(course.id, 'محظور')}
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
                  <CardTitle>الدورات النشطة</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>قائمة بالدورات النشطة في المنصة</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>الدورة</TableHead>
                        <TableHead>التصنيف</TableHead>
                        <TableHead>المحاضر</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>التقييم</TableHead>
                        <TableHead>الطلاب</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses
                        .filter(course => course.status === 'نشط')
                        .map((course) => (
                          <TableRow key={course.id}>
                            <TableCell>{course.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{course.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {course.level} • {course.lessons} درس • {course.duration}
                              </div>
                            </TableCell>
                            <TableCell>{course.category}</TableCell>
                            <TableCell>{course.instructor}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-gray-500 ml-1" />
                                {course.price} ر.س
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 ml-1" />
                                {course.rating}/5
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-gray-500 ml-1" />
                                {course.students}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleDeleteCourse(course.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => window.open(`/courses/${course.id}`, '_blank')}
                                >
                                  <Eye className="h-4 w-4 text-blue-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(course.id, 'محظور')}
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
                  <CardTitle>الدورات قيد المراجعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>قائمة بالدورات قيد المراجعة في المنصة</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>الدورة</TableHead>
                        <TableHead>التصنيف</TableHead>
                        <TableHead>المحاضر</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>تاريخ التقديم</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses
                        .filter(course => course.status === 'مراجعة')
                        .map((course) => (
                          <TableRow key={course.id}>
                            <TableCell>{course.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{course.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {course.level} • {course.lessons} درس • {course.duration}
                              </div>
                            </TableCell>
                            <TableCell>{course.category}</TableCell>
                            <TableCell>{course.instructor}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-gray-500 ml-1" />
                                {course.price} ر.س
                              </div>
                            </TableCell>
                            <TableCell>{course.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleDeleteCourse(course.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(course.id, 'نشط')}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(course.id, 'محظور')}
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

export default AdminCourses;
