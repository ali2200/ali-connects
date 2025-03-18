
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { arSA } from 'date-fns/locale';

import {
  Bell,
  MessageSquare,
  DollarSign,
  AlertCircle,
  Check,
  MoreHorizontal,
  Filter
} from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'message',
    title: 'رسالة جديدة من أحمد محمد',
    message: 'مرحباً، أود الاستفسار عن تفاصيل المشروع...',
    date: new Date(2023, 5, 15, 9, 30),
    read: false,
    user: {
      name: 'أحمد محمد',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  },
  {
    id: 2,
    type: 'payment',
    title: 'تم إتمام عملية الدفع',
    message: 'تم إيداع مبلغ 1500 ر.س في رصيدك',
    date: new Date(2023, 5, 14, 14, 15),
    read: false,
    amount: 1500
  },
  {
    id: 3,
    type: 'system',
    title: 'تحديث في سياسة الخصوصية',
    message: 'تم تحديث سياسة الخصوصية الخاصة بالمنصة، يرجى الاطلاع عليها.',
    date: new Date(2023, 5, 10, 11, 0),
    read: true
  },
  {
    id: 4,
    type: 'message',
    title: 'رسالة جديدة من سارة أحمد',
    message: 'تم إرسال الملفات المطلوبة، يرجى مراجعتها...',
    date: new Date(2023, 5, 9, 16, 45),
    read: true,
    user: {
      name: 'سارة أحمد',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  },
  {
    id: 5,
    type: 'system',
    title: 'دورة جديدة متاحة',
    message: 'تم إضافة دورة جديدة "التسويق الرقمي للمبتدئين" قد تهمك.',
    date: new Date(2023, 5, 7, 9, 15),
    read: true
  },
  {
    id: 6,
    type: 'payment',
    title: 'تم شراء الخدمة',
    message: 'تم شراء خدمة "تصميم هوية بصرية" من قبل عميل جديد.',
    date: new Date(2023, 5, 5, 13, 30),
    read: true,
    amount: 750
  }
];

const Notifications = () => {
  const [activeTab, setActiveTab] = React.useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'system':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: arSA });
  };

  const markAllAsRead = () => {
    // هنا سيتم إضافة منطق لتحديث حالة الإشعارات في قاعدة البيانات
    console.log('Mark all as read');
  };

  return (
    <>
      <Helmet>
        <title>الإشعارات | منصة علّي</title>
      </Helmet>
      
      <DashboardLayout type="shared" title="الإشعارات">
        <div className="grid gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">الإشعارات</h1>
              <p className="text-gray-500">متابعة آخر التحديثات والأنشطة</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                تصفية
              </Button>
              
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead} className="gap-2">
                  <Check className="h-4 w-4" />
                  تحديد الكل كمقروء
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                الكل
                {unreadCount > 0 && (
                  <Badge className="mr-2 bg-primary">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">غير مقروءة</TabsTrigger>
              <TabsTrigger value="message">الرسائل</TabsTrigger>
              <TabsTrigger value="payment">المدفوعات</TabsTrigger>
              <TabsTrigger value="system">إشعارات النظام</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activeTab === 'all' && 'جميع الإشعارات'}
                    {activeTab === 'unread' && 'الإشعارات غير المقروءة'}
                    {activeTab === 'message' && 'إشعارات الرسائل'}
                    {activeTab === 'payment' && 'إشعارات المدفوعات'}
                    {activeTab === 'system' && 'إشعارات النظام'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">لا توجد إشعارات</h3>
                      <p className="text-gray-500">
                        ستظهر هنا جميع إشعاراتك وتحديثات المنصة.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredNotifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`py-4 first:pt-0 last:pb-0 flex items-start gap-4 ${!notification.read ? 'bg-blue-50/50 -mx-6 px-6' : ''}`}
                        >
                          <div className="flex-shrink-0 mt-1 rounded-full p-2 bg-gray-100">
                            {getNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className={`font-medium ${!notification.read ? 'font-bold' : ''}`}>
                                {notification.title}
                                {!notification.read && (
                                  <Badge className="mr-2 bg-blue-500 h-2 w-2 p-0 rounded-full" />
                                )}
                              </h3>
                              <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                            </div>
                            
                            <p className="text-gray-600 mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            
                            {notification.type === 'message' && notification.user && (
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 ml-2">
                                  <AvatarImage src={notification.user.avatar} />
                                  <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-gray-500">{notification.user.name}</span>
                              </div>
                            )}
                            
                            {notification.type === 'payment' && notification.amount && (
                              <div className="text-sm text-green-600 font-semibold">
                                {notification.amount} ر.س
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-shrink-0">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Notifications;
