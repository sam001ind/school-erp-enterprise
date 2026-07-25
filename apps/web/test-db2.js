const { Client } = require('pg');

async function testConnection(url, name) {
  const client = new Client({ connectionString: url });
  try {
    console.log(`Testing ${name}...`);
    await client.connect();
    console.log(`✅ ${name} Successful!`);
    await client.end();
  } catch (err) {
    console.error(`❌ ${name} Failed:`, err.message);
  }
}

async function run() {
  await testConnection('postgresql://postgres.iqllfzqkrdtipsxeunow:cByt6QQdm3fWTTZ1.@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true', 'Pooler (6543)');
  await testConnection('postgresql://postgres:cByt6QQdm3fWTTZ1.@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres', 'Direct (5432 without project ref)');
}
run();
