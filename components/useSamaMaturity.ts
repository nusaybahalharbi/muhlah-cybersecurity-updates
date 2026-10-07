"use client";

import { useMemo, useSyncExternalStore } from "react";
import controls from "@/data/sama-controls.json";
import type { SamaControlRecord } from "@/types";
import { applyMaturity, resolveMaturity, summarizeMaturity, type MaturitySelection } from "@/lib/sama-maturity";

const records = controls as SamaControlRecord[];

// Scope browser overrides to the exact workbook-backed maturity dataset.
// When a newly imported assessment changes any control maturity/applicability,
// the key changes and stale browser selections can no longer mask the new source.
function datasetVersion(rows: readonly SamaControlRecord[]) {
  const source = rows
    .map(control => `${control.id}:${control.status === "Not Applicable" ? "NA" : control.sourceMaturity ?? "U"}`)
    .join("|");

  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

const storageKey = `muhlah-sama-maturity-v2-${datasetVersion(records)}`;
const changeEvent = "sama-maturity-change";

function getSnapshot() {
  try { return window.localStorage.getItem(storageKey); } catch { return null; }
}
function getServerSnapshot() { return null; }
function subscribe(notify: () => void) {
  const storageChanged = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) notify();
  };
  window.addEventListener(changeEvent, notify);
  window.addEventListener("storage", storageChanged);
  return () => {
    window.removeEventListener(changeEvent, notify);
    window.removeEventListener("storage", storageChanged);
  };
}

function saveMaturity(id: string, value: MaturitySelection) {
  // Read at write time so editing another tab does not overwrite its latest selections.
  const next = { ...resolveMaturity(records, getSnapshot()), [id]: value };
  window.localStorage.setItem(storageKey, JSON.stringify(next));
  window.dispatchEvent(new Event(changeEvent));
}

export function useSamaMaturity() {
  const serialized = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const maturity = useMemo(() => resolveMaturity(records, serialized), [serialized]);
  const summary = useMemo(() => summarizeMaturity(records, maturity), [maturity]);
  const assessedControls = useMemo(() => applyMaturity(records, maturity), [maturity]);
  return { maturity, summary, saveMaturity, assessedControls };
}
