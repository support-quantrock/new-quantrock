import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wbyvcwavyiqdxcbgakve.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXZjd2F2eWlxZHhjYmdha3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODg1NjksImV4cCI6MjA4MDk2NDU2OX0.VMWRqWj7WK0o1yEO3CtG5B72cStrTUwZRnl7UfpMWhE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testProfiles() {
  console.log('Testing profiles table...\n');

  // Check profiles table
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*');

  if (profilesError) {
    console.log('❌ Profiles error:', profilesError.message);
  } else {
    console.log('✅ Profiles table accessible');
    console.log('   Total profiles:', profiles?.length || 0);
    if (profiles && profiles.length > 0) {
      console.log('   Sample profile:', JSON.stringify(profiles[0], null, 2));
    }
  }

  // Check auth users (won't work with anon key, but let's try)
  const { data: authData, error: authError } = await supabase.auth.getSession();
  console.log('\nAuth session:', authData?.session ? 'Active' : 'None');

  // Test profile insert
  console.log('\nTesting profile insert (will fail without auth)...');
  const { error: insertError } = await supabase
    .from('profiles')
    .insert({
      id: '00000000-0000-0000-0000-000000000000',
      full_name: 'Test',
      referral_code: 'TEST123'
    });

  if (insertError) {
    console.log('❌ Insert error (expected):', insertError.message);
  }
}

testProfiles();
