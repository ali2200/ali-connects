
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Check, Loader2, Globe, ArrowRight } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema for WordPress credentials
const wordpressSchema = z.object({
  siteUrl: z.string().url({ message: 'يرجى إدخال رابط صالح' }),
  username: z.string().min(1, { message: 'اسم المستخدم مطلوب' }),
  password: z.string().min(1, { message: 'كلمة المرور مطلوبة' }),
  apiKey: z.string().min(1, { message: 'مفتاح API مطلوب' }),
});

type WordpressFormValues = z.infer<typeof wordpressSchema>;

const WordPressIntegration = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const { toast } = useToast();

  // Form handling
  const form = useForm<WordpressFormValues>({
    resolver: zodResolver(wordpressSchema),
    defaultValues: {
      siteUrl: '',
      username: '',
      password: '',
      apiKey: '',
    },
  });

  const onSubmit = (data: WordpressFormValues) => {
    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      toast({
        title: "تم الاتصال بنجاح",
        description: "تم الاتصال بموقع ووردبريس الخاص بك بنجاح",
        variant: "default",
      });
      
      localStorage.setItem('wordpress_connection', JSON.stringify({
        siteUrl: data.siteUrl,
        username: data.username,
        connected: true,
        lastSync: new Date().toISOString(),
      }));
    }, 2000);
  };

  const handleSyncContent = () => {
    setSyncStatus('syncing');
    
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus('synced');
      
      toast({
        title: "تمت المزامنة بنجاح",
        description: "تمت مزامنة المحتوى مع موقع ووردبريس الخاص بك",
        variant: "default",
      });
    }, 3000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    localStorage.removeItem('wordpress_connection');
    
    toast({
      title: "تم قطع الاتصال",
      description: "تم قطع الاتصال بموقع ووردبريس الخاص بك",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">تكامل ووردبريس</h2>
        <a 
          href="https://docs.seowriting.ai/article/wordpress-integration" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
        >
          تعليمات التكامل
          <ArrowRight className="h-3 w-3 mr-1" />
        </a>
      </div>
      
      <Tabs defaultValue={isConnected ? "manage" : "setup"}>
        <TabsList className="mb-4">
          <TabsTrigger value="setup">إعداد الاتصال</TabsTrigger>
          <TabsTrigger value="manage" disabled={!isConnected}>إدارة المحتوى</TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup">
          {!isConnected ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="siteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رابط موقع ووردبريس</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 ml-2 text-gray-400" />
                          <Input placeholder="https://example.com" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        أدخل الرابط الكامل لموقع ووردبريس الخاص بك
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المستخدم</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رمز التطبيق أو كلمة المرور</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormDescription>
                        يفضل استخدام رمز التطبيق بدلاً من كلمة المرور الرئيسية
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مفتاح SEOWriting API</FormLabel>
                      <FormControl>
                        <Input placeholder="sk_..." {...field} />
                      </FormControl>
                      <FormDescription>
                        يمكنك الحصول على المفتاح من لوحة تحكم SEOWriting
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button type="submit" disabled={isConnecting}>
                    {isConnecting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    {isConnecting ? 'جارِ الاتصال...' : 'اتصال بووردبريس'}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <Card className="p-6 bg-green-50 border-green-100">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">تم الاتصال بنجاح</h3>
                  <p className="text-sm text-green-600">
                    تم الاتصال بموقع ووردبريس الخاص بك بنجاح. يمكنك الآن إدارة المحتوى ومزامنته.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" onClick={handleDisconnect}>
                  قطع الاتصال
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="manage">
          {isConnected && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-medium mb-2">حالة الاتصال</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">الموقع</p>
                    <p className="font-medium">example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">آخر مزامنة</p>
                    <p className="font-medium">منذ 2 ساعات</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">مزامنة المحتوى</h3>
                <p className="text-sm text-gray-600 mb-4">
                  قم بمزامنة المحتوى بين منصة علي للأعمال وموقع ووردبريس الخاص بك.
                </p>
                
                <div className="flex space-x-4 space-x-reverse">
                  <Button 
                    onClick={handleSyncContent}
                    disabled={syncStatus === 'syncing'}
                  >
                    {syncStatus === 'syncing' && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    {syncStatus === 'syncing' ? 'جارِ المزامنة...' : 'مزامنة المحتوى'}
                  </Button>
                  
                  <Button variant="outline">
                    الإعدادات المتقدمة
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">خيارات النشر</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="auto-publish" className="ml-2" defaultChecked />
                    <label htmlFor="auto-publish" className="text-sm">نشر تلقائي للمقالات الجديدة</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="sync-images" className="ml-2" defaultChecked />
                    <label htmlFor="sync-images" className="text-sm">تضمين الصور عند النشر</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="sync-categories" className="ml-2" defaultChecked />
                    <label htmlFor="sync-categories" className="text-sm">مزامنة التصنيفات والوسوم</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WordPressIntegration;
