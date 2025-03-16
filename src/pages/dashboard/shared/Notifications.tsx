
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Calendar, MessageSquare, Briefcase, DollarSign, Trash2 } from 'lucide-react';

const Notifications = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  
  return (
    <>
      <Helmet>
        <title>الإشعارات</title>
      </Helmet>
      
      <DashboardLayout type="freelancer" title="الإشعارات">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold">الإشعارات</h1>
            <Button variant="outline">
              <Check className="ml-1 h-4 w-4" />
              تعليم الكل كمقروءة
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="unread">غير مقروءة</TabsTrigger>
              <TabsTrigger value="read">مقروءة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>جميع الإشعارات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { 
                      id: 1, 
                      title: 'تم قبول عرضك',
                      message: 'تم قبول عرضك على مشروع "تصميم موقع إلكتروني"',
                      time: '10:30 صباحًا',
                      date: '2023-12-10',
                      type: 'project',
                      isRead: false
                    },
                    { 
                      id: 2, 
                      title: 'رسالة جديدة',
                      message: 'لديك رسالة جديدة من أحمد محمد بخصوص المشروع',
                      time: '09:15 صباحًا',
                      date: '2023-12-10',
                      type: 'message',
                      isRead: false
                    },
                    { 
                      id: 3, 
                      title: 'تم إضافة تعليق',
                      message: 'قام محمد أحمد بإضافة تعليق على التسليم الأخير',
                      time: '03:45 مساءً',
                      date: '2023-12-09',
                      type: 'comment',
                      isRead: false
                    },
                    { 
                      id: 4, 
                      title: 'تم استلام دفعة',
                      message: 'تم إضافة مبلغ 1500 ريال إلى رصيدك مقابل مشروع "تصميم شعار"',
                      time: '11:20 صباحًا',
                      date: '2023-12-08',
                      type: 'payment',
                      isRead: true
                    },
                    { 
                      id: 5, 
                      title: 'تحديث في المشروع',
                      message: 'تم تحديث متطلبات المشروع، يرجى الاطلاع عليها',
                      time: '02:10 مساءً',
                      date: '2023-12-07',
                      type: 'project',
                      isRead: true
                    }
                  ].map(notification => (
                    <div key={notification.id} className={`border rounded-lg p-4 ${!notification.isRead ? 'bg-blue-50' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                            notification.type === 'project' ? 'bg-blue-100 text-blue-600' :
                            notification.type === 'message' ? 'bg-green-100 text-green-600' :
                            notification.type === 'comment' ? 'bg-purple-100 text-purple-600' :
                            'bg-amber-100 text-amber-600'
                          }`}>
                            {notification.type === 'project' && <Briefcase className="h-5 w-5" />}
                            {notification.type === 'message' && <MessageSquare className="h-5 w-5" />}
                            {notification.type === 'comment' && <MessageSquare className="h-5 w-5" />}
                            {notification.type === 'payment' && <DollarSign className="h-5 w-5" />}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold">{notification.title}</h3>
                              {!notification.isRead && (
                                <Badge className="mr-2 bg-blue-500" variant="default">
                                  جديد
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center text-gray-500 text-sm mt-2">
                              <Calendar className="h-3.5 w-3.5 ml-1" />
                              <span>
                                {new Date(notification.date).toLocaleDateString('ar-SA')} - {notification.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </Button>
                          {!notification.isRead && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="unread" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>الإشعارات غير المقروءة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { 
                      id: 1, 
                      title: 'تم قبول عرضك',
                      message: 'تم قبول عرضك على مشروع "تصميم موقع إلكتروني"',
                      time: '10:30 صباحًا',
                      date: '2023-12-10',
                      type: 'project',
                      isRead: false
                    },
                    { 
                      id: 2, 
                      title: 'رسالة جديدة',
                      message: 'لديك رسالة جديدة من أحمد محمد بخصوص المشروع',
                      time: '09:15 صباحًا',
                      date: '2023-12-10',
                      type: 'message',
                      isRead: false
                    },
                    { 
                      id: 3, 
                      title: 'تم إضافة تعليق',
                      message: 'قام محمد أحمد بإضافة تعليق على التسليم الأخير',
                      time: '03:45 مساءً',
                      date: '2023-12-09',
                      type: 'comment',
                      isRead: false
                    }
                  ].map(notification => (
                    <div key={notification.id} className="border rounded-lg p-4 bg-blue-50">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                            notification.type === 'project' ? 'bg-blue-100 text-blue-600' :
                            notification.type === 'message' ? 'bg-green-100 text-green-600' :
                            notification.type === 'comment' ? 'bg-purple-100 text-purple-600' :
                            'bg-amber-100 text-amber-600'
                          }`}>
                            {notification.type === 'project' && <Briefcase className="h-5 w-5" />}
                            {notification.type === 'message' && <MessageSquare className="h-5 w-5" />}
                            {notification.type === 'comment' && <MessageSquare className="h-5 w-5" />}
                            {notification.type === 'payment' && <DollarSign className="h-5 w-5" />}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold">{notification.title}</h3>
                              <Badge className="mr-2 bg-blue-500" variant="default">
                                جديد
                              </Badge>
                            </div>
                            <p className="text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center text-gray-500 text-sm mt-2">
                              <Calendar className="h-3.5 w-3.5 ml-1" />
                              <span>
                                {new Date(notification.date).toLocaleDateString('ar-SA')} - {notification.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="read" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>الإشعارات المقروءة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { 
                      id: 4, 
                      title: 'تم استلام دفعة',
                      message: 'تم إضافة مبلغ 1500 ريال إلى رصيدك مقابل مشروع "تصميم شعار"',
                      time: '11:20 صباحًا',
                      date: '2023-12-08',
                      type: 'payment',
                      isRead: true
                    },
                    { 
                      id: 5, 
                      title: 'تحديث في المشروع',
                      message: 'تم تحديث متطلبات المشروع، يرجى الاطلاع عليها',
                      time: '02:10 مساءً',
                      date: '2023-12-07',
                      type: 'project',
                      isRead: true
                    }
                  ].map(notification => (
                    <div key={notification.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                            notification.type === 'project' ? 'bg-blue-100 text-blue-600' :
                            notification.type === 'message' ? 'bg-green-100 text-green-600' :
                            notification.type === 'comment' ? 'bg-purple-100 text-purple-600' :
                            'bg-amber-100 text-amber-600'
                          }`}>
                            {notification.type === 'project' && <Briefcase className="h-5 w-5" />}
                            {notification.type === 'message' && <MessageSquare className="h-5 w-5" />}
                            {notification.type === 'comment' && <MessageSquare className="h-5 w-5" />}
                            {notification.type === 'payment' && <DollarSign className="h-5 w-5" />}
                          </div>
                          <div>
                            <h3 className="font-semibold">{notification.title}</h3>
                            <p className="text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center text-gray-500 text-sm mt-2">
                              <Calendar className="h-3.5 w-3.5 ml-1" />
                              <span>
                                {new Date(notification.date).toLocaleDateString('ar-SA')} - {notification.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
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
