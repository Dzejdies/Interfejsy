import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '⚠️ Brak zmiennych środowiskowych Supabase! ' +
        'Uzupełnij .env wartościami z Supabase Dashboard. ' +
        'Fetch danych z bazy będzie niedostępny — używam fallback danych.'
    )
}

export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
