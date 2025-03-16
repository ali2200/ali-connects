
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Edit, Eye, Filter, Play, Search, Video } from 'lucide-react';

const LecturerLectures = () => {
  return (
    <>
      <Helmet>
        <title>المحاضرات | لوحة تحكم المحاضر</title>
      </Helmet>
      
      <DashboardLayout type="lecturer" title="المحاضرات">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">المحاضرات</h1>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input className="pr-10" placeholder="البحث عن محاضرة..." />
              </div>
              <Button variant="outline">
                <Filter className="ml-1 h-4 w-4" />
                تصفية
              </Button>
              <Button>
                <Play className="ml-1 h-4 w-4" />
                محاضرة جديدة
              </Button>
            </div>
          </div>
          
          {/* بطاقات إحصائية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">إجمالي المحاضرات</p>
                    <h3 className="text-2xl font-bold">42</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                    <Video className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">إجمالي المشاهدات</p>
                    <h3 className="text-2xl font-bold">2,356</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">إجمالي الساعات</p>
                    <h3 className="text-2xl font-bold">68:30</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                    <Clock className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>المحاضرات</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="تصنيف المحاضرات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المحاضرات</SelectItem>
                      <SelectItem value="programming">برمجة</SelectItem>
                      <SelectItem value="design">تصميم</SelectItem>
                      <SelectItem value="marketing">تسويق</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المحاضرة</TableHead>
                    <TableHead>الدورة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>المدة</TableHead>
                    <TableHead>المشاهدات</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, title: 'مقدمة في لغة البرمجة JavaScript', course: 'تعلم JavaScript من الصفر', date: '2023-12-10', duration: '01:15:00', views: 352, status: 'published' },
                    { id: 2, title: 'أساسيات التعامل مع المتغيرات والثوابت', course: 'تعلم JavaScript من الصفر', date: '2023-12-12', duration: '00:55:30', views: 297, status: 'published' },
                    { id: 3, title: 'هياكل التحكم والحلقات', course: 'تعلم JavaScript من الصفر', date: '2023-12-15', duration: '01:25:00', views: 254, status: 'published' },
                    { id: 4, title: 'الدوال في JavaScript', course: 'تعلم JavaScript من الصفر', date: '2023-12-18', duration: '01:10:45', views: 187, status: 'published' },
                    { id: 5, title: 'التعامل مع الكائنات والمصفوفات', course: 'تعلم JavaScript من الصفر', date: '2023-12-20', duration: '01:30:15', views: 0, status: 'scheduled' }
                  ].map(lecture => (
                    <TableRow key={lecture.id}>
                      <TableCell>
                        <div className="font-medium">{lecture.title}</div>
                      </TableCell>
                      <TableCell>{lecture.course}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(lecture.date).toLocaleDateString('ar-SA')}</span>
                        </div>
                      </TableCell>
                      <TableCell>{lecture.duration}</TableCell>
                      <TableCell>{lecture.views}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            lecture.status === 'published' 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }
                        >
                          {lecture.status === 'published' ? 'منشورة' : 'مجدولة'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default LecturerLectures;
