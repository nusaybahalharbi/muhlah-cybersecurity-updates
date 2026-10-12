import { createHash } from "node:crypto";
import controls from "../data/sama-controls.json";
import { isMaturitySelection, type MaturityValues } from "./sama-maturity";

export type Change = { controlId: string; value: number | "NA"; at: string; revision: number };
export type SharedAssessment = { revision: number; values: MaturityValues; updatedAt: string | null; history: Change[]; lastMutation?: string };
export const emptyAssessment: SharedAssessment = { revision: 0, values: {}, updatedAt: null, history: [] };
// A changed source workbook receives a separate assessment, so obsolete overrides cannot mask it.
const fingerprint = createHash("sha256").update(JSON.stringify(controls.map(c=>[c.id,c.sourceMaturity,c.status === "Not Applicable"]))).digest("hex").slice(0,16);
export const assessmentKey = `muhlah:assessment:${fingerprint}`;
const ids = new Set(controls.map(c=>c.id));
export function storageConfigured() { return Boolean((process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) && (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)); }
export async function redis(command: unknown[]) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Shared storage is not configured.");
  const response = await fetch(url, { method:"POST", headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"}, body:JSON.stringify(command), cache:"no-store", signal:AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error("Shared storage is unavailable.");
  const result = await response.json();
  if (result.error) throw new Error("Shared storage rejected the operation.");
  return result.result;
}
export function validateAssessment(raw: unknown): SharedAssessment {
  const d = raw as SharedAssessment;
  if (!d || !Number.isSafeInteger(d.revision) || d.revision < 0 || !d.values || typeof d.values !== "object" || Array.isArray(d.values)) throw new Error("Invalid stored assessment.");
  if (Object.entries(d.values).some(([id,value])=>!ids.has(id)||!isMaturitySelection(value))) throw new Error("Invalid stored maturity.");
  return {...d,history:Array.isArray(d.history)?d.history:[]};
}
export async function readAssessment() {
  const raw = await redis(["GET",assessmentKey]);
  return raw ? validateAssessment(typeof raw === "string" ? JSON.parse(raw) : raw) : emptyAssessment;
}
export function validMutation(body: unknown): body is {id:string;value:number|"NA";revision:number;mutationId:string} {
  const b=body as {id?:string;value?:unknown;revision?:number;mutationId?:string};
  return Boolean(b && typeof b.id==="string" && ids.has(b.id) && isMaturitySelection(b.value) && Number.isSafeInteger(b.revision) && Number(b.revision)>=0 && typeof b.mutationId==="string" && /^[a-zA-Z0-9-]{16,64}$/.test(b.mutationId));
}
export const saveScript = `
local raw = redis.call('GET', KEYS[1])
local d = raw and cjson.decode(raw) or {revision=0,values={},history={}}
if d.lastMutation == ARGV[5] then return {1,cjson.encode(d)} end
if d.revision ~= tonumber(ARGV[1]) then return {0,cjson.encode(d)} end
d.revision = d.revision + 1
d.values[ARGV[2]] = cjson.decode(ARGV[3])
d.updatedAt = ARGV[4]
d.lastMutation = ARGV[5]
table.insert(d.history,1,{controlId=ARGV[2],value=cjson.decode(ARGV[3]),at=ARGV[4],revision=d.revision})
while #d.history > 100 do table.remove(d.history) end
local updated = cjson.encode(d)
redis.call('SET', KEYS[1], updated)
return {1,updated}
`;
