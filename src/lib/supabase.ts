
import { createClient } from '@supabase/supabase-js';

// محاولة الحصول على متغيرات البيئة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// التحقق من وجود المتغيرات قبل إنشاء العميل
let supabase;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  // إنشاء عميل وهمي لتجنب الأخطاء
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ error: new Error('Supabase not configured') }),
      signIn: () => Promise.resolve({ error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ error: new Error('Supabase not configured') }),
    },
    from: () => ({
      select: () => ({ data: null, error: new Error('Supabase not configured') }),
      insert: () => ({ data: null, error: new Error('Supabase not configured') }),
      update: () => ({ data: null, error: new Error('Supabase not configured') }),
      delete: () => ({ data: null, error: new Error('Supabase not configured') }),
    }),
  };
}

// Function to get a course by ID
export const getCourseById = async (id: string) => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('Using mock data for getCourseById');
      // Return null to allow the component to fallback to mock data
      return null;
    }

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching course:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in getCourseById:', error);
    return null;
  }
};

// Function to get a service by ID
export const getServiceById = async (id: string) => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('Using mock data for getServiceById');
      // Return null to allow the component to fallback to mock data
      return null;
    }

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching service:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in getServiceById:', error);
    return null;
  }
};

// Function to get reviews by target (course or service)
export const getReviewsByTarget = async (targetId: string, targetType: 'course' | 'service') => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('Using mock data for getReviewsByTarget');
      // Return null to allow the component to fallback to mock data
      return null;
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('target_id', targetId)
      .eq('target_type', targetType);

    if (error) {
      console.error('Error fetching reviews:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in getReviewsByTarget:', error);
    return null;
  }
};

export { supabase };
