
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Bell, Check, Clock, Megaphone, MessageSquare, Settings, Trash2 } from 'lucide-react';

const Notifications = () => {
  const { toast } = useToast();
  
  const handleMarkAllAsRead = () => {
    toast({
      title: "تم تحديث الإشعارات",
      description: "تم تحديد جميع الإشعارات كمقروءة",
    });
  };
  
  const handleDeleteAll = () => {
    toast({
      title: "تم حذف الإشعارات",
      description: "تم حذف جميع الإشعارات",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>الإشعارات | لوحة التحكم</title>
      </Helmet>
      
      <DashboardLayout type="freelancer" title="الإشعارات">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">الإشعارات</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleMarkAllAsRead}>
                <Check className="ml-1 h-4 w-4" />
                تحديد الكل كمقروء
              </Button>
              <Button variant="outline" onClick={handleDeleteAll}>
                <Trash2 className="ml-1 h-4 w-4" />
                حذف الكل
              </Button>
              <Button variant="outline">
                <Settings className="ml-1 h-4 w-4" />
                إعدادات الإشعارات
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 mb-4 max-w-md">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="unread">غير مقروءة</TabsTrigger>
              <TabsTrigger value="read">مقروءة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <NotificationsList 
                notifications={[
                  { id: '1', type: 'message', title: 'رسالة جديدة', content: 'لديك رسالة جديدة من أحمد محمد', time: '15 دقيقة', isRead: false, user: { name: 'أحمد محمد', image: 'https://i.pravatar.cc/150?img=10' } },
                  { id: '2', type: 'project', title: 'عرض جديد', content: 'تم تقديم عرض جديد على مشروعك "تصميم موقع ويب"', time: '45 دقيقة', isRead: false },
                  { id: '3', type: 'system', title: 'تحديث النظام', content: 'تم تحديث النظام إلى الإصدار الجديد', time: '3 ساعات', isRead: true },
                  { id: '4', type: 'message', title: 'رسالة جديدة', content: 'لديك رسالة جديدة من سارة أحمد', time: '5 ساعات', isRead: true, user: { name: 'سارة أحمد', image: 'https://i.pravatar.cc/150?img=5' } },
                  { id: '5', type: 'payment', title: 'دفعة جديدة', content: 'تم استلام دفعة بقيمة 2500 ريال', time: '1 يوم', isRead: true }
                ]}
              />
            </TabsContent>
            
            <TabsContent value="unread" className="space-y-4">
              <NotificationsList 
                notifications={[
                  { id: '1', type: 'message', title: 'رسالة جديدة', content: 'لديك رسالة جديدة من أحمد محمد', time: '15 دقيقة', isRead: false, user: { name: 'أحمد محمد', image: 'https://i.pravatar.cc/150?img=10' } },
                  { id: '2', type: 'project', title: 'عرض جديد', content: 'تم تقديم عرض جديد على مشروعك "تصميم موقع ويب"', time: '45 دقيقة', isRead: false }
                ]}
              />
            </TabsContent>
            
            <TabsContent value="read" className="space-y-4">
              <NotificationsList 
                notifications={[
                  { id: '3', type: 'system', title: 'تحديث النظام', content: 'تم تحديث النظام إلى الإصدار الجديد', time: '3 ساعات', isRead: true },
                  { id: '4', type: 'message', title: 'رسالة جديدة', content: 'لديك رسالة جديدة من سارة أحمد', time: '5 ساعات', isRead: true, user: { name: 'سارة أحمد', image: 'https://i.pravatar.cc/150?img=5' } },
                  { id: '5', type: 'payment', title: 'دفعة جديدة', content: 'تم استلام دفعة بقيمة 2500 ريال', time: '1 يوم', isRead: true }
                ]}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

// مكون قائمة الإشعارات
interface User {
  name: string;
  image: string;
}

interface Notification {
  id: string;
  type: 'message' | 'project' | 'system' | 'payment';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  user?: User;
}

const NotificationsList = ({ notifications }: { notifications: Notification[] }) => {
  const { toast } = useToast();
  
  const handleMarkAsRead = (id: string) => {
    toast({
      title: "تم تحديث الإشعار",
      description: "تم تحديد الإشعار كمقروء",
    });
  };
  
  const handleDelete = (id: string) => {
    toast({
      title: "تم حذف الإشعار",
      description: "تم حذف الإشعار بنجاح",
    });
  };
  
  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">لا توجد إشعارات في هذه الفئة</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {notifications.map(notification => (
        <Card key={notification.id} className={`overflow-hidden ${!notification.isRead ? 'border-blue-200 bg-blue-50/30' : ''}`}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="mt-1">
                {notification.user ? (
                  <Avatar>
                    <AvatarImage src={notification.user.image} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                    {notification.type === 'message' ? (
                      <MessageSquare className="h-5 w-5" />
                    ) : notification.type === 'project' ? (
                      <Clock className="h-5 w-5" />
                    ) : notification.type === 'system' ? (
                      <Bell className="h-5 w-5" />
                    ) : (
                      <Megaphone className="h-5 w-5" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-gray-700 mt-1">{notification.content}</p>
                  </div>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                {!notification.isRead && (
                  <div className="flex justify-end mt-3 gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                      <Check className="ml-1 h-4 w-4" />
                      تحديد كمقروء
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(notification.id)}>
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Notifications;
