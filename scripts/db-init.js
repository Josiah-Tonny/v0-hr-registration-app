require('dotenv').config({path:'.env.local'});
const{Pool}=require('pg');
const{readFileSync}=require('fs');

(async()=>{
  const p=new Pool({connectionString:process.env.DATABASE_URL});
  console.log('📊 Reading SQL...');
  const sql=readFileSync('scripts/init-database.sql','utf-8')
    .replace(/ALTER TABLE .* ENABLE ROW LEVEL SECURITY;/g,'')
    .replace(/CREATE POLICY[^;]*;/g,'')
    .replace(/auth\.uid\(\)/g,'current_user')
    .replace(/auth\.role\(\)/g,'current_user');
  
  const stmts=sql.split(';').filter(s=>s.trim().length>20&&!s.trim().startsWith('--'));
  console.log('Found '+stmts.length+' statements\n');
  
  let ok=0;
  for(const st of stmts){
    try{
      await p.query(st);
      if(st.includes('CREATE TABLE')){
        const m=st.match(/CREATE TABLE.*?(\w+)/);
        if(m)console.log('✅ Created: '+m[1]);
      }
      ok++;
    }catch(e){
      if(!e.message.includes('already exists')&&!e.message.includes('does not exist'))
        console.log('⚠️  '+e.message.substring(0,70));
    }
  }
  
  console.log('\n✅ Executed '+ok+' statements\n');
  
  const r=await p.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
  console.log('📋 Tables ('+r.rows.length+'):');
  r.rows.forEach(t=>console.log('   - '+t.table_name));
  
  await p.end();
  process.exit(0);
})().catch(e=>{console.error('❌ Error:',e.message);process.exit(1)});
