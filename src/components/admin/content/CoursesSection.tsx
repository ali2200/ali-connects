
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

interface CoursesSectionProps {
  coursesContent: {
    title: string;
    subtitle: string;
    count: number;
    showPopular: boolean;
  };
  setCoursesContent: React.Dispatch<React.SetStateAction<{
    title: string;
    subtitle: string;
    count: number;
    showPopular: boolean;
  }>>;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ coursesContent, setCoursesContent }) => {
  const { toast } = useToast();
  
  const handleSaveCourses = () => {
    // هنا سيتم حفظ البيانات في قاعدة البيانات
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم الدورات بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تعديل قسم الدورات</CardTitle>
        <CardDescription>
          تخصيص محتوى قسم الدورات في الصفحة الرئيسية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">العنوان الرئيسي</label>
          <Input 
            value={coursesContent.title}
            onChange={(e) => setCoursesContent({...coursesContent, title: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">النص التوضيحي</label>
          <Textarea 
            value={coursesContent.subtitle}
            onChange={(e) => setCoursesContent({...coursesContent, subtitle: e.target.value})}
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">عدد الدورات المعروضة</label>
          <Input 
            type="number" 
            value={coursesContent.count} 
            onChange={(e) => setCoursesContent({...coursesContent, count: Number(e.target.value)})}
            min="1" 
            max="6" 
          />
          <p className="text-xs text-muted-foreground">
            عدد الدورات التي سيتم عرضها في الصفحة الرئيسية
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">عرض الدورات الأكثر شعبية</label>
            <p className="text-xs text-muted-foreground">
              اختر الدورات حسب عدد المشتركين
            </p>
          </div>
          <Switch 
            checked={coursesContent.showPopular}
            onCheckedChange={(checked) => setCoursesContent({...coursesContent, showPopular: checked})}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveCourses}>
          <Save className="h-4 w-4 ml-2" />
          حفظ التغييرات
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoursesSection;
