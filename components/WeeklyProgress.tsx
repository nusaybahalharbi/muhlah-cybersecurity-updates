"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, FileCheck2, GitBranch, SearchCheck, ShieldCheck } from "lucide-react";
import { InitiativeDetail, PageHeading, StatusBadge } from "@/components/Portfolio";
import { initiativeById, managementPosition, type Initiative } from "@/data/initiatives";

const weeklyHighlights = [
  {
    label:"ASSESSMENT & REPORTING", title:"Management position reconciled", icon:ShieldCheck,
    summary:"The executive dashboard now reflects 137 of 237 applicable controls reported closed: 57.8%, with 100 controls remaining.",
    detail:"The 137 closures remain pending control-level reconciliation and independent evidence validation. Recorded maturity and verified compliance remain separate measures."
  },
  {
    label:"DOCUMENT GOVERNANCE", title:"Latest inventory reviewed", icon:FileCheck2,
    summary:"The current folder contains 54 documents: 26 policies, 6 standards, 13 processes or procedures, and 9 other documents.",
    detail:"Twenty-nine are labelled “Approved By Board” and 25 are labelled “Yet To Be Approved.” Folder status was recorded; signatures were not independently validated."
  },
  {
    label:"APPLICATION ASSURANCE", title:"Stitch evidence reviewed", icon:SearchCheck,
    summary:"The supplied Stitch mobile application evidence was reviewed against the ML3 evidence request, with 17 observations prepared for follow-up.",
    detail:"The response requests visible timestamps, stronger traceability and separation of duties. The person who creates a change must not approve the same change."
  },
  {
    label:"CONTROL GOVERNANCE", title:"Change approval requirement elevated", icon:GitBranch,
    summary:"Management reporting now makes the Cybersecurity approval gate explicit for every system change before implementation.",
    detail:"The policy is labelled approved. Change Management Process v1.1 still requires approval, and operating samples are needed to prove that the workflow is enforced."
  },
] as const;

const openActionIds = ["switches","segmentation","qualys","mdm","netskope-licenses","windows-activation","document-approvals","change-process","change-enforcement","architecture","recruitment","pt","red-team","ddos-exercise"];

export default function WeeklyProgress(){
  const [selected,setSelected]=useState<Initiative|null>(null);
  const [scope,setScope]=useState<"This week"|"Open actions">("This week");
  return <>
    <PageHeading eyebrow="WEEKLY CYBERSECURITY REPORT" title="Evidence moved forward. Dependencies are now clear." description="Week ending 22 October 2026. Confirmed delivery, evidence-review work and management actions are separated from open dependencies and unverified compliance."/>

    <section className="weekly-hero"><div><span className="p-eyebrow">WEEK AT A GLANCE</span><h2>One management view.<br/>No hidden assumptions.</h2><p>The board position, document inventory, application evidence review and critical delivery dependencies are now presented through the same evidence-led reporting model.</p></div><div className="weekly-score"><strong>{managementPosition.progress}%</strong><span>management-reported closure</span><small>{managementPosition.completedControls} closed · {managementPosition.remainingControls} remaining · evidence validation pending</small></div></section>

    <div className="weekly-kpis">{[
      ["Reported closed",managementPosition.completedControls,"of 237 applicable"],
      ["Added since June",`+${managementPosition.additionalClosed}`,"management-reported"],
      ["Documents",54,"29 approved · 25 pending"],
      ["Stitch observations",17,"evidence follow-up"],
    ].map(([label,value,note])=><article key={String(label)}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</div>

    <div className="p-tabs"><button aria-pressed={scope==="This week"} onClick={()=>setScope("This week")}>This week</button><button aria-pressed={scope==="Open actions"} onClick={()=>setScope("Open actions")}>Open actions</button></div>

    {scope==="This week"?<>
      <div className="weekly-story-grid">{weeklyHighlights.map(({label,title,icon:Icon,summary,detail})=><article key={title}><div className="weekly-story-icon"><Icon size={19}/></div><span>{label}</span><h2>{title}</h2><p>{summary}</p><small>{detail}</small></article>)}</div>
      <section className="weekly-capabilities"><header><div><span className="p-eyebrow">CURRENT CAPABILITIES CONFIRMED IN REPORTING</span><h2>Operational position retained</h2></div></header><div>{["Microsoft 365","DLP","ManageEngine","Netskope","BitRaser","DIPU disposal","Asset discovery","KnowBe4","Assessment dashboard"].map(item=><span key={item}><i/>{item}</span>)}</div><p>Capability availability does not by itself close every related SAMA control. Operating evidence and effectiveness review remain required.</p></section>
      <section className="weekly-next"><div><span>IMMEDIATE DEPENDENCY</span><h2>Switches must move first</h2><p>Switch delivery and installation must be confirmed before segmentation can be accepted. Penetration testing and red-team activity follow segmentation, then remediation and evidence validation.</p></div><div className="weekly-flow"><b>Switches</b><ArrowRight/><b>Segmentation</b><ArrowRight/><b>PT / red team</b><ArrowRight/><b>Evidence</b></div></section>
    </>:<div className="p-update-list">{openActionIds.map(id=>initiativeById[id]).map(item=><article key={item.id}><div className="p-update-date"><span>{item.targetKind==="target"?"TARGET":"OPEN"}</span><small>2026</small></div><div><div className="p-update-title"><h2>{item.name}</h2><StatusBadge item={item}/></div><p>{item.update}</p><small>{item.owner} · {item.classification} · {item.target}</small><div className="p-update-next"><b>NEXT ACTION</b>{item.nextAction}</div></div><button aria-label={`Open ${item.name}`} onClick={()=>setSelected(item)}><ArrowUpRight size={18}/></button></article>)}</div>}

    <p className="p-footnote">Reporting cut-off: 22 October 2026. Programme status is based on management updates and the 18 October board source; compliance remains subject to evidence review.</p>
    {selected&&<InitiativeDetail item={selected} onClose={()=>setSelected(null)}/>} 
  </>;
}
