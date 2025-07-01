import { createClient } from '@supabase/supabase-js'

// ✅ استدعاء من متغيرات البيئة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!
const adminKey = import.meta.env.VITE_ADMIN_SECRET || 'YOUNES_SECRET'

// ✅ إعداد الاتصال مع Supabase + تمرير الهيدر المخصص للمشرف
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    headers: {
      'x-admin-key': adminKey,
    },
  },
})
