import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wbyvcwavyiqdxcbgakve.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXZjd2F2eWlxZHhjYmdha3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODg1NjksImV4cCI6MjA4MDk2NDU2OX0.VMWRqWj7WK0o1yEO3CtG5B72cStrTUwZRnl7UfpMWhE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase connection...\n');

  try {
    // Test basic connection by checking auth
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.log('❌ Connection error:', error.message);
      return false;
    }

    console.log('✅ Successfully connected to Supabase!');
    console.log('   Project URL:', supabaseUrl);
    console.log('   Session:', data.session ? 'Active' : 'No active session (expected)');

    // Check if profiles table exists
    const { error: tableError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (tableError) {
      if (tableError.message.includes('does not exist') || tableError.code === '42P01') {
        console.log('\n⚠️  Tables not created yet. Need to run schema.');
      } else {
        console.log('\n⚠️  Table check error:', tableError.message);
      }
    } else {
      console.log('\n✅ Profiles table exists!');
    }

    return true;
  } catch (err) {
    console.log('❌ Error:', err.message);
    return false;
  }
}

testConnection();
