
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, X } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createJobPost } from '@/services/jobService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CustomButton from '@/components/ui/CustomButton';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const CATEGORIES = [
  'برمجة وتطوير',
  'تصميم وإبداع',
  'كتابة وترجمة',
  'تسويق وإعلان',
  'دعم فني',
  'مبيعات',
  'تدريس وتدريب',
  'استشارات',
  'أخرى'
];

const jobSchema = z.object({
  title: z.string().min(10, 'عنوان المشروع يجب أن يكون 10 أحرف على الأقل').max(100, 'عنوان المشروع يجب ألا يتجاوز 100 حرف'),
  description: z.string().min(50, 'الوصف يجب أن يكون 50 حرف على الأقل').max(5000, 'الوصف يجب ألا يتجاوز 5000 حرف'),
  category: z.string().min(1, 'الرجاء اختيار تصنيف'),
  budget_min: z.string().optional(),
  budget_max: z.string().optional(),
  skill: z.string().optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      budget_min: '',
      budget_max: '',
      skill: '',
    },
  });
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      
      if (!data.user) {
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  const addSkill = () => {
    const skill = form.getValues('skill')?.trim();
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      form.setValue('skill', '');
      setSkillInput('');
    }
  };
  
  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };
  
  const onSubmit = async (values: JobFormValues) => {
    if (skills.length === 0) {
      form.setError('skill', { 
        type: 'manual', 
        message: 'يجب إضافة مهارة واحدة على الأقل' 
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const budget_min = values.budget_min ? Number(values.budget_min) : null;
      const budget_max = values.budget_max ? Number(values.budget_max) : null;
      
      const jobData = {
        title: values.title,
        description: values.description,
        category: values.category,
        budget_min,
        budget_max,
        skills,
      };
      
      const result = await createJobPost(jobData);
      
      if (result) {
        navigate('/dashboard/client/manage-jobs');
      } else {
        throw new Error('Failed to create job post');
      }
    } catch (error) {
      console.error('Error creating job post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!user) {
    return <div className="pt-24 pb-16 text-center">جاري التحميل...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">نشر مشروع جديد</h1>
          <p className="text-gray-600 mt-1">أضف تفاصيل مشروعك للبدء في تلقي عروض من المستقلين</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>معلومات المشروع</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عنوان المشروع</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل عنواناً وصفياً للمشروع" {...field} />
                      </FormControl>
                      <FormDescription>
                        اختر عنواناً واضحاً يلخص المشروع ويجذب المستقلين المناسبين
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>وصف المشروع</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="اشرح بالتفصيل ما تحتاجه، والمخرجات المتوقعة، والمتطلبات الفنية..." 
                          className="min-h-[200px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        كلما كان الوصف مفصلاً، زادت فرصة الحصول على عروض دقيقة تلبي احتياجاتك
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>التصنيف</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر تصنيفاً" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="budget_min"
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>الحد الأدنى للميزانية (دولار)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="budget_max"
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>الحد الأقصى للميزانية (دولار)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="اتركه فارغاً إذا لم يكن هناك حد أقصى" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="skill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المهارات المطلوبة</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input 
                            placeholder="أضف المهارات المطلوبة للمشروع" 
                            {...field} 
                            value={skillInput}
                            onChange={(e) => {
                              field.onChange(e);
                              setSkillInput(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault();
                                addSkill();
                              }
                            }}
                          />
                        </FormControl>
                        <CustomButton 
                          type="button" 
                          onClick={addSkill} 
                          variant="outline"
                          rightIcon={<PlusCircle className="w-4 h-4 ml-1" />}
                        >
                          إضافة
                        </CustomButton>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill) => (
                          <Badge key={skill} className="pr-1 flex items-center bg-gray-100 text-gray-800">
                            {skill}
                            <button
                              type="button"
                              className="ml-1 bg-gray-200 rounded-full p-0.5 hover:bg-gray-300 transition-colors"
                              onClick={() => removeSkill(skill)}
                            >
                              <X className="h-3 w-3 text-gray-600" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormDescription>
                        أضف المهارات التي يحتاجها المستقل لتنفيذ المشروع
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <CustomButton type="submit" isLoading={isSubmitting}>
                    نشر المشروع
                  </CustomButton>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;
