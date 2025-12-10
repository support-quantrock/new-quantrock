import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wbyvcwavyiqdxcbgakve.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXZjd2F2eWlxZHhjYmdha3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODg1NjksImV4cCI6MjA4MDk2NDU2OX0.VMWRqWj7WK0o1yEO3CtG5B72cStrTUwZRnl7UfpMWhE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testWebinarTable() {
  console.log('Testing webinar_registrations table...\n');

  // Check if table exists
  const { data, error } = await supabase
    .from('webinar_registrations')
    .select('*')
    .limit(1);

  if (error) {
    console.log('❌ Error:', error.message);
    console.log('   Code:', error.code);
    console.log('\n⚠️  The webinar_registrations table may not exist.');
    console.log('   Please run the SQL schema in Supabase SQL Editor.');
    return;
  }

  console.log('✅ webinar_registrations table exists!');
  console.log('   Current records:', data?.length || 0);

  // Try inserting a test record
  console.log('\nTesting insert...');
  const { data: insertData, error: insertError } = await supabase
    .from('webinar_registrations')
    .insert({
      name: 'Test User',
      email: 'test@example.com',
      mobile: '+971501234567',
      webinar_id: 'test'
    })
    .select();

  if (insertError) {
    console.log('❌ Insert error:', insertError.message);
    console.log('   Code:', insertError.code);
  } else {
    console.log('✅ Insert successful!');
    console.log('   Inserted:', insertData);

    // Clean up test record
    if (insertData && insertData[0]) {
      await supabase
        .from('webinar_registrations')
        .delete()
        .eq('id', insertData[0].id);
      console.log('   Test record cleaned up.');
    }
  }
}

testWebinarTable();
