require('dotenv').config({path:'.env.local'});
const{Pool}=require('pg');
const{readFileSync}=require('fs');

(async()=>{
  const p=new Pool({connectionString:process.env.DATABASE_URL});
  console.log('📊 Reading SQL...\n');
  
  let sql=readFileSync('scripts/init-database.sql','utf-8');
  
  // Remove RLS and auth stuff
  sql=sql.replace(/ALTER TABLE .* ENABLE ROW LEVEL SECURITY;/g,'');
  sql=sql.replace(/CREATE POLICY[\s\S]*?;/g,'');  
  sql=sql.replace(/auth\.uid\(\)/g,'current_user');
  sql=sql.replace(/auth\.role\(\)/g,'current_user');
  
  // Better statement splitting
  const stmts=[];
  let current='';
  for(const line of sql.split('\n')){
    if(line.trim().startsWith('--'))continue;
    current+=line+'\n';
    if(line.trim().endsWith(';')){
      if(current.trim().length>20){
        stmts.push(current.trim());
      }
      current='';
    }
  }
  
  console.log('Found '+stmts.length+' SQL statements\n');
  
  let ok=0, skip=0;
  for(const stmt of stmts){
    try{
      await p.query(stmt);
      if(stmt.includes('CREATE TABLE')){
        const m=stmt.match(/CREATE TABLE.*?(\w+)/);
        if(m)console.log('✅ Table: '+m[1]);
      }else if(stmt.includes('INSERT INTO')){
        const m=stmt.match(/INSERT INTO (\w+)/);
        if(m)console.log('📝 Data: '+m[1]);
      }
      ok++;
    }catch(e){
      if(e.message.includes('already exists')){
        skip++;
      }else{
        console.log('⚠️  '+e.message.substring(0,80));
      }
    }
  }
  
  console.log('\n✅ Result: '+ok+' executed, '+skip+' skipped\n');
  
  const r=await p.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
  if(r.rows.length>0){
    console.log('📋 Tables created ('+r.rows.length+'):');
    r.rows.forEach(t=>console.log('   ✓ '+t.table_name));
  }else{
    console.log('❌ No tables found!');
  }
  
  await p.end();
  process.exit(0);
})().catch(e=>{console.error('❌ Error:',e);process.exit(1)});
