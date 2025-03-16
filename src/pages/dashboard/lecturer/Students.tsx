
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, MessageSquare, UserRound, GraduationCap, BookOpen, Users, Calendar } from 'lucide-react';

const LecturerStudents = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  
  return (
    <>
      <Helmet>
        <title>الطلاب | لوحة تحكم المحاضر</title>
      </Helmet>
      
      <DashboardLayout type="lecturer" title="الطلاب">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">الطلاب</h1>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="البحث عن طالب..." 
                  className="px-10 py-2 w-full sm:w-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline">
                <Filter className="ml-1 h-4 w-4" />
                تصفية
              </Button>
            </div>
          </div>
          
          {/* بطاقات إحصائية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">إجمالي الطلاب</p>
                    <h3 className="text-2xl font-bold">856</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">طلاب جدد (هذا الشهر)</p>
                    <h3 className="text-2xl font-bold">68</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <UserRound className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">نسبة إتمام الدورات</p>
                    <h3 className="text-2xl font-bold">73%</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">متوسط المشاهدات</p>
                    <h3 className="text-2xl font-bold">12.8</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                    <BookOpen className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* قائمة الطلاب */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="all">جميع الطلاب</TabsTrigger>
              <TabsTrigger value="active">نشطين</TabsTrigger>
              <TabsTrigger value="inactive">غير نشطين</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>قائمة الطلاب</CardTitle>
                  <CardDescription>جميع الطلاب المسجلين في دوراتك</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الطالب</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>عدد الدورات</TableHead>
                        <TableHead>تاريخ الانضمام</TableHead>
                        <TableHead>آخر نشاط</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', avatar: 'https://i.pravatar.cc/150?img=1', courses: 4, joinDate: '2023-01-15', lastActivity: '2023-12-08', status: 'active' },
                        { id: 2, name: 'سارة أحمد', email: 'sara@example.com', avatar: 'https://i.pravatar.cc/150?img=5', courses: 2, joinDate: '2023-03-22', lastActivity: '2023-12-05', status: 'active' },
                        { id: 3, name: 'محمد علي', email: 'mohamed@example.com', avatar: 'https://i.pravatar.cc/150?img=3', courses: 5, joinDate: '2022-11-10', lastActivity: '2023-12-01', status: 'active' },
                        { id: 4, name: 'فاطمة حسن', email: 'fatima@example.com', avatar: 'https://i.pravatar.cc/150?img=10', courses: 3, joinDate: '2023-05-18', lastActivity: '2023-11-20', status: 'inactive' },
                        { id: 5, name: 'خالد العلي', email: 'khaled@example.com', avatar: 'https://i.pravatar.cc/150?img=8', courses: 1, joinDate: '2023-09-05', lastActivity: '2023-11-15', status: 'inactive' }
                      ].map(student => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{student.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.courses}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{new Date(student.joinDate).toLocaleDateString('ar-SA')}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{new Date(student.lastActivity).toLocaleDateString('ar-SA')}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                student.status === 'active' 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : 'bg-gray-50 text-gray-700 border-gray-200'
                              }
                            >
                              {student.status === 'active' ? 'نشط' : 'غير نشط'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="icon">
                                <MessageSquare className="h-4 w-4" />
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
            
            <TabsContent value="active" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>الطلاب النشطين</CardTitle>
                  <CardDescription>الطلاب النشطين خلال الـ 30 يوم الماضية</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الطالب</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>عدد الدورات</TableHead>
                        <TableHead>تاريخ الانضمام</TableHead>
                        <TableHead>آخر نشاط</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', avatar: 'https://i.pravatar.cc/150?img=1', courses: 4, joinDate: '2023-01-15', lastActivity: '2023-12-08', status: 'active' },
                        { id: 2, name: 'سارة أحمد', email: 'sara@example.com', avatar: 'https://i.pravatar.cc/150?img=5', courses: 2, joinDate: '2023-03-22', lastActivity: '2023-12-05', status: 'active' },
                        { id: 3, name: 'محمد علي', email: 'mohamed@example.com', avatar: 'https://i.pravatar.cc/150?img=3', courses: 5, joinDate: '2022-11-10', lastActivity: '2023-12-01', status: 'active' }
                      ].map(student => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{student.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.courses}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{new Date(student.joinDate).toLocaleDateString('ar-SA')}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{new Date(student.lastActivity).toLocaleDateString('ar-SA')}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              نشط
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="icon">
                                <MessageSquare className="h-4 w-4" />
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
            
            <TabsContent value="inactive" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>الطلاب غير النشطين</CardTitle>
                  <CardDescription>الطلاب الذين لم يكن لديهم نشاط خلال الـ 30 يوم الماضية</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الطالب</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>عدد الدورات</TableHead>
                        <TableHead>تاريخ الانضمام</TableHead>
                        <TableHead>آخر نشاط</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 4, name: 'فاطمة حسن', email: 'fatima@example.com', avatar: 'https://i.pravatar.cc/150?img=10', courses: 3, joinDate: '2023-05-18', lastActivity: '2023-11-20', status: 'inactive' },
                        { id: 5, name: 'خالد العلي', email: 'khaled@example.com', avatar: 'https://i.pravatar.cc/150?img=8', courses: 1, joinDate: '2023-09-05', lastActivity: '2023-11-15', status: 'inactive' }
                      ].map(student => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{student.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.courses}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{new Date(student.joinDate).toLocaleDateString('ar-SA')}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{new Date(student.lastActivity).toLocaleDateString('ar-SA')}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className="bg-gray-50 text-gray-700 border-gray-200"
                            >
                              غير نشط
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="icon">
                                <MessageSquare className="h-4 w-4" />
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

export default LecturerStudents;
