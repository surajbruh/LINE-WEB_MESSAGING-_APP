import "dotenv/config"
import { createClient } from '@supabase/supabase-js'


const URL = process.env.SUPABASE_URL
const ANON_KEY = process.env.SUPABASE_ANON_KEY

const supabase = createClient("https://yyfbonepvqejejtjpsdj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZmJvbmVwdnFlamVqdGpwc2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NzA2NTQsImV4cCI6MjA3MzQ0NjY1NH0.9frKkCDMf2UFlRyv-YN3I9T_dS_-NkeeENnHW4pnNNA")

export default supabase
