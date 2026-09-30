"use client";

import { useMemo, useSyncExternalStore } from "react";
import controls from "@/data/sama-controls.json";
import type { SamaControlRecord } from "@/types";
import { resolveMaturity, summarizeMaturity, type MaturitySelection } from "@/lib/sama-maturity";

const records = controls as SamaControlRecord[];
const storageKey = "muhlah-sama-maturity-v1";
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
  return { maturity, summary, saveMaturity };
}
