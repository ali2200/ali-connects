
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CTASectionProps {
  ctaContent: {
    title: string;
    subtitle: string;
    freelancerButtonText: string;
    clientButtonText: string;
    imageUrl: string;
  };
  setCtaContent: React.Dispatch<React.SetStateAction<{
    title: string;
    subtitle: string;
    freelancerButtonText: string;
    clientButtonText: string;
    imageUrl: string;
  }>>;
}

const CTASection: React.FC<CTASectionProps> = ({ ctaContent, setCtaContent }) => {
  const { toast } = useToast();
  
  const handleSaveCta = () => {
    // هنا سيتم حفظ البيانات في قاعدة البيانات
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم دعوة للإنضمام بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تعديل قسم دعوة للإنضمام</CardTitle>
        <CardDescription>
          تخصيص محتوى قسم دعوة للإنضمام في الصفحة الرئيسية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">العنوان الرئيسي</label>
          <Input 
            value={ctaContent.title}
            onChange={(e) => setCtaContent({...ctaContent, title: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">النص التوضيحي</label>
          <Textarea 
            value={ctaContent.subtitle}
            onChange={(e) => setCtaContent({...ctaContent, subtitle: e.target.value})}
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">نص زر المستقلين</label>
          <Input 
            value={ctaContent.freelancerButtonText}
            onChange={(e) => setCtaContent({...ctaContent, freelancerButtonText: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">نص زر أصحاب الأعمال</label>
          <Input 
            value={ctaContent.clientButtonText}
            onChange={(e) => setCtaContent({...ctaContent, clientButtonText: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">صورة الخلفية</label>
          <div className="flex items-center gap-2">
            <div className="h-24 w-40 bg-gray-100 rounded overflow-hidden">
              <img 
                src={ctaContent.imageUrl} 
                alt="صورة الخلفية" 
                className="w-full h-full object-cover"
              />
            </div>
            <Button variant="outline" size="sm">
              <ImageIcon className="h-4 w-4 ml-2" />
              تغيير الصورة
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveCta}>
          <Save className="h-4 w-4 ml-2" />
          حفظ التغييرات
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CTASection;
