import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://ouzbfyvjobrfqicnlase.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91emJmeXZqb2JyZnFpY25sYXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM1NDY0MTQsImV4cCI6MTk2OTEyMjQxNH0.IbsjkjB4mQMeM_sOUNfL0uGAq0xTQqKidI1SbdQ4ek8');

export {supabase}