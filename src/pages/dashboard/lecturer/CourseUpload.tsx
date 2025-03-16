
import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Upload, Plus, Camera, Video, File, FileText, ChevronRight, X, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  title: z.string().min(5, { message: 'يجب أن يكون العنوان 5 أحرف على الأقل' }),
  category: z.string().min(1, { message: 'يرجى اختيار التصنيف' }),
  price: z.string().min(1, { message: 'يرجى إدخال السعر' }),
  description: z.string().min(50, { message: 'يجب أن يكون الوصف 50 حرف على الأقل' }),
  level: z.string().min(1, { message: 'يرجى اختيار المستوى' }),
  language: z.string().min(1, { message: 'يرجى اختيار اللغة' }),
  duration: z.string().min(1, { message: 'يرجى إدخال المدة' }),
});

type LectureType = {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'quiz' | 'article';
  duration?: string;
  order: number;
};

const LecturerCourseUpload = () => {
  const [thumbnail, setThumbnail] = React.useState<File | null>(null);
  const [lectures, setLectures] = React.useState<LectureType[]>([]);
  const [formVisible, setFormVisible] = React.useState(false);
  const [currentLecture, setCurrentLecture] = React.useState<Partial<LectureType>>({});
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      price: '',
      description: '',
      level: '',
      language: 'ar',
      duration: '',
    },
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleAddLecture = () => {
    if (!currentLecture.title || !currentLecture.type) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال عنوان ونوع المحاضرة",
        variant: "destructive",
      });
      return;
    }

    const newLecture: LectureType = {
      id: Math.random().toString(36).substring(2, 9),
      title: currentLecture.title || '',
      description: currentLecture.description || '',
      type: (currentLecture.type as 'video' | 'quiz' | 'article') || 'video',
      duration: currentLecture.duration || '00:00',
      order: lectures.length + 1,
    };

    setLectures([...lectures, newLecture]);
    setCurrentLecture({});
    setFormVisible(false);

    toast({
      title: "تمت الإضافة",
      description: "تمت إضافة المحاضرة بنجاح",
    });
  };

  const removeLecture = (id: string) => {
    setLectures(lectures.filter(lecture => lecture.id !== id));
  };

  const reorderLectures = (id: string, direction: 'up' | 'down') => {
    const index = lectures.findIndex(lecture => lecture.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === lectures.length - 1)
    ) {
      return;
    }

    const newLectures = [...lectures];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap items
    [newLectures[index], newLectures[newIndex]] = [newLectures[newIndex], newLectures[index]];
    
    // Update order property
    newLectures.forEach((lecture, idx) => {
      lecture.order = idx + 1;
    });
    
    setLectures(newLectures);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!thumbnail) {
      toast({
        title: "خطأ",
        description: "يرجى إضافة صورة مصغرة للدورة",
        variant: "destructive",
      });
      return;
    }

    if (lectures.length === 0) {
      toast({
        title: "خطأ",
        description: "يرجى إضافة محاضرة واحدة على الأقل",
        variant: "destructive",
      });
      return;
    }

    console.log("Form values:", values);
    console.log("Thumbnail:", thumbnail);
    console.log("Lectures:", lectures);

    toast({
      title: "تم رفع الدورة بنجاح",
      description: "سيتم مراجعة الدورة ونشرها قريبًا.",
    });
  };

  return (
    <>
      <Helmet>
        <title>رفع دورة جديدة | لوحة تحكم المحاضر</title>
      </Helmet>
      
      <DashboardLayout type="lecturer" title="رفع دورة جديدة">
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/dashboard/lecturer/courses" className="hover:text-ali-blue transition-colors">
              الدورات
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>رفع دورة جديدة</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">رفع دورة جديدة</h1>
              <p className="text-gray-500">أضف دورة تدريبية جديدة إلى المنصة</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="basicInfo">
          <TabsList className="mb-6">
            <TabsTrigger value="basicInfo">المعلومات الأساسية</TabsTrigger>
            <TabsTrigger value="content">المحتوى</TabsTrigger>
            <TabsTrigger value="pricing">التسعير</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="basicInfo">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>معلومات الدورة</CardTitle>
                      <CardDescription>أدخل المعلومات الأساسية للدورة التدريبية</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>عنوان الدورة</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل عنوان الدورة" {...field} />
                            </FormControl>
                            <FormDescription>
                              يجب أن يكون العنوان واضحًا ومعبرًا عن محتوى الدورة
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>التصنيف</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر تصنيف الدورة" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="programming">برمجة</SelectItem>
                                  <SelectItem value="marketing">تسويق</SelectItem>
                                  <SelectItem value="design">تصميم</SelectItem>
                                  <SelectItem value="business">أعمال</SelectItem>
                                  <SelectItem value="self-development">تطوير ذاتي</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>المستوى</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر مستوى الدورة" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="beginner">مبتدئ</SelectItem>
                                  <SelectItem value="intermediate">متوسط</SelectItem>
                                  <SelectItem value="advanced">متقدم</SelectItem>
                                  <SelectItem value="all-levels">جميع المستويات</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>لغة الدورة</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر لغة الدورة" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="ar">العربية</SelectItem>
                                  <SelectItem value="en">الإنجليزية</SelectItem>
                                  <SelectItem value="fr">الفرنسية</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>وصف الدورة</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="اكتب وصفًا مفصلاً للدورة" 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              صف محتوى الدورة والمهارات التي سيكتسبها المتعلم والفئة المستهدفة
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>المدة الإجمالية للدورة (بالساعات)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="مثال: 10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>الصورة المصغرة</CardTitle>
                      <CardDescription>قم بتحميل صورة جذابة للدورة</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        {thumbnail ? (
                          <div className="relative">
                            <img 
                              src={URL.createObjectURL(thumbnail)} 
                              alt="صورة الدورة" 
                              className="mx-auto max-h-60 object-contain mb-4" 
                            />
                            <div className="flex justify-center">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                type="button"
                                className="text-red-500" 
                                onClick={() => setThumbnail(null)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                إزالة الصورة
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                            <h3 className="text-lg font-medium mb-2">قم بتحميل صورة مصغرة</h3>
                            <p className="text-gray-500 text-sm mb-4">
                              ينصح باستخدام صورة بأبعاد 16:9 وحجم لا يقل عن 1280 × 720 بكسل
                            </p>
                            <input
                              type="file"
                              id="thumbnail"
                              className="hidden"
                              accept="image/*"
                              onChange={handleThumbnailChange}
                            />
                            <label htmlFor="thumbnail">
                              <Button type="button" variant="outline" className="mr-2">اختيار صورة</Button>
                            </label>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={() => document.getElementById('content-tab')?.click()}>
                      التالي: المحتوى
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="content" id="content-tab">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>محتوى الدورة</CardTitle>
                      <CardDescription>أضف الوحدات والمحاضرات إلى الدورة</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">المحاضرات</h3>
                          <Button 
                            type="button" 
                            onClick={() => setFormVisible(true)}
                            disabled={formVisible}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            إضافة محاضرة
                          </Button>
                        </div>
                        
                        {formVisible && (
                          <Card className="border-2 border-blue-100 bg-blue-50/50">
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="lecture-title">عنوان المحاضرة</Label>
                                    <Input 
                                      id="lecture-title" 
                                      placeholder="أدخل عنوان المحاضرة" 
                                      value={currentLecture.title || ''}
                                      onChange={(e) => setCurrentLecture({...currentLecture, title: e.target.value})}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="lecture-type">نوع المحاضرة</Label>
                                    <Select 
                                      onValueChange={(value) => setCurrentLecture({...currentLecture, type: value})}
                                      value={currentLecture.type}
                                    >
                                      <SelectTrigger id="lecture-type">
                                        <SelectValue placeholder="اختر نوع المحاضرة" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="video">فيديو</SelectItem>
                                        <SelectItem value="article">مقال</SelectItem>
                                        <SelectItem value="quiz">اختبار</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="lecture-description">وصف المحاضرة</Label>
                                  <Textarea 
                                    id="lecture-description" 
                                    placeholder="أدخل وصفًا مختصرًا للمحاضرة" 
                                    value={currentLecture.description || ''}
                                    onChange={(e) => setCurrentLecture({...currentLecture, description: e.target.value})}
                                  />
                                </div>
                                
                                {currentLecture.type === 'video' && (
                                  <div className="space-y-2">
                                    <Label htmlFor="lecture-duration">مدة الفيديو</Label>
                                    <Input 
                                      id="lecture-duration" 
                                      placeholder="مثال: 15:30" 
                                      value={currentLecture.duration || ''}
                                      onChange={(e) => setCurrentLecture({...currentLecture, duration: e.target.value})}
                                    />
                                  </div>
                                )}
                                
                                <div className="flex justify-end space-x-2 space-x-reverse">
                                  <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => {
                                      setFormVisible(false);
                                      setCurrentLecture({});
                                    }}
                                  >
                                    إلغاء
                                  </Button>
                                  <Button type="button" onClick={handleAddLecture}>
                                    إضافة المحاضرة
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {lectures.length > 0 ? (
                          <div className="space-y-3">
                            {lectures.map((lecture, index) => (
                              <div key={lecture.id} className="flex items-start p-4 border rounded-lg bg-gray-50">
                                <div className="mr-4 bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-700 font-medium">
                                  {lecture.order}
                                </div>
                                <div className="flex-grow">
                                  <div className="flex items-center mb-1">
                                    <h4 className="font-medium">{lecture.title}</h4>
                                    <span className="mr-2 text-xs px-2 py-1 bg-gray-200 rounded-full">
                                      {lecture.type === 'video' ? 'فيديو' : 
                                        lecture.type === 'article' ? 'مقال' : 'اختبار'}
                                    </span>
                                    {lecture.type === 'video' && lecture.duration && (
                                      <span className="mr-2 text-xs text-gray-500">
                                        {lecture.duration}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 line-clamp-2">
                                    {lecture.description || 'لا يوجد وصف'}
                                  </p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => reorderLectures(lecture.id, 'up')}
                                    disabled={index === 0}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => reorderLectures(lecture.id, 'down')}
                                    disabled={index === lectures.length - 1}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => removeLecture(lecture.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                            <FileText className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                            <h3 className="text-lg font-medium text-gray-600 mb-1">لا توجد محاضرات</h3>
                            <p className="text-gray-500 text-sm mb-4">
                              قم بإضافة محاضرات لدورتك لتظهر هنا
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => document.getElementById('basicInfo-tab')?.click()}>
                      السابق: المعلومات الأساسية
                    </Button>
                    <Button type="button" onClick={() => document.getElementById('pricing-tab')?.click()}>
                      التالي: التسعير
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="pricing" id="pricing-tab">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>تسعير الدورة</CardTitle>
                      <CardDescription>حدد سعر الدورة وخيارات الشراء</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>سعر الدورة (بالريال السعودي)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="أدخل سعر الدورة" {...field} />
                            </FormControl>
                            <FormDescription>
                              حدد سعرًا مناسبًا للدورة يتناسب مع حجم المحتوى وقيمته
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-3">
                        <Label>خيارات متقدمة</Label>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <input type="checkbox" id="promotion" className="mr-2" />
                          <Label htmlFor="promotion" className="text-sm font-normal cursor-pointer">
                            تفعيل خصم ترويجي
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <input type="checkbox" id="certificate" className="mr-2" />
                          <Label htmlFor="certificate" className="text-sm font-normal cursor-pointer">
                            إصدار شهادة عند إتمام الدورة
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <input type="checkbox" id="subscription" className="mr-2" />
                          <Label htmlFor="subscription" className="text-sm font-normal cursor-pointer">
                            إتاحة الدورة للاشتراك الشهري
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => document.getElementById('content-tab')?.click()}>
                      السابق: المحتوى
                    </Button>
                    <Button type="submit">
                      <Upload className="mr-2 h-4 w-4" />
                      نشر الدورة
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </DashboardLayout>
    </>
  );
};

export default LecturerCourseUpload;
