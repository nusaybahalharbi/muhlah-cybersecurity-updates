import test from 'node:test';
import assert from 'node:assert/strict';
import { initiatives, initiativeById, managementPosition, portfolioCounts, statusTone } from '../data/initiatives.ts';
test('authoritative status and date constraints',()=>{
 assert.equal(initiativeById.manageengine.status,'Completed');
 assert.equal(statusTone(initiativeById.manageengine.status),'green');
 assert.equal(initiativeById.switches.status,'Pending');
 for(const id of ['switches','segmentation','pt','red-team']){assert.equal(initiativeById[id].targetKind,'unconfirmed');}
 for(const id of ['segmentation','pt','red-team']){assert.equal(initiativeById[id].status,'Blocked');assert.equal(statusTone(initiativeById[id].status),'orange');}
 assert.deepEqual(initiativeById.pt.dependencies,['segmentation']);assert.deepEqual(initiativeById['red-team'].dependencies,['segmentation']);
 assert.match(initiativeById.qualys.target,/31 December 2026.*conditional/);assert.notEqual(initiativeById.qualys.status,'Completed');
 assert.match(initiativeById.mdm.target,/31 December 2026.*conditional/);assert.equal(initiativeById.recruitment.status,'Pending');
 assert.equal(initiativeById.architecture.owner,'Cybersecurity Manager');
 assert.match(initiativeById['change-enforcement'].summary,/Every change.*Cybersecurity review and approval/);
 assert.match(initiativeById.dipu.summary,/replaces Tejoury/);
});
test('management position matches the 18 October board update',()=>{
 assert.equal(managementPosition.previousClosed,50);
 assert.equal(managementPosition.completedControls,137);
 assert.equal(managementPosition.additionalClosed,87);
 assert.equal(managementPosition.applicableControls,237);
 assert.equal(managementPosition.remainingControls,100);
 assert.equal(managementPosition.progress,57.8);
 assert.equal(managementPosition.remainingProgress,42.2);
});
test('portfolio has unique records and valid dependency graph',()=>{
 assert.equal(new Set(initiatives.map(i=>i.id)).size,initiatives.length);
 function visit(id,parents=[]){assert.ok(initiativeById[id]);assert.ok(!parents.includes(id),'Dependency cycle');initiativeById[id].dependencies.forEach(dep=>visit(dep,[...parents,id]));}
 initiatives.forEach(i=>visit(i.id));const c=portfolioCounts();assert.equal(c.total,initiatives.length);assert.equal(c.completed,initiatives.filter(i=>i.status==='Completed').length);assert.equal(c.onTrack,initiatives.filter(i=>i.status==='On track').length);
});
