
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const ClientNewProject = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إنشاء المشروع",
      description: "تم إنشاء المشروع بنجاح وسيتم نشره قريبًا",
    });
  };

  return (
    <>
      <Helmet>
        <title>مشروع جديد | لوحة تحكم صاحب الأعمال</title>
      </Helmet>
      
      <DashboardLayout type="client" title="مشروع جديد">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">إضافة مشروع جديد</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل المشروع</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">عنوان المشروع</label>
                    <Input id="title" placeholder="أدخل عنوان المشروع" required />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">تصنيف المشروع</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر تصنيف المشروع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-dev">تطوير مواقع</SelectItem>
                        <SelectItem value="app-dev">تطوير تطبيقات</SelectItem>
                        <SelectItem value="ui-design">تصميم واجهات</SelectItem>
                        <SelectItem value="graphics">تصميم جرافيك</SelectItem>
                        <SelectItem value="marketing">تسويق رقمي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">وصف المشروع</label>
                    <Textarea 
                      id="description" 
                      placeholder="اكتب وصفاً تفصيلياً للمشروع ومتطلباته" 
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-1">الميزانية (ريال)</label>
                      <Input id="budget" type="number" placeholder="أدخل الميزانية" min="0" required />
                    </div>
                    
                    <div>
                      <label htmlFor="deadline" className="block text-sm font-medium mb-1">الموعد النهائي</label>
                      <Input id="deadline" type="date" required />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium mb-1">المهارات المطلوبة</label>
                    <Input id="skills" placeholder="أدخل المهارات مفصولة بفواصل" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">نشر المشروع</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ClientNewProject;
