
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, Users, Globe, Bell, Shield, FileText, Home, Info } from 'lucide-react';

const AdminSettings = () => {
  const settingsGroups = [
    {
      title: "إعدادات المستخدمين",
      description: "إدارة إعدادات المستخدمين والأذونات والأدوار",
      items: [
        {
          title: "الأدوار والصلاحيات",
          icon: Shield,
          description: "تعديل صلاحيات المستخدمين والأدوار",
          path: "#"
        },
        {
          title: "التسجيل والمصادقة",
          icon: Users,
          description: "إعدادات تسجيل المستخدمين الجدد وطرق المصادقة",
          path: "#"
        },
      ]
    },
    {
      title: "إعدادات النظام",
      description: "إعدادات عامة للنظام والتكامل مع الخدمات الأخرى",
      items: [
        {
          title: "الإشعارات",
          icon: Bell,
          description: "تكوين إعدادات الإشعارات البريدية وإشعارات النظام",
          path: "#"
        },
        {
          title: "إعدادات عامة",
          icon: SettingsIcon,
          description: "الإعدادات العامة للنظام واللغة والعملة",
          path: "#"
        },
        {
          title: "إعدادات النطاق",
          icon: Globe,
          description: "تكوين اسم النطاق والـ SEO ووسائل التواصل الاجتماعي",
          path: "#"
        }
      ]
    },
    {
      title: "إدارة المحتوى",
      description: "إدارة محتوى الموقع وتخصيصه",
      items: [
        {
          title: "الصفحة الرئيسية",
          icon: Home,
          description: "تعديل محتوى الصفحة الرئيسية",
          path: "/dashboard/admin/content/home"
        },
        {
          title: "صفحة من نحن",
          icon: Info,
          description: "تعديل محتوى صفحة من نحن",
          path: "/dashboard/admin/content/about"
        },
        {
          title: "صفحات أخرى",
          icon: FileText,
          description: "تعديل محتوى الصفحات الأخرى",
          path: "#"
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>إعدادات النظام | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="إعدادات النظام">
        <div className="space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="text-xl font-bold mb-4">{group.title}</h2>
              <p className="text-muted-foreground mb-4">{group.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-md mr-2">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        {item.title}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to={item.path}>
                          الذهاب للإعدادات
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminSettings;
