
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

interface BooksSectionProps {
  booksContent: {
    title: string;
    subtitle: string;
    count: number;
    showNewest: boolean;
  };
  setBooksContent: React.Dispatch<React.SetStateAction<{
    title: string;
    subtitle: string;
    count: number;
    showNewest: boolean;
  }>>;
}

const BooksSection: React.FC<BooksSectionProps> = ({ booksContent, setBooksContent }) => {
  const { toast } = useToast();
  
  const handleSaveBooks = () => {
    // هنا سيتم حفظ البيانات في قاعدة البيانات
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم الكتب بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تعديل قسم الكتب</CardTitle>
        <CardDescription>
          تخصيص محتوى قسم الكتب في الصفحة الرئيسية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">العنوان الرئيسي</label>
          <Input 
            value={booksContent.title}
            onChange={(e) => setBooksContent({...booksContent, title: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">النص التوضيحي</label>
          <Textarea 
            value={booksContent.subtitle}
            onChange={(e) => setBooksContent({...booksContent, subtitle: e.target.value})}
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">عدد الكتب المعروضة</label>
          <Input 
            type="number" 
            value={booksContent.count} 
            onChange={(e) => setBooksContent({...booksContent, count: Number(e.target.value)})}
            min="1" 
            max="8" 
          />
          <p className="text-xs text-muted-foreground">
            عدد الكتب التي سيتم عرضها في الصفحة الرئيسية
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">عرض أحدث الكتب</label>
            <p className="text-xs text-muted-foreground">
              عرض الكتب حسب تاريخ الإضافة
            </p>
          </div>
          <Switch 
            checked={booksContent.showNewest}
            onCheckedChange={(checked) => setBooksContent({...booksContent, showNewest: checked})}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveBooks}>
          <Save className="h-4 w-4 ml-2" />
          حفظ التغييرات
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BooksSection;
