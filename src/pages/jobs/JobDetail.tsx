
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Briefcase, Tag, Check, User, AlertCircle } from 'lucide-react';
import { fetchJobPostById, createProposal } from '@/services/jobService';
import { JobPost } from '@/types/jobs';
import CustomButton from '@/components/ui/CustomButton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';

const proposalSchema = z.object({
  proposal_text: z
    .string()
    .min(50, 'الرجاء كتابة عرض مفصل لا يقل عن 50 حرفاً')
    .max(2000, 'الرجاء اختصار العرض ليكون أقل من 2000 حرف'),
  price: z
    .number({ required_error: 'الرجاء تحديد السعر', invalid_type_error: 'الرجاء إدخال رقم صحيح' })
    .min(1, 'يجب أن يكون السعر أكبر من صفر'),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      proposal_text: '',
      price: 0,
    },
  });

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      
      setLoading(true);
      const jobData = await fetchJobPostById(id);
      setJob(jobData);
      setLoading(false);
    };

    loadJob();
  }, [id]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    checkAuth();
  }, []);

  const onSubmitProposal = async (values: ProposalFormValues) => {
    if (!id || !user) return;
    
    setIsSubmitting(true);
    
    const result = await createProposal({
      job_id: id,
      proposal_text: values.proposal_text,
      price: values.price,
    });
    
    setIsSubmitting(false);
    
    if (result) {
      setSubmitSuccess(true);
      form.reset();
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container-custom">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container-custom text-center py-12">
          <div className="inline-block p-4 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">لم يتم العثور على المشروع</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            المشروع الذي تبحث عنه غير موجود أو قد تم إزالته.
          </p>
          <CustomButton onClick={() => navigate('/jobs')}>
            العودة إلى قائمة المشاريع
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h1 className="heading-md text-gray-900 mb-4">{job.title}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 ml-2" />
              <span>نُشر في {formatDate(job.created_at)}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 ml-2" />
              <span>{job.category}</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>وصف المشروع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap text-gray-700">{job.description}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Required Skills */}
            <Card>
              <CardHeader>
                <CardTitle>المهارات المطلوبة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} className="bg-gray-100 text-gray-800">
                      <Tag className="h-3.5 w-3.5 ml-1" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Project Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>متطلبات المشروع</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>خبرة في المجال المطلوب لا تقل عن سنة واحدة</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>القدرة على التواصل بشكل منتظم وواضح</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>الالتزام بالمواعيد النهائية المتفق عليها</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span>الاهتمام بالتفاصيل وتقديم عمل عالي الجودة</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Budget */}
            <Card>
              <CardHeader>
                <CardTitle>ميزانية المشروع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {job.budget_min && job.budget_max
                    ? `$${job.budget_min} - $${job.budget_max}`
                    : job.budget_min
                    ? `بدءاً من $${job.budget_min}`
                    : job.budget_max
                    ? `حتى $${job.budget_max}`
                    : 'الميزانية غير محددة'}
                </div>
                <p className="text-gray-600 text-sm">
                  يرجى تقديم عرض ضمن نطاق الميزانية المحدد
                </p>
              </CardContent>
            </Card>
            
            {/* Client Info (Placeholder) */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات صاحب العمل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="mr-3">
                    <p className="font-medium text-gray-900">صاحب العمل</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 ml-1" />
                      <span className="text-sm text-gray-600">عضو منذ {new Date().getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Submit Proposal */}
            {user ? (
              <Dialog>
                <DialogTrigger asChild>
                  <CustomButton size="lg" className="w-full" isLoading={isSubmitting}>
                    تقديم عرض
                  </CustomButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>تقديم عرض للمشروع</DialogTitle>
                    <DialogDescription>
                      قدم عرضك بسعر مناسب ووصف مفصل لخبراتك ومؤهلاتك
                    </DialogDescription>
                  </DialogHeader>
                  
                  {submitSuccess ? (
                    <div className="p-4 text-center">
                      <div className="inline-block p-3 rounded-full bg-green-100 mb-4">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">تم تقديم عرضك بنجاح!</h3>
                      <p className="text-gray-600 mb-4">
                        سيتم مراجعة عرضك من قبل صاحب العمل وسيتواصل معك في حالة اختيارك للمشروع.
                      </p>
                      <div className="flex justify-center">
                        <CustomButton onClick={() => navigate('/jobs')}>
                          العودة إلى قائمة المشاريع
                        </CustomButton>
                      </div>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmitProposal)} className="space-y-6 py-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>السعر المقترح (بالدولار)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="ادخل السعر المقترح" 
                                  {...field}
                                  onChange={e => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="proposal_text"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>تفاصيل العرض</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="اشرح بالتفصيل كيف يمكنك تنفيذ المشروع، وخبراتك في هذا المجال، والمدة المتوقعة للتنفيذ..."
                                  rows={6}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <CustomButton type="submit" isLoading={isSubmitting}>
                            تقديم العرض
                          </CustomButton>
                        </div>
                      </form>
                    </Form>
                  )}
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <CustomButton size="lg" className="w-full">
                    تقديم عرض
                  </CustomButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>تسجيل الدخول مطلوب</DialogTitle>
                    <DialogDescription>
                      لتقديم عرض للمشروع، يرجى تسجيل الدخول أو إنشاء حساب جديد
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                    <CustomButton onClick={() => navigate('/login')}>
                      تسجيل الدخول
                    </CustomButton>
                    <CustomButton variant="outline" onClick={() => navigate('/register')}>
                      إنشاء حساب
                    </CustomButton>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
