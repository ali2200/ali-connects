
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface FeaturesSectionProps {
  featuresContent: {
    mainTitle: string;
    features: Feature[];
  };
  setFeaturesContent: React.Dispatch<React.SetStateAction<{
    mainTitle: string;
    features: Feature[];
  }>>;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ featuresContent, setFeaturesContent }) => {
  const { toast } = useToast();
  
  const handleSaveFeatures = () => {
    // هنا سيتم حفظ البيانات في قاعدة البيانات
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم المميزات بنجاح",
    });
  };
  
  const handleAddFeature = () => {
    const newFeature = {
      id: Date.now(),
      title: 'ميزة جديدة',
      description: 'وصف الميزة الجديدة',
      icon: 'users'
    };
    setFeaturesContent({
      ...featuresContent, 
      features: [...featuresContent.features, newFeature]
    });
  };
  
  const handleRemoveFeature = (id: number) => {
    setFeaturesContent({
      ...featuresContent,
      features: featuresContent.features.filter(feature => feature.id !== id)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تعديل قسم المميزات</CardTitle>
        <CardDescription>
          تخصيص محتوى قسم المميزات في الصفحة الرئيسية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">العنوان الرئيسي</label>
          <Input 
            value={featuresContent.mainTitle}
            onChange={(e) => setFeaturesContent({...featuresContent, mainTitle: e.target.value})}
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">المميزات</label>
            <Button 
              variant="outline" 
              onClick={handleAddFeature}
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة ميزة جديدة
            </Button>
          </div>
          
          {featuresContent.features.map((feature, index) => (
            <Card key={feature.id} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">ميزة {index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500"
                    onClick={() => handleRemoveFeature(feature.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs">العنوان</label>
                  <Input 
                    value={feature.title}
                    onChange={(e) => {
                      const newFeatures = [...featuresContent.features];
                      newFeatures[index].title = e.target.value;
                      setFeaturesContent({...featuresContent, features: newFeatures});
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs">الوصف</label>
                  <Textarea 
                    value={feature.description}
                    onChange={(e) => {
                      const newFeatures = [...featuresContent.features];
                      newFeatures[index].description = e.target.value;
                      setFeaturesContent({...featuresContent, features: newFeatures});
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs">الأيقونة</label>
                  <select 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={feature.icon}
                    onChange={(e) => {
                      const newFeatures = [...featuresContent.features];
                      newFeatures[index].icon = e.target.value;
                      setFeaturesContent({...featuresContent, features: newFeatures});
                    }}
                  >
                    <option value="briefcase">حقيبة عمل</option>
                    <option value="book">كتاب</option>
                    <option value="shopping-bag">حقيبة تسوق</option>
                    <option value="users">مستخدمين</option>
                    <option value="globe">عالمي</option>
                    <option value="code">برمجة</option>
                  </select>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveFeatures}>
          <Save className="h-4 w-4 ml-2" />
          حفظ التغييرات
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturesSection;
