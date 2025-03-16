
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, DollarSign, Clock, CheckCircle2, AlertCircle, User, Calendar, MessageSquare, FileText } from 'lucide-react';

// صفحة المشاريع (عرض جميع المشاريع أو مشروع واحد)
const FreelancerProjects = () => {
  const { id } = useParams(); // معرف المشروع (إذا كان موجودًا)
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(id ? "details" : "all");
  
  // إذا كان هناك معرف مشروع، فسنعرض صفحة تفاصيل المشروع
  if (id) {
    return <ProjectDetails id={id} />;
  }
  
  // عرض كل المشاريع
  return (
    <>
      <Helmet>
        <title>المشاريع | لوحة تحكم المستقل</title>
      </Helmet>
      
      <DashboardLayout type="freelancer" title="المشاريع">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">المشاريع</h1>
            <div>
              <Button variant="outline" onClick={() => window.open('/marketplace', '_blank')}>
                تصفح المشاريع المتاحة
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="active">جارية</TabsTrigger>
              <TabsTrigger value="completed">مكتملة</TabsTrigger>
              <TabsTrigger value="pending">معلقة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-4">
              <ProjectsList 
                projects={[
                  { id: '1', title: 'تطوير موقع ويب لشركة تجارية', status: 'active', progress: 65, client: 'شركة الفا للتجارة', amount: 4500, deadline: '15 يوم', category: 'تطوير مواقع' },
                  { id: '2', title: 'تصميم هوية بصرية', status: 'completed', progress: 100, client: 'مؤسسة الإبداع', amount: 3500, deadline: 'تم الانتهاء', category: 'تصميم جرافيك' },
                  { id: '3', title: 'تطوير تطبيق موبايل', status: 'active', progress: 40, client: 'شركة تقنية', amount: 7800, deadline: '30 يوم', category: 'تطوير تطبيقات' },
                  { id: '4', title: 'إنشاء محتوى تسويقي', status: 'pending', progress: 0, client: 'مؤسسة الريادة', amount: 2200, deadline: 'بانتظار الموافقة', category: 'تسويق' },
                  { id: '5', title: 'تصميم واجهة مستخدم', status: 'completed', progress: 100, client: 'شركة تك سوليوشنز', amount: 3200, deadline: 'تم الانتهاء', category: 'تصميم' }
                ]} 
              />
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4 mt-4">
              <ProjectsList 
                projects={[
                  { id: '1', title: 'تطوير موقع ويب لشركة تجارية', status: 'active', progress: 65, client: 'شركة الفا للتجارة', amount: 4500, deadline: '15 يوم', category: 'تطوير مواقع' },
                  { id: '3', title: 'تطوير تطبيق موبايل', status: 'active', progress: 40, client: 'شركة تقنية', amount: 7800, deadline: '30 يوم', category: 'تطوير تطبيقات' }
                ]} 
              />
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4 mt-4">
              <ProjectsList 
                projects={[
                  { id: '2', title: 'تصميم هوية بصرية', status: 'completed', progress: 100, client: 'مؤسسة الإبداع', amount: 3500, deadline: 'تم الانتهاء', category: 'تصميم جرافيك' },
                  { id: '5', title: 'تصميم واجهة مستخدم', status: 'completed', progress: 100, client: 'شركة تك سوليوشنز', amount: 3200, deadline: 'تم الانتهاء', category: 'تصميم' }
                ]} 
              />
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4 mt-4">
              <ProjectsList 
                projects={[
                  { id: '4', title: 'إنشاء محتوى تسويقي', status: 'pending', progress: 0, client: 'مؤسسة الريادة', amount: 2200, deadline: 'بانتظار الموافقة', category: 'تسويق' }
                ]} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

// مكون عرض قائمة المشاريع
interface Project {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  progress: number;
  client: string;
  amount: number;
  deadline: string;
  category: string;
}

const ProjectsList = ({ projects }: { projects: Project[] }) => {
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">لا توجد مشاريع في هذه الفئة</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {projects.map(project => (
        <Card key={project.id}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{project.title}</h3>
                  <Badge variant="outline" className={
                    project.status === 'active' ? "bg-blue-50 text-blue-700 border-blue-200" :
                    project.status === 'completed' ? "bg-green-50 text-green-700 border-green-200" :
                    project.status === 'pending' ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                    "bg-red-50 text-red-700 border-red-200"
                  }>
                    {project.status === 'active' ? 'قيد التنفيذ' :
                     project.status === 'completed' ? 'مكتمل' :
                     project.status === 'pending' ? 'معلق' : 'ملغي'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {project.title} - مشروع مع {project.client}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 ml-1 text-gray-400" />
                    <span>{project.category}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 ml-1 text-gray-400" />
                    <span>{project.amount} ريال</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 ml-1 text-gray-400" />
                    <span>{project.deadline}</span>
                  </div>
                </div>
              </div>
              <div className="md:w-40 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>نسبة الإنجاز</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <Link to={`/dashboard/freelancer/projects/${project.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    إدارة المشروع
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// صفحة تفاصيل المشروع
const ProjectDetails = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  
  // بيانات المشروع (محاكاة)
  const project = {
    id,
    title: id === '1' ? 'تطوير موقع ويب لشركة تجارية' : 
           id === '2' ? 'تصميم هوية بصرية' : 
           id === '3' ? 'تطوير تطبيق موبايل' : 
           id === '4' ? 'إنشاء محتوى تسويقي' : 'مشروع',
    description: 'تطوير موقع ويب احترافي متكامل باستخدام React و Node.js، مع لوحة تحكم وصفحات متعددة ودعم لكافة أحجام الشاشات...',
    status: id === '1' || id === '3' ? 'active' : 
            id === '2' || id === '5' ? 'completed' : 'pending',
    progress: id === '1' ? 65 : 
              id === '3' ? 40 : 
              id === '2' || id === '5' ? 100 : 0,
    client: id === '1' ? 'شركة الفا للتجارة' : 
            id === '2' ? 'مؤسسة الإبداع' : 
            id === '3' ? 'شركة تقنية' : 
            id === '4' ? 'مؤسسة الريادة' : 'شركة',
    clientImage: "https://i.pravatar.cc/150?img=3",
    amount: id === '1' ? 4500 : 
            id === '2' ? 3500 : 
            id === '3' ? 7800 : 
            id === '4' ? 2200 : 3000,
    deadline: id === '1' ? '2023-12-30' : 
              id === '2' ? '2023-11-15' : 
              id === '3' ? '2024-01-15' : 
              id === '4' ? '2023-12-10' : '2023-12-31',
    category: id === '1' ? 'تطوير مواقع' : 
              id === '2' ? 'تصميم جرافيك' : 
              id === '3' ? 'تطوير تطبيقات' : 
              id === '4' ? 'تسويق' : 'تصميم',
    startDate: '2023-10-15',
    tasks: [
      { id: 't1', title: 'تحليل متطلبات المشروع', status: 'completed', deadline: '2023-10-20' },
      { id: 't2', title: 'تصميم واجهات المستخدم', status: 'completed', deadline: '2023-11-05' },
      { id: 't3', title: 'برمجة الواجهة الأمامية', status: 'active', deadline: '2023-11-30' },
      { id: 't4', title: 'برمجة الواجهة الخلفية', status: 'pending', deadline: '2023-12-15' },
      { id: 't5', title: 'اختبار وإصلاح الأخطاء', status: 'pending', deadline: '2023-12-25' }
    ],
    messages: [
      { id: 'm1', sender: 'client', content: 'مرحبًا، كيف تسير الأمور في المشروع؟', timestamp: '2023-10-16 09:30' },
      { id: 'm2', sender: 'freelancer', content: 'الأمور تسير بشكل جيد، انتهيت من تحليل المتطلبات وبدأت في التصميم.', timestamp: '2023-10-16 10:45' },
      { id: 'm3', sender: 'client', content: 'رائع! هل يمكنك إرسال بعض النماذج الأولية عندما تنتهي من التصميم؟', timestamp: '2023-10-16 11:15' },
      { id: 'm4', sender: 'freelancer', content: 'بالتأكيد، سأرسلها لك خلال يومين.', timestamp: '2023-10-16 11:30' }
    ],
    files: [
      { id: 'f1', name: 'متطلبات المشروع.pdf', size: '1.2 MB', uploadDate: '2023-10-15', uploadedBy: 'client' },
      { id: 'f2', name: 'التصميم المبدئي.zip', size: '4.5 MB', uploadDate: '2023-10-25', uploadedBy: 'freelancer' },
      { id: 'f3', name: 'ملاحظات على التصميم.docx', size: '0.8 MB', uploadDate: '2023-10-27', uploadedBy: 'client' }
    ]
  };
  
  const handleUpdateStatus = (status: string) => {
    toast({
      title: "تم تحديث حالة المشروع",
      description: `تم تغيير حالة المشروع إلى "${status}"`,
    });
  };
  
  const handleDeliverTask = (taskId: string) => {
    toast({
      title: "تم تسليم المهمة",
      description: "تم إرسال إشعار إلى العميل بتسليم المهمة",
    });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const message = form.message.value;
    
    if (message.trim()) {
      toast({
        title: "تم إرسال الرسالة",
        description: "تم إرسال رسالتك بنجاح",
      });
      form.reset();
    }
  };
  
  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم رفع الملف",
      description: "تم رفع الملف بنجاح",
    });
  };
  
  const getRemainingDays = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  return (
    <>
      <Helmet>
        <title>{project.title} | إدارة المشروع</title>
      </Helmet>
      
      <DashboardLayout type="freelancer" title="إدارة المشروع">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Link to="/dashboard/freelancer/projects" className="text-blue-600 hover:underline text-sm">
                  المشاريع
                </Link>
                <span className="text-gray-500">/</span>
                <span className="text-gray-500 text-sm">{project.title}</span>
              </div>
              <h1 className="text-2xl font-bold mt-2">{project.title}</h1>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.status !== 'completed' && (
                <Button 
                  variant="outline" 
                  onClick={() => handleUpdateStatus('تم تسليمه')}
                  className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                >
                  تسليم المشروع
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* معلومات المشروع */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات المشروع</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">وصف المشروع</h3>
                    <p className="text-gray-700">{project.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">حالة المشروع</p>
                      <Badge className={
                        project.status === 'active' ? "bg-blue-50 text-blue-700 border-blue-200" :
                        project.status === 'completed' ? "bg-green-50 text-green-700 border-green-200" :
                        "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }>
                        {project.status === 'active' ? 'قيد التنفيذ' :
                         project.status === 'completed' ? 'مكتمل' : 'معلق'}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">التصنيف</p>
                      <p className="font-medium">{project.category}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">تاريخ البدء</p>
                      <p className="font-medium">{project.startDate}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">تاريخ التسليم</p>
                      <p className="font-medium">{project.deadline}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">المدة المتبقية</p>
                      <p className="font-medium">{getRemainingDays(project.deadline)} يوم</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">قيمة المشروع</p>
                      <p className="font-medium">{project.amount} ريال</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">نسبة الإنجاز</p>
                    <div className="flex items-center gap-4">
                      <Progress value={project.progress} className="h-2.5 flex-1" />
                      <span className="font-semibold text-sm">{project.progress}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="details">المهام</TabsTrigger>
                  <TabsTrigger value="messages">المحادثات</TabsTrigger>
                  <TabsTrigger value="files">الملفات</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>المهام</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {project.tasks.map(task => (
                          <li key={task.id} className="border-b pb-4 last:border-0">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start">
                                {task.status === 'completed' ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 ml-2" />
                                ) : task.status === 'active' ? (
                                  <Clock className="h-5 w-5 text-blue-500 mt-0.5 ml-2" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 ml-2" />
                                )}
                                <div>
                                  <h4 className="font-medium">{task.title}</h4>
                                  <p className="text-sm text-gray-500">
                                    تاريخ التسليم: {task.deadline}
                                  </p>
                                </div>
                              </div>
                              {task.status === 'active' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDeliverTask(task.id)}
                                >
                                  تسليم
                                </Button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>المحادثات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="max-h-96 overflow-y-auto space-y-4 mb-4">
                          {project.messages.map(message => (
                            <div 
                              key={message.id} 
                              className={`flex ${message.sender === 'freelancer' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.sender === 'freelancer' 
                                    ? 'bg-blue-50 text-blue-900' 
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs mt-1 text-gray-500">{message.timestamp}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <form onSubmit={handleSendMessage}>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              name="message"
                              placeholder="اكتب رسالتك..."
                              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            <Button type="submit">
                              إرسال
                            </Button>
                          </div>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="files" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>الملفات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <ul className="space-y-2">
                          {project.files.map(file => (
                            <li key={file.id} className="border rounded-lg p-3 flex justify-between items-center">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-blue-500 ml-2" />
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {file.size} • {file.uploadDate} • بواسطة {file.uploadedBy === 'client' ? 'العميل' : 'أنت'}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                تنزيل
                              </Button>
                            </li>
                          ))}
                        </ul>
                        
                        <form onSubmit={handleUploadFile} className="border-t pt-4">
                          <h3 className="font-medium mb-2">رفع ملف جديد</h3>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="file"
                              className="flex-1 border rounded-md p-2 text-sm"
                              required
                            />
                            <Button type="submit">
                              رفع
                            </Button>
                          </div>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* معلومات العميل */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات العميل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={project.clientImage} alt={project.client} />
                      <AvatarFallback>{project.client.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mt-3">{project.client}</h3>
                    <div className="flex mt-4 gap-4">
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageSquare className="h-4 w-4 ml-1" />
                        مراسلة
                      </Button>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="w-full space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">تاريخ التعاقد</p>
                        <p className="font-medium">{project.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">عدد المشاريع المشتركة</p>
                        <p className="font-medium">3 مشاريع</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default FreelancerProjects;
