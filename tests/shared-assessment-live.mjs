// Explicit live acceptance test. Temporarily changes one control, then restores it.
// Set TEST_BASE_URL and SAMA_TEST_PIN in the process environment; no secrets are logged.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
const base=process.env.TEST_BASE_URL;
if(!base || !process.env.SAMA_TEST_PIN) throw new Error('Test URL and editor PIN required');
const source=JSON.parse(await readFile(new URL('../data/sama-controls.json',import.meta.url),'utf8'));
const row=source.find(c=>c.id==='3.1.1-6');
const get=async()=>{const r=await fetch(`${base}/api/assessment`,{cache:'no-store'});assert.equal(r.status,200);return r.json();};
const before=await get();
const auth=await fetch(`${base}/api/sama-auth`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pin:process.env.SAMA_TEST_PIN})});
assert.equal(auth.status,200,'Editor authentication');
const cookie=auth.headers.get('set-cookie').split(';')[0];
const patch=(data,session=cookie)=>fetch(`${base}/api/assessment`,{method:'PATCH',headers:{'Content-Type':'application/json',...(session?{Cookie:session}:{}),Origin:base},body:JSON.stringify(data)});
const original=before.values[row.id]??(row.status==='Not Applicable'?'NA':row.sourceMaturity??1);
const value=original===3?2:3;
const mutation={id:row.id,value,revision:before.revision,mutationId:randomUUID()};
assert.equal((await patch(mutation,'')).status,401,'Unauthenticated writes rejected');
assert.equal((await patch({...mutation,id:'not-a-control'})).status,400,'Invalid controls rejected');
let changed=false;
try {
 const save=await patch(mutation);assert.equal(save.status,200);changed=true;const saved=await save.json();
 assert.equal(saved.values[row.id],value);
 const independent=await get();assert.equal(independent.revision,saved.revision);assert.equal(independent.values[row.id],value,'Independent viewer session reads saved value');
 const retry=await patch(mutation);assert.equal(retry.status,200);assert.equal((await retry.json()).revision,saved.revision,'Idempotent retry');
 const conflict=await patch({...mutation,value:original,mutationId:randomUUID()});assert.equal(conflict.status,409,'Stale revisions cannot overwrite');
 const refresh=await get();assert.equal(refresh.values[row.id],value,'Refresh persists the saved value');
 console.log('PASS: authenticated save, independent-session read, refresh persistence, validation, idempotency and stale-write protection.');
} finally {
 if(changed){const latest=await get();if(latest.values[row.id]!==value)throw new Error('Concurrent edit detected; test will not overwrite it.');const restore=await patch({id:row.id,value:original,revision:latest.revision,mutationId:randomUUID()});assert.equal(restore.status,200,'Restore original maturity');assert.equal((await get()).values[row.id],original);console.log('PASS: original control maturity restored and independently verified.');}
 await fetch(`${base}/api/sama-auth`,{method:'DELETE',headers:{Cookie:cookie}});
}
