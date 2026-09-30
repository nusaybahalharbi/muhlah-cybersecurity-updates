import type { SamaControlRecord } from "../types";

export type MaturitySelection = 1 | 2 | 3 | 4 | 5 | "NA";
export type MaturityValues = Record<string, MaturitySelection>;
type Control = Pick<SamaControlRecord, "id" | "sourceMaturity" | "status">;

export function isMaturitySelection(value: unknown): value is MaturitySelection {
  return value === "NA" || (typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5);
}

export function resolveMaturity(controls: readonly Control[], serialized: string | null): MaturityValues {
  let saved: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(serialized ?? "{}");
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) saved = parsed as Record<string, unknown>;
  } catch { /* An invalid stored value must not break the assessment. */ }
  return Object.fromEntries(controls.map(control => {
    const fallback = control.status === "Not Applicable" ? "NA" : isMaturitySelection(control.sourceMaturity) ? control.sourceMaturity : 1;
    return [control.id, isMaturitySelection(saved[control.id]) ? saved[control.id] : fallback];
  })) as MaturityValues;
}

export function summarizeMaturity(controls: readonly Pick<Control, "id">[], values: MaturityValues) {
  const count = (level: MaturitySelection) => controls.filter(control => values[control.id] === level).length;
  const notApplicable = count("NA");
  const applicable = controls.length - notApplicable;
  const ml3plus = controls.filter(control => typeof values[control.id] === "number" && Number(values[control.id]) >= 3).length;
  const progress = applicable ? Math.round(ml3plus / applicable * 1000) / 10 : 0;
  return { total: controls.length, applicable, notApplicable, ml3plus, progress, ml1: count(1), ml2: count(2), ml3: count(3), ml4: count(4), ml5: count(5) };
}
