
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface HeroSectionProps {
  heroContent: {
    title: string;
    subtitle: string;
    ctaText: string;
    imageUrl: string;
  };
  setHeroContent: React.Dispatch<React.SetStateAction<{
    title: string;
    subtitle: string;
    ctaText: string;
    imageUrl: string;
  }>>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroContent, setHeroContent }) => {
  const { toast } = useToast();
  
  const handleSaveHero = () => {
    // هنا سيتم حفظ البيانات في قاعدة البيانات
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم الترحيب بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تعديل قسم الترحيب</CardTitle>
        <CardDescription>
          تخصيص محتوى قسم الترحيب في الصفحة الرئيسية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">العنوان الرئيسي</label>
          <Input 
            value={heroContent.title} 
            onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">النص التوضيحي</label>
          <Textarea 
            value={heroContent.subtitle}
            onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">نص زر الدعوة للعمل</label>
          <Input 
            value={heroContent.ctaText}
            onChange={(e) => setHeroContent({...heroContent, ctaText: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">صورة الخلفية</label>
          <div className="flex items-center gap-2">
            <div className="h-24 w-40 bg-gray-100 rounded overflow-hidden">
              {heroContent.imageUrl && (
                <img 
                  src={heroContent.imageUrl} 
                  alt="صورة الخلفية" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <Button variant="outline" size="sm">
              <ImageIcon className="h-4 w-4 ml-2" />
              تغيير الصورة
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveHero}>
          <Save className="h-4 w-4 ml-2" />
          حفظ التغييرات
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HeroSection;
