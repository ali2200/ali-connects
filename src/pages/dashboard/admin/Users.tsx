
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
  Search, Plus, Edit, Trash2, UserPlus, Filter, UserCheck, UserX, CheckCircle, XCircle, Shield
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// بيانات تجريبية للمستخدمين
const mockUsers = [
  { 
    id: '1', 
    name: 'أحمد محمد', 
    email: 'ahmed@example.com', 
    role: 'مستقل', 
    status: 'نشط',
    joined: '2023-05-15',
    verified: true
  },
  { 
    id: '2', 
    name: 'سارة أحمد', 
    email: 'sarah@example.com', 
    role: 'محاضر', 
    status: 'نشط',
    joined: '2023-06-20',
    verified: true
  },
  { 
    id: '3', 
    name: 'خالد العتيبي', 
    email: 'khalid@example.com', 
    role: 'صاحب عمل', 
    status: 'نشط',
    joined: '2023-07-10',
    verified: true
  },
  { 
    id: '4', 
    name: 'فاطمة علي', 
    email: 'fatima@example.com', 
    role: 'مستقل', 
    status: 'معلق',
    joined: '2023-08-05',
    verified: false
  },
  { 
    id: '5', 
    name: 'محمد العبدالله', 
    email: 'mohammad@example.com', 
    role: 'محاضر', 
    status: 'محظور',
    joined: '2023-09-12',
    verified: true
  },
  { 
    id: '6', 
    name: 'نورة السالم', 
    email: 'noura@example.com', 
    role: 'صاحب عمل', 
    status: 'نشط',
    joined: '2023-10-18',
    verified: true
  },
  { 
    id: '7', 
    name: 'عبدالله الزهراني', 
    email: 'abdullah@example.com', 
    role: 'مشرف', 
    status: 'نشط',
    joined: '2023-11-25',
    verified: true
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setUsers(mockUsers);
    } else {
      const filtered = mockUsers.filter(user => 
        user.name.includes(e.target.value) || 
        user.email.includes(e.target.value)
      );
      setUsers(filtered);
    }
  };
  
  const handleDeleteUser = (userId) => {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: "تم حذف المستخدم",
        description: "تم حذف المستخدم بنجاح",
      });
    }
  };
  
  const handleUpdateStatus = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: "تم تحديث حالة المستخدم",
      description: `تم تغيير حالة المستخدم إلى ${newStatus}`,
    });
  };
  
  return (
    <>
      <Helmet>
        <title>إدارة المستخدمين | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="إدارة المستخدمين">
        <div className="space-y-6">
          {/* رأس الصفحة */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="البحث عن مستخدم..." 
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
                    <UserPlus className="h-4 w-4 ml-2" />
                    إضافة مستخدم
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الاسم الكامل</label>
                      <Input placeholder="أدخل الاسم الكامل" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">البريد الإلكتروني</label>
                      <Input placeholder="أدخل البريد الإلكتروني" type="email" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">كلمة المرور</label>
                      <Input placeholder="أدخل كلمة المرور" type="password" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">نوع المستخدم</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>مستقل</option>
                        <option>محاضر</option>
                        <option>صاحب عمل</option>
                        <option>مشرف</option>
                      </select>
                    </div>
                    <Button className="w-full">إضافة المستخدم</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* تبويبات المستخدمين */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 w-full max-w-md grid grid-cols-4">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="active">نشط</TabsTrigger>
              <TabsTrigger value="pending">معلق</TabsTrigger>
              <TabsTrigger value="blocked">محظور</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>جميع المستخدمين</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>قائمة بجميع المستخدمين في المنصة</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>التحقق</TableHead>
                        <TableHead>تاريخ التسجيل</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{user.name}</div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {user.role === 'مشرف' ? (
                                <Shield className="h-4 w-4 text-purple-500 ml-1" />
                              ) : null}
                              {user.role}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === 'نشط' ? 'bg-green-100 text-green-800' : 
                              user.status === 'معلق' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {user.verified ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </TableCell>
                          <TableCell>{user.joined}</TableCell>
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
                                    <DialogTitle>تعديل بيانات المستخدم</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">الاسم الكامل</label>
                                      <Input defaultValue={user.name} />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">البريد الإلكتروني</label>
                                      <Input defaultValue={user.email} type="email" />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">نوع المستخدم</label>
                                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={user.role}>
                                        <option>مستقل</option>
                                        <option>محاضر</option>
                                        <option>صاحب عمل</option>
                                        <option>مشرف</option>
                                      </select>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">حالة المستخدم</label>
                                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={user.status}>
                                        <option>نشط</option>
                                        <option>معلق</option>
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
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                              
                              {user.status !== 'نشط' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(user.id, 'نشط')}
                                >
                                  <UserCheck className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                              
                              {user.status !== 'محظور' && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleUpdateStatus(user.id, 'محظور')}
                                >
                                  <UserX className="h-4 w-4 text-red-500" />
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
                  <CardTitle>المستخدمين النشطين</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>قائمة بالمستخدمين النشطين في المنصة</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>التحقق</TableHead>
                        <TableHead>تاريخ التسجيل</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.filter(user => user.status === 'نشط').map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{user.name}</div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {user.role === 'مشرف' ? (
                                <Shield className="h-4 w-4 text-purple-500 ml-1" />
                              ) : null}
                              {user.role}
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.verified ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleUpdateStatus(user.id, 'محظور')}
                              >
                                <UserX className="h-4 w-4 text-red-500" />
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
                  <CardTitle>المستخدمين المعلقين</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>قائمة بالمستخدمين المعلقين في المنصة</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>التحقق</TableHead>
                        <TableHead>تاريخ التسجيل</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.filter(user => user.status === 'معلق').map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{user.name}</div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {user.role === 'مشرف' ? (
                                <Shield className="h-4 w-4 text-purple-500 ml-1" />
                              ) : null}
                              {user.role}
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.verified ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleUpdateStatus(user.id, 'نشط')}
                              >
                                <UserCheck className="h-4 w-4 text-green-500" />
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
            
            <TabsContent value="blocked">
              <Card>
                <CardHeader>
                  <CardTitle>المستخدمين المحظورين</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>قائمة بالمستخدمين المحظورين في المنصة</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>التحقق</TableHead>
                        <TableHead>تاريخ التسجيل</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.filter(user => user.status === 'محظور').map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{user.name}</div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {user.role === 'مشرف' ? (
                                <Shield className="h-4 w-4 text-purple-500 ml-1" />
                              ) : null}
                              {user.role}
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.verified ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleUpdateStatus(user.id, 'نشط')}
                              >
                                <UserCheck className="h-4 w-4 text-green-500" />
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

export default AdminUsers;
