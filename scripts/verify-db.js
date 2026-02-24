require('dotenv').config({path:'.env.local'});
const{Pool}=require('pg');

(async()=>{
  const p=new Pool({connectionString:process.env.DATABASE_URL});
  console.log('🧪 Testing database...\n');
  
  const t=await p.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
  console.log('✅ Tables ('+t.rows.length+'):');
  t.rows.forEach(r=>console.log('   - '+r.table_name));
  
  const d=await p.query('SELECT COUNT(*) FROM departments');
  console.log('\n✅ Departments: '+d.rows[0].count+' records');
  
  const r=await p.query('SELECT COUNT(*) FROM employee_roles');
  console.log('✅ Roles: '+r.rows[0].count+' records');
  
  const s=await p.query('SELECT COUNT(*) FROM employee_statuses');
  console.log('✅ Statuses: '+s.rows[0].count+' records');
  
  const f=await p.query('SELECT COUNT(*) FROM faculties');
  console.log('✅ Faculties: '+f.rows[0].count+' records');
  
  console.log('\n🎉 Database is fully operational!');
  
  await p.end();
  process.exit(0);
})().catch(e=>{console.error('❌ Error:',e.message);process.exit(1)});
