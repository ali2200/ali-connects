
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
import { Upload, Plus, File, FileText, ChevronRight, X } from 'lucide-react';
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
  language: z.string().min(1, { message: 'يرجى اختيار اللغة' }),
  pages: z.string().min(1, { message: 'يرجى إدخال عدد الصفحات' }),
});

const LecturerBookUpload = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [cover, setCover] = React.useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      price: '',
      description: '',
      language: 'ar',
      pages: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCover(e.target.files[0]);
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!cover) {
      toast({
        title: "خطأ",
        description: "يرجى إضافة صورة غلاف للكتاب",
        variant: "destructive",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "خطأ",
        description: "يرجى إضافة ملف الكتاب",
        variant: "destructive",
      });
      return;
    }

    console.log("Form values:", values);
    console.log("Cover:", cover);
    console.log("Files:", files);

    toast({
      title: "تم رفع الكتاب بنجاح",
      description: "سيتم مراجعة الكتاب ونشره قريبًا.",
    });
  };

  return (
    <>
      <Helmet>
        <title>رفع كتاب جديد | لوحة تحكم المحاضر</title>
      </Helmet>
      
      <DashboardLayout type="lecturer" title="رفع كتاب جديد">
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/dashboard/lecturer/books" className="hover:text-ali-blue transition-colors">
              الكتب
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>رفع كتاب جديد</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">رفع كتاب جديد</h1>
              <p className="text-gray-500">أضف كتابًا جديدًا إلى المنصة</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="basicInfo">
          <TabsList className="mb-6">
            <TabsTrigger value="basicInfo">المعلومات الأساسية</TabsTrigger>
            <TabsTrigger value="content">المحتوى والملفات</TabsTrigger>
            <TabsTrigger value="pricing">التسعير</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="basicInfo">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>معلومات الكتاب</CardTitle>
                      <CardDescription>أدخل المعلومات الأساسية للكتاب</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>عنوان الكتاب</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل عنوان الكتاب" {...field} />
                            </FormControl>
                            <FormDescription>
                              يجب أن يكون العنوان واضحًا ومعبرًا عن محتوى الكتاب
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>التصنيف</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر تصنيف الكتاب" />
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
                          name="language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>لغة الكتاب</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر لغة الكتاب" />
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
                            <FormLabel>وصف الكتاب</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="اكتب وصفًا مفصلاً للكتاب" 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              صف محتوى الكتاب والمواضيع التي يتناولها والفئة المستهدفة
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="pages"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>عدد الصفحات</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="عدد صفحات الكتاب" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={() => document.getElementById('content-tab')?.click()}>
                      التالي: المحتوى والملفات
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="content" id="content-tab">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>صورة الغلاف</CardTitle>
                      <CardDescription>قم بتحميل صورة غلاف جذابة للكتاب</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        {cover ? (
                          <div className="relative">
                            <img 
                              src={URL.createObjectURL(cover)} 
                              alt="غلاف الكتاب" 
                              className="mx-auto max-h-80 object-contain mb-4" 
                            />
                            <div className="flex justify-center">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                type="button"
                                className="text-red-500" 
                                onClick={() => setCover(null)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                إزالة
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                            <h3 className="text-lg font-medium mb-2">قم بتحميل صورة الغلاف</h3>
                            <p className="text-gray-500 text-sm mb-4">
                              اسحب وأفلت الصورة هنا، أو انقر لاختيار ملف
                            </p>
                            <input
                              type="file"
                              id="cover"
                              className="hidden"
                              accept="image/*"
                              onChange={handleCoverChange}
                            />
                            <label htmlFor="cover">
                              <Button type="button" variant="outline" className="mr-2">اختيار صورة</Button>
                            </label>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>ملفات الكتاب</CardTitle>
                      <CardDescription>قم بتحميل ملف الكتاب بصيغة PDF</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
                        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <h3 className="text-lg font-medium mb-2">قم بتحميل ملفات الكتاب</h3>
                        <p className="text-gray-500 text-sm mb-4">
                          يمكنك تحميل ملف PDF للكتاب الكامل
                        </p>
                        <input
                          type="file"
                          id="bookFiles"
                          className="hidden"
                          accept=".pdf,.epub,.mobi"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="bookFiles">
                          <Button type="button" variant="outline" className="mr-2">
                            <Plus className="h-4 w-4 mr-2" />
                            إضافة ملفات
                          </Button>
                        </label>
                      </div>
                      
                      {files.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-medium">الملفات المضافة</h4>
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <File className="h-5 w-5 text-gray-500 ml-3" />
                                <div>
                                  <p className="font-medium text-sm">{file.name}</p>
                                  <p className="text-gray-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500" 
                                onClick={() => removeFile(file)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
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
                      <CardTitle>تسعير الكتاب</CardTitle>
                      <CardDescription>حدد سعر الكتاب وخيارات الشراء</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>سعر الكتاب (بالريال السعودي)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="أدخل سعر الكتاب" {...field} />
                            </FormControl>
                            <FormDescription>
                              حدد سعرًا مناسبًا للكتاب يتناسب مع حجم المحتوى وقيمته
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-3">
                        <Label>خيارات متقدمة</Label>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <input type="checkbox" id="preview" className="mr-2" />
                          <Label htmlFor="preview" className="text-sm font-normal cursor-pointer">
                            السماح بمعاينة جزء من الكتاب (فصل أو أكثر)
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <input type="checkbox" id="discount" className="mr-2" />
                          <Label htmlFor="discount" className="text-sm font-normal cursor-pointer">
                            تفعيل خصم ترويجي
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => document.getElementById('content-tab')?.click()}>
                      السابق: المحتوى والملفات
                    </Button>
                    <Button type="submit">
                      <Upload className="mr-2 h-4 w-4" />
                      نشر الكتاب
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

export default LecturerBookUpload;
