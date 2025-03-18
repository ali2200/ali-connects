
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AboutPageContent = () => {
  const { toast } = useToast();
  
  const [aboutContent, setAboutContent] = useState({
    title: 'عن منصة علي للأعمال',
    vision: 'نسعى لأن نكون المنصة الرائدة للعمل الحر في المملكة العربية السعودية والوطن العربي، من خلال تقديم بيئة عمل متكاملة تجمع بين أصحاب المشاريع والمستقلين المحترفين في جميع المجالات.',
    mission: 'تمكين المواهب العربية من تحقيق النجاح المهني والمالي من خلال توفير فرص عمل حقيقية ودعم متكامل يشمل التدريب والتطوير المستمر، مع ضمان أفضل جودة للخدمات المقدمة لأصحاب المشاريع.',
    story: 'انطلقت منصة "علي للأعمال" في عام 2023 لتلبية احتياجات سوق العمل الحر المتنامي في المملكة العربية السعودية والوطن العربي. بدأنا بفكرة بسيطة: إنشاء بيئة عمل متكاملة تجمع بين المواهب العربية وأصحاب المشاريع، وتوفر لهم جميع الأدوات اللازمة للنجاح.',
    storyPart2: 'اليوم، أصبحت منصة "علي للأعمال" وجهة رئيسية للعمل الحر، حيث تضم آلاف المستقلين المحترفين وأصحاب المشاريع. نفخر بأننا ساهمنا في توفير فرص عمل حقيقية للمواهب العربية، وساعدنا العديد من الشركات والمؤسسات في إنجاز مشاريعهم بأعلى جودة وأقل تكلفة.',
    team: 'يضم فريق "علي للأعمال" نخبة من الخبراء والمتخصصين في مجالات التقنية والتسويق وخدمة العملاء، يعملون بشغف لتطوير المنصة وتقديم أفضل تجربة للمستخدمين.',
    values: [
      { id: 1, title: 'الجودة', description: 'نضمن أعلى معايير الجودة في جميع الخدمات المقدمة على منصتنا.' },
      { id: 2, title: 'الثقة', description: 'نبني علاقات طويلة المدى مبنية على الثقة المتبادلة بين جميع أطراف العمل.' },
      { id: 3, title: 'الشفافية', description: 'نلتزم بالشفافية الكاملة في جميع التعاملات والرسوم على المنصة.' },
      { id: 4, title: 'الدعم المستمر', description: 'نقدم الدعم المستمر لضمان نجاح المستقلين وأصحاب المشاريع.' },
      { id: 5, title: 'التطوير', description: 'نؤمن بأهمية التطوير المستمر للمهارات والخدمات.' },
    ]
  });
  
  const handleSaveContent = () => {
    // هنا سيتم حفظ البيانات في قاعدة البيانات
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات صفحة من نحن بنجاح",
    });
  };
  
  const addValue = () => {
    const newValue = {
      id: Date.now(),
      title: 'قيمة جديدة',
      description: 'وصف القيمة الجديدة'
    };
    setAboutContent({
      ...aboutContent,
      values: [...aboutContent.values, newValue]
    });
  };
  
  const removeValue = (id) => {
    setAboutContent({
      ...aboutContent,
      values: aboutContent.values.filter(value => value.id !== id)
    });
  };
  
  return (
    <>
      <Helmet>
        <title>إدارة محتوى صفحة من نحن | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="إدارة محتوى صفحة من نحن">
        <div className="mb-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للإعدادات
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>تعديل محتوى صفحة من نحن</CardTitle>
            <CardDescription>
              تخصيص محتوى صفحة من نحن
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان الصفحة</label>
              <Input 
                value={aboutContent.title}
                onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">رؤيتنا</label>
              <Textarea 
                value={aboutContent.vision}
                onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">مهمتنا</label>
              <Textarea 
                value={aboutContent.mission}
                onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">قصتنا (الجزء الأول)</label>
              <Textarea 
                value={aboutContent.story}
                onChange={(e) => setAboutContent({...aboutContent, story: e.target.value})}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">قصتنا (الجزء الثاني)</label>
              <Textarea 
                value={aboutContent.storyPart2}
                onChange={(e) => setAboutContent({...aboutContent, storyPart2: e.target.value})}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">فريق العمل</label>
              <Textarea 
                value={aboutContent.team}
                onChange={(e) => setAboutContent({...aboutContent, team: e.target.value})}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">قيمنا</label>
                <Button variant="outline" size="sm" onClick={addValue}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة قيمة
                </Button>
              </div>
              
              {aboutContent.values.map((value, index) => (
                <Card key={value.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">قيمة {index + 1}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => removeValue(value.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs">العنوان</label>
                      <Input 
                        value={value.title}
                        onChange={(e) => {
                          const newValues = [...aboutContent.values];
                          newValues[index].title = e.target.value;
                          setAboutContent({...aboutContent, values: newValues});
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs">الوصف</label>
                      <Textarea 
                        value={value.description}
                        onChange={(e) => {
                          const newValues = [...aboutContent.values];
                          newValues[index].description = e.target.value;
                          setAboutContent({...aboutContent, values: newValues});
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveContent}>
              <Save className="h-4 w-4 ml-2" />
              حفظ التغييرات
            </Button>
          </CardFooter>
        </Card>
      </DashboardLayout>
    </>
  );
};

export default AboutPageContent;
