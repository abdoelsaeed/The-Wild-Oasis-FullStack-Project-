import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qqorngcuvfatcjhgwvfn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxb3JuZ2N1dmZhdGNqaGd3dmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzcyODUsImV4cCI6MjA3Nzc1MzI4NX0.TyFM5K9Hc-JM-V5J7RTSPu0oBx4Hj5hr0ga_uwM2aJU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
