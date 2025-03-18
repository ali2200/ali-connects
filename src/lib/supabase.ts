import { createClient } from '@supabase/supabase-js';

// تأكد من أن متغيرات البيئة موجودة وتحتوي على قيم صالحة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// التحقق من وجود الإعدادات المطلوبة
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

// إنشاء عميل Supabase
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Type definitions for our database tables
export type UserRole = 'freelancer' | 'client' | 'lecturer';

export type User = {
  id: string;
  created_at: string;
  email: string;
  role: UserRole;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  skills?: string[];
  location?: string;
  phone?: string;
  website?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
};

export type Course = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  price: number;
  lecturer_id: string;
  image_url: string;
  category: string;
  duration: string;
  lessons: number;
  status: 'draft' | 'published';
  rating?: number;
  enrolled_students?: number;
};

export type Book = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  price: number;
  author_id: string;
  cover_url: string;
  file_url: string;
  category: string;
  pages: number;
  language: string;
  status: 'draft' | 'published';
  rating?: number;
  sales?: number;
};

export type Service = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  price: number;
  freelancer_id: string;
  category: string;
  delivery_time: string;
  status: 'pending' | 'active' | 'rejected';
  rating?: number;
  reviews?: number;
  orders?: number;
};

export type Project = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  client_id: string;
  category: string;
  skills: string[];
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
};

export type Review = {
  id: string;
  created_at: string;
  rating: number;
  content: string;
  user_id: string;
  target_id: string; // Could be service_id, course_id, etc.
  target_type: 'service' | 'course' | 'book' | 'freelancer';
};

export type Payment = {
  id: string;
  created_at: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  user_id: string;
  target_id: string; // Could be service_id, course_id, etc.
  target_type: 'service' | 'course' | 'book';
  reference?: string;
};

// Helper functions for accessing database

// Users
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  return data as User;
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select();
    
  if (error) throw error;
  return data;
};

// Courses
export const getCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('status', 'published');
    
  if (error) throw error;
  return data as Course[];
};

export const getCourseById = async (courseId: string) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*, users!inner(*)')
    .eq('id', courseId)
    .eq('status', 'published')
    .single();
    
  if (error) throw error;
  return data;
};

export const getLecturerCourses = async (lecturerId: string) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('lecturer_id', lecturerId);
    
  if (error) throw error;
  return data as Course[];
};

// Books
export const getBooks = async () => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('status', 'published');
    
  if (error) throw error;
  return data as Book[];
};

export const getBookById = async (bookId: string) => {
  const { data, error } = await supabase
    .from('books')
    .select('*, users!inner(*)')
    .eq('id', bookId)
    .eq('status', 'published')
    .single();
    
  if (error) throw error;
  return data;
};

export const getLecturerBooks = async (lecturerId: string) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('author_id', lecturerId);
    
  if (error) throw error;
  return data as Book[];
};

// Services
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'active');
    
  if (error) throw error;
  return data as Service[];
};

export const getServiceById = async (serviceId: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*, users!inner(*)')
    .eq('id', serviceId)
    .eq('status', 'active')
    .single();
    
  if (error) throw error;
  return data;
};

export const getFreelancerServices = async (freelancerId: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('freelancer_id', freelancerId);
    
  if (error) throw error;
  return data as Service[];
};

// Projects
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'open');
    
  if (error) throw error;
  return data as Project[];
};

export const getProjectById = async (projectId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*, users!inner(*)')
    .eq('id', projectId)
    .single();
    
  if (error) throw error;
  return data;
};

export const getClientProjects = async (clientId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', clientId);
    
  if (error) throw error;
  return data as Project[];
};

// Reviews
export const getReviewsByTarget = async (targetId: string, targetType: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, users(*)')
    .eq('target_id', targetId)
    .eq('target_type', targetType);
    
  if (error) throw error;
  return data;
};

// Payments/Earnings
export const getUserPayments = async (userId: string) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId);
    
  if (error) throw error;
  return data as Payment[];
};

export const getUserEarnings = async (userId: string) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .or(`target_id.in.(select id from services where freelancer_id=${userId}),target_id.in.(select id from courses where lecturer_id=${userId}),target_id.in.(select id from books where author_id=${userId})`);
    
  if (error) throw error;
  return data as Payment[];
};
