
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyProposals } from '@/services/jobService';
import { JobProposal, JobPost } from '@/types/jobs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CustomButton from '@/components/ui/CustomButton';
import { Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ProposalWithJob extends JobProposal {
  job_posts: JobPost;
}

const MyProposals: React.FC = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<ProposalWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
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
    const loadProposals = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('job_proposals')
          .select('*, job_posts(*)')
          .eq('freelancer_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setProposals(data as ProposalWithJob[]);
      } catch (error) {
        console.error('Error fetching proposals:', error);
        setProposals([]);
      }
      
      setLoading(false);
    };
    
    if (user?.id) {
      loadProposals();
    }
  }, [user?.id]);
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد المراجعة</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800">مقبول</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">مرفوض</Badge>;
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">العروض المقدمة</h1>
          <p className="text-gray-600 mt-1">إدارة العروض التي قدمتها على المشاريع</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>قائمة العروض</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-ali-blue border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">جاري تحميل العروض...</p>
              </div>
            ) : proposals.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>عنوان المشروع</TableHead>
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
                        {proposal.job_posts.title}
                      </TableCell>
                      <TableCell>${proposal.price}</TableCell>
                      <TableCell>{formatDate(proposal.created_at)}</TableCell>
                      <TableCell>{getStatusBadge(proposal.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 flex-row-reverse">
                          <Dialog>
                            <DialogTrigger asChild>
                              <CustomButton size="sm" variant="ghost" className="px-2">
                                <Eye size={18} />
                              </CustomButton>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>تفاصيل العرض</DialogTitle>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="mb-6">
                                  <h3 className="font-medium text-gray-900 mb-2">المشروع:</h3>
                                  <p className="text-gray-700">{proposal.job_posts.title}</p>
                                </div>
                                
                                <div className="mb-6">
                                  <h3 className="font-medium text-gray-900 mb-2">العرض المقدم:</h3>
                                  <p className="text-gray-700 whitespace-pre-wrap">{proposal.proposal_text}</p>
                                </div>
                                
                                <div className="mb-6">
                                  <h3 className="font-medium text-gray-900 mb-2">السعر:</h3>
                                  <p className="text-gray-700">${proposal.price}</p>
                                </div>
                                
                                <div className="mb-6">
                                  <h3 className="font-medium text-gray-900 mb-2">الحالة:</h3>
                                  <div>{getStatusBadge(proposal.status)}</div>
                                </div>
                                
                                <div className="pt-4 border-t flex justify-end">
                                  <CustomButton
                                    onClick={() => navigate(`/jobs/${proposal.job_posts.id}`)}
                                  >
                                    عرض المشروع
                                  </CustomButton>
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
                <p className="text-gray-600 mb-4">لم تقدم أية عروض حتى الآن</p>
                <CustomButton onClick={() => navigate('/jobs')}>
                  استعراض المشاريع المتاحة
                </CustomButton>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProposals;
