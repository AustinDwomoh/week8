import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://dhszhdlnhfmfmuzedlfu.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
console.log('Supabase Key:', supabaseKey)
export const supabase = createClient(supabaseUrl, supabaseKey)
