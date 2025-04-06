
export interface JobPost {
  id: string;
  client_id: string;
  title: string;
  description: string;
  budget_min: number | null;
  budget_max: number | null;
  category: string;
  skills: string[];
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface JobProposal {
  id: string;
  job_id: string;
  freelancer_id: string;
  proposal_text: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}
