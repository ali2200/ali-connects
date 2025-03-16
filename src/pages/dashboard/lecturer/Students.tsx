
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Mail, MessageSquare, UserCheck, Users } from 'lucide-react';

const LecturerStudents = () => {
  return (
    <>
      <Helmet>
        <title>الطلاب | لوحة تحكم المحاضر</title>
      </Helmet>
      
      <DashboardLayout type="lecturer" title="الطلاب">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">الطلاب</h1>
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input className="pr-10" placeholder="البحث عن طالب..." />
            </div>
          </div>
          
          {/* بطاقات إحصائية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">إجمالي الطلاب</p>
                    <h3 className="text-2xl font-bold">257</h3>
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
                    <p className="text-gray-500 text-sm">المسجلين هذا الشهر</p>
                    <h3 className="text-2xl font-bold">42</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <UserCheck className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">متوسط التقييم</p>
                    <h3 className="text-2xl font-bold">4.8</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="all">جميع الطلاب</TabsTrigger>
              <TabsTrigger value="active">نشطاء</TabsTrigger>
              <TabsTrigger value="recent">مسجلين حديثاً</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الطالب</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>الدورات المسجلة</TableHead>
                        <TableHead>تاريخ الانضمام</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 1, name: 'محمد أحمد', email: 'mohammed@example.com', avatar: 'https://i.pravatar.cc/150?img=3', courses: 3, joinDate: '2023-10-15', status: 'active' },
                        { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', avatar: 'https://i.pravatar.cc/150?img=5', courses: 2, joinDate: '2023-11-05', status: 'active' },
                        { id: 3, name: 'أحمد محمود', email: 'ahmed@example.com', avatar: 'https://i.pravatar.cc/150?img=7', courses: 1, joinDate: '2023-11-20', status: 'recent' },
                        { id: 4, name: 'نورا حسن', email: 'noura@example.com', avatar: 'https://i.pravatar.cc/150?img=9', courses: 4, joinDate: '2023-09-10', status: 'active' },
                        { id: 5, name: 'خالد عبدالله', email: 'khaled@example.com', avatar: 'https://i.pravatar.cc/150?img=11', courses: 2, joinDate: '2023-12-01', status: 'recent' }
                      ].map(student => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{student.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.courses} دورات</TableCell>
                          <TableCell>{new Date(student.joinDate).toLocaleDateString('ar-SA')}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                student.status === 'active' 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : 'bg-blue-50 text-blue-700 border-blue-200'
                              }
                            >
                              {student.status === 'active' ? 'نشط' : 'جديد'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
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
                <CardContent className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الطالب</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>الدورات المسجلة</TableHead>
                        <TableHead>تاريخ الانضمام</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 1, name: 'محمد أحمد', email: 'mohammed@example.com', avatar: 'https://i.pravatar.cc/150?img=3', courses: 3, joinDate: '2023-10-15' },
                        { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', avatar: 'https://i.pravatar.cc/150?img=5', courses: 2, joinDate: '2023-11-05' },
                        { id: 4, name: 'نورا حسن', email: 'noura@example.com', avatar: 'https://i.pravatar.cc/150?img=9', courses: 4, joinDate: '2023-09-10' }
                      ].map(student => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{student.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.courses} دورات</TableCell>
                          <TableCell>{new Date(student.joinDate).toLocaleDateString('ar-SA')}</TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
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
            
            <TabsContent value="recent" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الطالب</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>الدورات المسجلة</TableHead>
                        <TableHead>تاريخ الانضمام</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 3, name: 'أحمد محمود', email: 'ahmed@example.com', avatar: 'https://i.pravatar.cc/150?img=7', courses: 1, joinDate: '2023-11-20' },
                        { id: 5, name: 'خالد عبدالله', email: 'khaled@example.com', avatar: 'https://i.pravatar.cc/150?img=11', courses: 2, joinDate: '2023-12-01' }
                      ].map(student => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{student.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.courses} دورات</TableCell>
                          <TableCell>{new Date(student.joinDate).toLocaleDateString('ar-SA')}</TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
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
