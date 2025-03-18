
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

export { supabase };
