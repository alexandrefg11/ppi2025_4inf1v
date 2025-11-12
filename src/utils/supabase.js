import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL="https://kckjxkixljbqbuapbuxf.supabase.co",
    import.meta.env.VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtja2p4a2l4bGpicWJ1YXBidXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MzQyMjksImV4cCI6MjA3MzExMDIyOX0.y2tg_grXnKXWH4H6umP3xAJChr-EneK1nT544toqyB8",
);