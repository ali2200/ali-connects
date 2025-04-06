
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash, Eye, Check, X } from 'lucide-react';
import { fetchJobPosts, fetchProposalsForJob, deleteJobPost, updateJobPost } from '@/services/jobService';
import { JobPost, JobProposal } from '@/types/jobs';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import CustomButton from '@/components/ui/CustomButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const ManageJobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [proposals, setProposals] = useState<JobProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'jobs' | 'proposals'>('jobs');
  
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
  
  useEffect(() => {
    const loadJobs = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('job_posts')
          .select('*')
          .eq('client_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setJobs(data as JobPost[]);
      } catch (error) {
        console.error('Error fetching job posts:', error);
        setJobs([]);
      }
      
      setLoading(false);
    };
    
    if (user?.id) {
      loadJobs();
    }
  }, [user?.id]);
  
  const handleViewProposals = async (job: JobPost) => {
    setSelectedJob(job);
    setViewMode('proposals');
    
    try {
      const data = await fetchProposalsForJob(job.id);
      setProposals(data);
    } catch (error) {
      console.error('Error fetching proposals:', error);
      setProposals([]);
    }
  };
  
  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا المشروع؟')) {
      const success = await deleteJobPost(jobId);
      if (success) {
        setJobs(jobs.filter(job => job.id !== jobId));
      }
    }
  };
  
  const handleUpdateJobStatus = async (jobId: string, status: 'active' | 'completed' | 'cancelled') => {
    const updated = await updateJobPost(jobId, { status });
    if (updated) {
      setJobs(jobs.map(job => job.id === jobId ? { ...job, status } : job));
    }
  };
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">مكتمل</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">ملغي</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };
  
  if (!user) {
    return <div className="pt-24 pb-16 text-center">جاري التحميل...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إدارة المشاريع</h1>
            <p className="text-gray-600 mt-1">قم بإدارة مشاريعك والمقترحات المقدمة</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <CustomButton onClick={() => navigate('/dashboard/client/post-job')} rightIcon={<PlusCircle className="ml-2" size={18} />}>
              نشر مشروع جديد
            </CustomButton>
          </div>
        </div>
        
        <Card className="p-0">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 flex-1 text-center ${viewMode === 'jobs' ? 'border-b-2 border-ali-blue font-medium text-ali-blue' : 'text-gray-500'}`}
              onClick={() => setViewMode('jobs')}
            >
              المشاريع
            </button>
            {selectedJob && (
              <button
                className={`px-4 py-2 flex-1 text-center ${viewMode === 'proposals' ? 'border-b-2 border-ali-blue font-medium text-ali-blue' : 'text-gray-500'}`}
                onClick={() => setViewMode('proposals')}
              >
                العروض المقدمة لـ: {selectedJob.title}
              </button>
            )}
          </div>
          
          {viewMode === 'jobs' ? (
            <div className="p-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-ali-blue border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">جاري تحميل المشاريع...</p>
                </div>
              ) : jobs.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>عنوان المشروع</TableHead>
                      <TableHead>التصنيف</TableHead>
                      <TableHead>تاريخ النشر</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الميزانية</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.category}</TableCell>
                        <TableCell>{formatDate(job.created_at)}</TableCell>
                        <TableCell>{getStatusBadge(job.status)}</TableCell>
                        <TableCell>
                          {job.budget_min && job.budget_max
                            ? `$${job.budget_min} - $${job.budget_max}`
                            : job.budget_min
                            ? `من $${job.budget_min}`
                            : job.budget_max
                            ? `حتى $${job.budget_max}`
                            : 'غير محدد'}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 flex-row-reverse">
                            <CustomButton 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleViewProposals(job)}
                              className="px-2"
                            >
                              <Eye size={18} />
                            </CustomButton>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <CustomButton 
                                  size="sm" 
                                  variant="ghost" 
                                  className="px-2 text-amber-600 hover:text-amber-700"
                                >
                                  <Edit size={18} />
                                </CustomButton>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>تغيير حالة المشروع</DialogTitle>
                                  <DialogDescription>
                                    حدد الحالة الجديدة للمشروع
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-3 gap-4 py-4">
                                  <CustomButton
                                    onClick={() => handleUpdateJobStatus(job.id, 'active')}
                                    className={job.status === 'active' ? 'bg-green-600' : ''}
                                    variant={job.status === 'active' ? 'default' : 'outline'}
                                  >
                                    نشط
                                  </CustomButton>
                                  <CustomButton
                                    onClick={() => handleUpdateJobStatus(job.id, 'completed')}
                                    className={job.status === 'completed' ? 'bg-blue-600' : ''}
                                    variant={job.status === 'completed' ? 'default' : 'outline'}
                                  >
                                    مكتمل
                                  </CustomButton>
                                  <CustomButton
                                    onClick={() => handleUpdateJobStatus(job.id, 'cancelled')}
                                    className={job.status === 'cancelled' ? 'bg-red-600' : ''}
                                    variant={job.status === 'cancelled' ? 'default' : 'outline'}
                                  >
                                    ملغي
                                  </CustomButton>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <CustomButton 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleDeleteJob(job.id)}
                              className="px-2 text-red-600 hover:text-red-700"
                            >
                              <Trash size={18} />
                            </CustomButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">لم تقم بنشر أية مشاريع حتى الآن</p>
                  <CustomButton onClick={() => navigate('/dashboard/client/post-job')}>
                    نشر مشروع جديد
                  </CustomButton>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              {proposals.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>معرف المستقل</TableHead>
                      <TableHead>السعر المقترح</TableHead>
                      <TableHead>تاريخ التقديم</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proposals.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell className="font-medium">
                          {proposal.freelancer_id.slice(0, 8)}...
                        </TableCell>
                        <TableCell>${proposal.price}</TableCell>
                        <TableCell>{formatDate(proposal.created_at)}</TableCell>
                        <TableCell>
                          {proposal.status === 'pending' && (
                            <Badge className="bg-yellow-100 text-yellow-800">قيد المراجعة</Badge>
                          )}
                          {proposal.status === 'accepted' && (
                            <Badge className="bg-green-100 text-green-800">مقبول</Badge>
                          )}
                          {proposal.status === 'rejected' && (
                            <Badge className="bg-red-100 text-red-800">مرفوض</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 flex-row-reverse">
                            <Dialog>
                              <DialogTrigger asChild>
                                <CustomButton 
                                  size="sm" 
                                  variant="ghost" 
                                  className="px-2"
                                >
                                  <Eye size={18} />
                                </CustomButton>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>تفاصيل العرض</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                  <p className="text-gray-700 whitespace-pre-wrap">{proposal.proposal_text}</p>
                                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                    <div>
                                      <span className="text-gray-600">السعر المقترح:</span>
                                      <span className="font-bold mr-2">${proposal.price}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <CustomButton
                                        size="sm"
                                        className="bg-green-600"
                                        onClick={async () => {
                                          await supabase
                                            .from('job_proposals')
                                            .update({ status: 'accepted' })
                                            .eq('id', proposal.id);
                                            
                                          setProposals(proposals.map(p => 
                                            p.id === proposal.id ? { ...p, status: 'accepted' } : p
                                          ));
                                        }}
                                      >
                                        <Check size={16} className="ml-1" />
                                        قبول
                                      </CustomButton>
                                      <CustomButton
                                        size="sm"
                                        className="bg-red-600"
                                        onClick={async () => {
                                          await supabase
                                            .from('job_proposals')
                                            .update({ status: 'rejected' })
                                            .eq('id', proposal.id);
                                            
                                          setProposals(proposals.map(p => 
                                            p.id === proposal.id ? { ...p, status: 'rejected' } : p
                                          ));
                                        }}
                                      >
                                        <X size={16} className="ml-1" />
                                        رفض
                                      </CustomButton>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">لم يتم تقديم عروض لهذا المشروع حتى الآن.</p>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ManageJobs;
