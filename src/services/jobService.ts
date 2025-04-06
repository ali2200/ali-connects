
import { supabase } from "@/integrations/supabase/client";
import { JobPost, JobProposal } from "@/types/jobs";

// Job Posts Services
export const fetchJobPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('job_posts')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as JobPost[];
  } catch (error) {
    console.error('Error fetching job posts:', error);
    return [];
  }
};

export const fetchJobPostById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('job_posts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data as JobPost;
  } catch (error) {
    console.error('Error fetching job post:', error);
    return null;
  }
};

export const createJobPost = async (jobPost: Omit<JobPost, 'id' | 'client_id' | 'created_at' | 'updated_at' | 'status'>) => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    
    const userId = userData.user?.id;
    if (!userId) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('job_posts')
      .insert({ ...jobPost, client_id: userId, status: 'active' })
      .select()
      .single();
      
    if (error) throw error;
    return data as JobPost;
  } catch (error) {
    console.error('Error creating job post:', error);
    return null;
  }
};

export const updateJobPost = async (id: string, jobPost: Partial<JobPost>) => {
  try {
    const { data, error } = await supabase
      .from('job_posts')
      .update({ ...jobPost, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data as JobPost;
  } catch (error) {
    console.error('Error updating job post:', error);
    return null;
  }
};

export const deleteJobPost = async (id: string) => {
  try {
    const { error } = await supabase
      .from('job_posts')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting job post:', error);
    return false;
  }
};

// Job Proposals Services
export const fetchProposalsForJob = async (jobId: string) => {
  try {
    const { data, error } = await supabase
      .from('job_proposals')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as JobProposal[];
  } catch (error) {
    console.error('Error fetching job proposals:', error);
    return [];
  }
};

export const fetchMyProposals = async () => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    
    const userId = userData.user?.id;
    if (!userId) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('job_proposals')
      .select('*, job_posts(*)')
      .eq('freelancer_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as (JobProposal & { job_posts: JobPost })[];
  } catch (error) {
    console.error('Error fetching my proposals:', error);
    return [];
  }
};

export const createProposal = async (proposal: Omit<JobProposal, 'id' | 'freelancer_id' | 'created_at' | 'updated_at' | 'status'>) => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    
    const userId = userData.user?.id;
    if (!userId) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('job_proposals')
      .insert({ ...proposal, freelancer_id: userId, status: 'pending' })
      .select()
      .single();
      
    if (error) throw error;
    return data as JobProposal;
  } catch (error) {
    console.error('Error creating proposal:', error);
    return null;
  }
};

export const updateProposalStatus = async (id: string, status: 'accepted' | 'rejected') => {
  try {
    const { data, error } = await supabase
      .from('job_proposals')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data as JobProposal;
  } catch (error) {
    console.error('Error updating proposal status:', error);
    return null;
  }
};
