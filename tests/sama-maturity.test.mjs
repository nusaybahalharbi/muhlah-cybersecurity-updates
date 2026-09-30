import test from 'node:test';
import assert from 'node:assert/strict';
import { applyMaturity, maturityAssessmentStatus, resolveMaturity, summarizeMaturity } from '../lib/sama-maturity.ts';

const controls = [
  { id: 'a', sourceMaturity: 2, status: 'In Progress' },
  { id: 'b', sourceMaturity: 3, status: 'In Progress' },
  { id: 'c', sourceMaturity: null, status: 'Not Applicable' },
];

test('status follows selected maturity rather than the workbook status', () => {
  assert.equal(maturityAssessmentStatus(1), 'Not Started');
  assert.equal(maturityAssessmentStatus(2), 'In Progress');
  for (const level of [3, 4, 5]) assert.equal(maturityAssessmentStatus(level), 'Completed');
  assert.equal(maturityAssessmentStatus('NA'), 'Not Applicable');
  const result = applyMaturity(controls, { a: 3, b: 2, c: 'NA' });
  assert.equal(result[0].status, 'Completed');
  assert.equal(result[0].completion, 100);
  assert.equal(result[1].status, 'In Progress');
  assert.equal(result[1].completion, 0);
  assert.equal(result[2].applicability, 'Not Applicable');
  assert.equal(controls[0].status, 'In Progress');
});

test('saved ML3 selections change the progress and survive reloading', () => {
  const baseline = resolveMaturity(controls, null);
  assert.equal(summarizeMaturity(controls, baseline).progress, 50);
  const saved = JSON.stringify({ ...baseline, a: 3 });
  const restored = resolveMaturity(controls, saved);
  assert.equal(summarizeMaturity(controls, restored).progress, 100);
  assert.equal(summarizeMaturity(controls, restored).notApplicable, 1);
});

test('ML4 and ML5 count toward ML3 coverage; N/A is excluded', () => {
  const values = resolveMaturity(controls, JSON.stringify({ a: 4, b: 5 }));
  const result = summarizeMaturity(controls, values);
  assert.equal(result.ml3plus, 2);
  assert.equal(result.applicable, 2);
  assert.equal(result.progress, 100);
  assert.equal(summarizeMaturity(controls, { a: 'NA', b: 'NA', c: 'NA' }).progress, 0);
});

test('a one-control improvement remains visible in a 249-control assessment', () => {
  const rows = Array.from({ length: 249 }, (_, id) => ({ id: String(id), sourceMaturity: 2, status: 'In Progress' }));
  const values = resolveMaturity(rows, null);
  values['0'] = 3;
  assert.equal(summarizeMaturity(rows, values).progress, 0.4);
});

test('invalid stored data falls back to the workbook without losing valid overrides', () => {
  const defaults = resolveMaturity(controls, null);
  for (const invalid of ['{', 'null', '[]', '42']) assert.deepEqual(resolveMaturity(controls, invalid), defaults);
  const result = resolveMaturity(controls, '{"a":5,"b":99,"c":false,"unknown":3}');
  assert.deepEqual(result, { a: 5, b: 3, c: 'NA' });
});
