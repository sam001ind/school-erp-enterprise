const { Client } = require('pg');

async function testConnection() {
  const connectionString = 'postgresql://postgres.iqllfzqkrdtipsxeunow:cByt6QQdm3fWTTZ1.@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres';
  
  const client = new Client({
    connectionString,
  });

  try {
    console.log("Connecting to Supabase PostgreSQL...");
    await client.connect();
    console.log("✅ Successfully connected to Supabase PostgreSQL!");
    
    const res = await client.query('SELECT version()');
    console.log("Database Version:", res.rows[0].version);
    
    await client.end();
  } catch (err) {
    console.error("❌ Connection failed!");
    console.error(err.message);
  }
}

testConnection();
