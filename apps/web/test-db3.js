const { Client } = require('pg');

async function run() {
  const url = 'postgresql://postgres.iqllfzqkrdtipsxeunow:cByt6QQdm3fWTTZ1%2E@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres';
  const client = new Client({ connectionString: url });
  try {
    console.log(`Testing URL encoded...`);
    await client.connect();
    console.log(`✅ Successful!`);
    await client.end();
  } catch (err) {
    console.error(`❌ Failed:`, err.message);
  }
}
run();
