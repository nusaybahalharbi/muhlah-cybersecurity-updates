"use client";
import { useMemo, useSyncExternalStore } from "react";
import records from "@/data/sama-controls.json";
import type { SamaControlRecord } from "@/types";
import { applyMaturity, resolveMaturity, summarizeMaturity, type MaturitySelection } from "@/lib/sama-maturity";
import type { SharedAssessment } from "@/lib/shared-store";

type Snapshot = {data:SharedAssessment|null;loading:boolean;saving:boolean;error:string;message:string};
const initial: Snapshot = {data:null,loading:true,saving:false,error:"",message:""};
let state=initial;
const listeners=new Set<()=>void>();
let timer:ReturnType<typeof setInterval>|undefined;
let pendingRead:Promise<void>|null=null;
function emit(update:Partial<Snapshot>) { state={...state,...update};listeners.forEach(fn=>fn()); }
export async function refreshAssessment() {
  if(state.saving) return;
  if(pendingRead) return pendingRead;
  pendingRead=(async()=>{
    try { const r=await fetch("/api/assessment",{cache:"no-store"}); const d=await r.json(); if(!r.ok) throw new Error(d.error||"Unable to load shared assessment.");
      if(!state.data || d.revision>=state.data.revision) emit({data:d,loading:false,error:""});
    } catch(e) {emit({loading:false,error:e instanceof Error?e.message:"Shared assessment unavailable."});}
  })().finally(()=>{pendingRead=null;});
  return pendingRead;
}
function subscribe(listener:()=>void) {
  listeners.add(listener);
  if(listeners.size===1) {void refreshAssessment();timer=setInterval(()=>{if(document.visibilityState==="visible")void refreshAssessment();},15000);window.addEventListener("focus",refreshAssessment);}
  return ()=>{listeners.delete(listener);if(!listeners.size){clearInterval(timer);window.removeEventListener("focus",refreshAssessment);}};
}
async function saveMaturity(id:string,value:MaturitySelection) {
  if(state.saving || !state.data) throw new Error("Wait for the shared assessment to load or finish saving.");
  const revision=state.data.revision;
  emit({saving:true,error:"",message:"Saving to shared assessment…"});
  try {
    const r=await fetch("/api/assessment",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,value,revision,mutationId:crypto.randomUUID()})});
    const d=await r.json();
    if(!r.ok) {if(d.assessment) emit({data:d.assessment});throw new Error(d.error||"Save failed.");}
    emit({data:d,message:"Saved for all viewers",error:""});
  } catch(e) {emit({error:e instanceof Error?e.message:"Save failed. Refresh before retrying.",message:""});throw e;}
  finally {emit({saving:false});}
}
export function useSamaMaturity() {
  const snapshot=useSyncExternalStore(subscribe,()=>state,()=>initial);
  const maturity=useMemo(()=>resolveMaturity(records as SamaControlRecord[],snapshot.data?JSON.stringify(snapshot.data.values):null),[snapshot.data]);
  const summary=useMemo(()=>summarizeMaturity(records,maturity),[maturity]);
  const assessedControls=useMemo(()=>applyMaturity(records as SamaControlRecord[],maturity),[maturity]);
  return {maturity,summary,assessedControls,saveMaturity,...snapshot,refresh:refreshAssessment,sharedReady:Boolean(snapshot.data)};
}
