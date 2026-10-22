"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, CreditCard, Laptop, Scale, Settings2 } from "lucide-react";
import { InitiativeDetail, PageHeading, StatusBadge } from "@/components/Portfolio";
import { initiativeById, type Initiative } from "@/data/initiatives";

const weeklyHighlights = [
  {label:"OPERATIONS",title:"ManageEngine operational",icon:Settings2,summary:"ManageEngine is operational across Muhlah. MDM implementation has reached 70% and continues.",detail:"Operating coverage and MDM enrolment evidence remain part of the ongoing validation work."},
  {label:"COMPLETED WORK",title:"RBAC and JML delivered",icon:CheckCircle2,summary:"Muhlah’s Role-Based Access Control structure and the Joiner, Mover and Leaver workflow are reported complete. The change-management process has also been created.",detail:"The change process still requires formal approval and evidence that the Cybersecurity approval gate operates before implementation."},
  {label:"EQUIPMENT",title:"Asset-label printer ordered",icon:Laptop,summary:"A printer has been ordered for asset labelling. A dedicated cross-cut shredder is required for the Cybersecurity office.",detail:"The purchases remain dependent on Infrastructure action. Asset labelling closes only after deployment and inventory reconciliation."},
  {label:"LICENSING",title:"Payment and device join actions",icon:CreditCard,summary:"The additional Netskope licences await payment processing. Windows licensing is provided through users’ Microsoft 365 Business Premium subscriptions.",detail:"Some devices appear as Microsoft Entra Registered instead of Hybrid Joined. Microsoft follow-up is in progress to identify and resolve the cause."},
  {label:"GOVERNANCE & STAFFING",title:"Compliance and HR actions pending",icon:Scale,summary:"The Qualys non-objection request awaits Compliance submission. Remaining documents were sent to Compliance for board approval. HR expects recruitment to begin next week.",detail:"Submission, approval and recruitment outcomes are not yet complete and require retained evidence."},
] as const;

const openActionIds = ["mdm","asset-labels","office-shredder","netskope-licenses","windows-activation","qualys","document-approvals","change-process","change-enforcement","recruitment","switches","segmentation","pt","red-team","ddos-exercise"];

const bestCaseTimeline = [
  {period:"NOW → 31 OCT",title:"Release the dependencies",items:["Infrastructure processes purchases and Netskope payment","Compliance submits the Qualys non-objection request","HR starts DFIR recruitment","Microsoft investigation confirms the Entra join remediation"]},
  {period:"NOVEMBER",title:"Complete implementation",items:["Finish the remaining 30% of MDM","Resolve affected device Hybrid Join status","Receive equipment and start asset labelling","Complete switch readiness and accept network segmentation"]},
  {period:"1 → 20 DEC",title:"Approve and assure",items:["Complete remaining document and change-process approvals","Enforce the Cybersecurity approval gate","Run authorised penetration testing and red-team work","Remediate findings and collect operating evidence"]},
  {period:"BY 31 DEC",title:"Final validation",items:["Complete recruitment and outstanding equipment actions","Reconcile reported closures to individual controls","Independently validate evidence","Issue the final ML3 readiness decision"]},
] as const;

export default function WeeklyProgress(){
  const [selected,setSelected]=useState<Initiative|null>(null);
  const [scope,setScope]=useState<"This week"|"Open actions"|"Best-case timeline">("This week");
  return <>
    <PageHeading eyebrow="WEEKLY CYBERSECURITY REPORT" title="Operations advanced. Dependencies moved to action." description="Week ending 22 October 2026. Confirmed delivery is separated from approvals, payments, procurement and evidence still in progress."/>
    <section className="weekly-hero"><div><span className="p-eyebrow">EXECUTIVE UPDATE</span><h2>ManageEngine is operational.<br/>MDM is 70% complete.</h2><p>RBAC, the change-management process and the JML workflow have been created or completed. Infrastructure, Compliance, Microsoft, HR and Board actions now determine the remaining delivery pace.</p></div><div className="weekly-score"><strong>70%</strong><span>MDM implementation</span><small>Implementation continues · completion and effectiveness evidence pending</small></div></section>
    <div className="weekly-kpis">{[["ManageEngine","Operational","Across Muhlah"],["MDM","70%","Implementation continues"],["Netskope licences","Payment","Processing pending"],["Qualys","Submission","Awaiting Compliance"]].map(([label,value,note])=><article key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</div>
    <div className="p-tabs"><button aria-pressed={scope==="This week"} onClick={()=>setScope("This week")}>This week</button><button aria-pressed={scope==="Open actions"} onClick={()=>setScope("Open actions")}>Open actions</button><button aria-pressed={scope==="Best-case timeline"} onClick={()=>setScope("Best-case timeline")}>Timeline to 31 December</button></div>

    {scope==="This week"&&<>
      <div className="weekly-story-grid">{weeklyHighlights.map(({label,title,icon:Icon,summary,detail})=><article key={title}><div className="weekly-story-icon"><Icon size={19}/></div><span>{label}</span><h2>{title}</h2><p>{summary}</p><small>{detail}</small></article>)}</div>
      <section className="weekly-capabilities"><header><div><span className="p-eyebrow">CONFIRMED THIS WEEK</span><h2>Delivery and procurement position</h2></div></header><div>{["ManageEngine operational","RBAC created","JML complete","Change process created","Asset-label printer ordered"].map(item=><span key={item}><i/>{item}</span>)}</div><p>“Created” does not mean formally approved or proven operational. Approval, workflow enforcement and evidence validation remain tracked separately.</p></section>
    </>}

    {scope==="Open actions"&&<div className="p-update-list">{openActionIds.map(id=>initiativeById[id]).map(item=><article key={item.id}><div className="p-update-date"><span>{item.targetKind==="target"?"TARGET":"OPEN"}</span><small>2026</small></div><div><div className="p-update-title"><h2>{item.name}</h2><StatusBadge item={item}/></div><p>{item.update}</p><small>{item.owner} · {item.classification} · {item.target}</small><div className="p-update-next"><b>NEXT ACTION</b>{item.nextAction}</div></div><button aria-label={`Open ${item.name}`} onClick={()=>setSelected(item)}><ArrowUpRight size={18}/></button></article>)}</div>}

    {scope==="Best-case timeline"&&<section className="weekly-timeline"><header><span className="p-eyebrow">OPTIMISTIC DELIVERY SCENARIO</span><h2>Everything closes by 31 December—if every dependency moves on time.</h2><p>This is a best-case management timeline. Any delay in approvals, payments, procurement, infrastructure, provider responses, recruitment, testing or remediation moves the final date.</p></header><div>{bestCaseTimeline.map((phase,index)=><article key={phase.period}><span>{String(index+1).padStart(2,"0")}</span><div><small>{phase.period}</small><h3>{phase.title}</h3><ul>{phase.items.map(item=><li key={item}>{item}</li>)}</ul></div>{index<bestCaseTimeline.length-1&&<ArrowRight/>}</article>)}</div><footer><b>CONDITIONAL OUTCOME · 31 DECEMBER 2026</b><span>All implementation, approval, testing, remediation and evidence-validation gates complete.</span></footer></section>}

    <p className="p-footnote">Reporting cut-off: 22 October 2026. Status is management-reported and remains subject to evidence validation.</p>
    {selected&&<InitiativeDetail item={selected} onClose={()=>setSelected(null)}/>} 
  </>;
}
