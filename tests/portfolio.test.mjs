import test from 'node:test';
import assert from 'node:assert/strict';
import { initiatives, initiativeById, portfolioCounts, statusTone } from '../data/initiatives.ts';
test('authoritative status and date constraints',()=>{
 assert.equal(initiativeById.manageengine.status,'Completed');
 assert.equal(statusTone(initiativeById.manageengine.status),'green');
 for(const id of ['switches','segmentation','pt','red-team']){assert.equal(initiativeById[id].status,'Blocked');assert.equal(initiativeById[id].targetKind,'unconfirmed');assert.equal(statusTone(initiativeById[id].status),'orange');}
 assert.deepEqual(initiativeById.pt.dependencies,['segmentation']);assert.deepEqual(initiativeById['red-team'].dependencies,['segmentation']);
 assert.match(initiativeById.qualys.target,/2026/);assert.notEqual(initiativeById.qualys.status,'Completed');
 assert.match(initiativeById.mdm.target,/Q4 2026.*feasibility/);assert.equal(initiativeById.recruitment.status,'On hold');
 assert.match(initiativeById.architecture.summary,/November 2027/);
});
test('portfolio has unique records and valid dependency graph',()=>{
 assert.equal(new Set(initiatives.map(i=>i.id)).size,initiatives.length);
 function visit(id,parents=[]){assert.ok(initiativeById[id]);assert.ok(!parents.includes(id),'Dependency cycle');initiativeById[id].dependencies.forEach(dep=>visit(dep,[...parents,id]));}
 initiatives.forEach(i=>visit(i.id));const c=portfolioCounts();assert.equal(c.total,initiatives.length);assert.equal(c.completed,initiatives.filter(i=>i.status==='Completed').length);assert.equal(c.onTrack,initiatives.filter(i=>i.status==='On track').length);
});

