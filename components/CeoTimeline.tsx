"use client";

import { useState } from "react";
import { ArrowRight, GitBranch, Printer } from "lucide-react";
import { PageHeading, StatusBadge, InitiativeDetail } from "@/components/Portfolio";
import { initiativeById, initiatives, managementPosition, type Initiative } from "@/data/initiatives";

const lanes = [
  { title:"Critical infrastructure chain", caption:"Sequence confirmed · delivery dates remain unconfirmed", ids:["switches","segmentation","pt","red-team"] },
  { title:"Governance gates", caption:"Approvals and operating evidence required", ids:["document-approvals","change-process","change-enforcement"] },
  { title:"Technology actions", caption:"Conditional target · 31 December 2026", ids:["qualys","mdm","netskope-licenses","windows-activation"] },
  { title:"Capacity and confirmation", caption:"Open ownership, evidence or delivery questions", ids:["architecture","recruitment","email-backup","zoho","data-classification","grc-scope","asset-labels"] },
  { title:"Current capabilities", caption:"Management-confirmed or documented delivery · effectiveness evidence still required", ids:["m365","dlp","manageengine","netskope","bitraser","dipu","asset-discovery","knowbe4","assessment-dashboard"] },
] as const;

export default function CeoTimeline(){
  const [selected,setSelected]=useState<Initiative|null>(null);
  const [critical,setCritical]=useState(false);
  return <>
    <PageHeading eyebrow="CEO DELIVERY ROADMAP" title="What moves next. What must move first." description="A dependency timeline grounded in confirmed status. Targets are labelled as conditional, and unconfirmed dates remain unconfirmed."/>
    <section className="p-roadmap-intro"><div><span className="p-eyebrow">CONDITIONAL DELIVERY HORIZON</span><h2>ML3 target<br/>31 December 2026</h2><p>The target depends on timely infrastructure delivery, document approvals, workflow enforcement, authorised testing, remediation and independent evidence validation. It is not a guarantee of achievement.</p></div><aside><strong>{managementPosition.progress}<span>%</span></strong><p>{managementPosition.completedControls} of {managementPosition.applicableControls} applicable controls are management-reported closed; {managementPosition.remainingControls} remain.</p><button onClick={()=>window.print()}><Printer size={15}/> Print CEO brief</button></aside></section>

    <section className="p-chain"><header><GitBranch size={18}/><div><h2>The critical dependency chain</h2><p>Each stage must produce accepted evidence before the next assurance stage can close.</p></div></header><div className="p-chain-layout"><button onClick={()=>setSelected(initiativeById.switches)}><span>01 · DELIVER</span><strong>Network switches</strong><StatusBadge item={initiativeById.switches}/></button><ArrowRight/><button onClick={()=>setSelected(initiativeById.segmentation)}><span>02 · ACCEPT</span><strong>Network segmentation</strong><StatusBadge item={initiativeById.segmentation}/></button><ArrowRight/><div>{["pt","red-team"].map(id=><button key={id} onClick={()=>setSelected(initiativeById[id])}><strong>{initiativeById[id].name}</strong><StatusBadge item={initiativeById[id]}/></button>)}</div></div><div className="p-chain-tail"><b>Remediate findings</b><ArrowRight/><b>Validate evidence</b><ArrowRight/><b>Final ML3 assessment</b></div><p className="p-callout">Immediate dependency: IT must confirm switch delivery and installation. Security testing remains blocked until segmentation is implemented and formally accepted.</p></section>

    <div className="p-section-head"><div><span className="p-eyebrow">SEQUENCING & EVIDENCE</span><h2>Executive delivery lanes</h2></div><button className="p-secondary" aria-pressed={critical} onClick={()=>setCritical(!critical)}>{critical?"Show all workstreams":"Show critical chain only"}</button></div>
    <div className="p-roadmap-lanes">{lanes.filter((_,index)=>!critical||index===0).map(lane=><section key={lane.title}><header><h3>{lane.title}</h3><p>{lane.caption}</p></header><div>{lane.ids.map(id=>{const item=initiativeById[id];return <button key={id} className="p-roadmap-item" onClick={()=>setSelected(item)}><div><strong>{item.name}</strong><StatusBadge item={item}/></div><span>{item.target}</span><small>{item.owner} · {item.classification}</small></button>})}</div></section>)}</div>
    <p className="p-footnote">{initiatives.length} shared initiative records · status date 18 October 2026. Management-reported closure, maturity selection and independent verification remain separate measures.</p>
    {selected&&<InitiativeDetail item={selected} onClose={()=>setSelected(null)}/>} 
  </>;
}
