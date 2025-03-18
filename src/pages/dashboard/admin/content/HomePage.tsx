
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const HomePageContent = () => {
  const { toast } = useToast();
  const [heroContent, setHeroContent] = useState({
    title: 'منصة علي للأعمال الحرة والتعليم عن بعد',
    subtitle: 'منصة متكاملة تجمع المستقلين وأصحاب الأعمال والمحاضرين في مكان واحد',
    ctaText: 'انضم إلينا الآن',
    imageUrl: '/hero-image.jpg'
  });
  
  const [featuresContent, setFeaturesContent] = useState({
    mainTitle: 'المميزات الرئيسية',
    features: [
      {
        id: 1,
        title: 'العمل الحر',
        description: 'ابحث عن أفضل المستقلين أو قدم خدماتك واكسب المال',
        icon: 'briefcase'
      },
      {
        id: 2,
        title: 'التعليم عن بعد',
        description: 'دورات تعليمية متنوعة لتطوير مهاراتك وآفاقك المهنية',
        icon: 'book'
      },
      {
        id: 3,
        title: 'سوق الخدمات',
        description: 'تصفح آلاف الخدمات من المستقلين المحترفين',
        icon: 'shopping-bag'
      }
    ]
  });
  
  const handleSaveHero = () => {
    // هنا سيتم حفظ البيانات في قاعدة البيانات
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم الترحيب بنجاح",
    });
  };
  
  const handleSaveFeatures = () => {
    // هنا سيتم حفظ البيانات في قاعدة البيانات
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم المميزات بنجاح",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>إدارة محتوى الصفحة الرئيسية | منصة علي</title>
      </Helmet>
      
      <DashboardLayout type="admin" title="إدارة محتوى الصفحة الرئيسية">
        <div className="mb-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للإعدادات
          </Button>
        </div>
        
        <div className="space-y-6">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="mb-6 w-full max-w-xl mx-auto grid grid-cols-1 md:grid-cols-4 h-auto">
              <TabsTrigger value="hero" className="py-2">
                قسم الترحيب
              </TabsTrigger>
              <TabsTrigger value="features" className="py-2">
                المميزات
              </TabsTrigger>
              <TabsTrigger value="courses" className="py-2">
                الدورات
              </TabsTrigger>
              <TabsTrigger value="cta" className="py-2">
                دعوة للإنضمام
              </TabsTrigger>
            </TabsList>
            
            {/* قسم الترحيب */}
            <TabsContent value="hero">
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
            </TabsContent>
            
            {/* قسم المميزات */}
            <TabsContent value="features">
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
                    <label className="text-sm font-medium">المميزات</label>
                    
                    {featuresContent.features.map((feature, index) => (
                      <Card key={feature.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">ميزة {index + 1}</h4>
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
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
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
                      }}
                    >
                      إضافة ميزة جديدة
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveFeatures}>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* قسم الدورات */}
            <TabsContent value="courses">
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
                    <Input defaultValue="أحدث الدورات التعليمية" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">النص التوضيحي</label>
                    <Textarea 
                      defaultValue="استكشف أحدث الدورات التعليمية في مختلف المجالات"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">عدد الدورات المعروضة</label>
                    <Input type="number" defaultValue="3" min="1" max="6" />
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
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* قسم دعوة للإنضمام */}
            <TabsContent value="cta">
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
                    <Input defaultValue="انضم إلى مجتمع منصة علي اليوم" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">النص التوضيحي</label>
                    <Textarea 
                      defaultValue="سجل الآن واستفد من جميع الخدمات والمميزات التي تقدمها منصة علي"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نص زر المستقلين</label>
                    <Input defaultValue="انضم كمستقل" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نص زر أصحاب الأعمال</label>
                    <Input defaultValue="انضم كصاحب عمل" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">صورة الخلفية</label>
                    <div className="flex items-center gap-2">
                      <div className="h-24 w-40 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src="/placeholder.svg" 
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
                  <Button>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default HomePageContent;
