"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, Database, FileWarning, GitBranch, ShieldCheck } from "lucide-react";
import { useSamaMaturity } from "@/components/useSamaMaturity";
import rawControls from "@/data/sama-controls.json";
import { initiatives, initiativeById } from "@/data/initiatives";
import type { SamaControlRecord } from "@/types";

const controls = rawControls as SamaControlRecord[];
const referenced = controls.filter(control => control.existingEvidence.length > 0).length;
const operational = [initiativeById.manageengine, initiativeById.dlp, initiativeById.netskope];
const decisions = [initiativeById.switches, initiativeById.policies, initiativeById.qualys, initiativeById.mdm, initiativeById.recruitment, initiativeById.architecture];
const monthPlan = [
  {month:"October",focus:"Stabilise the baseline",items:["Confirm switch delivery and installation position with IT","Obtain board policy decision status and retain records","Confirm Qualys compliance document and non-objection path","Resume candidate process after HR returns"],gate:"Management dates and owners confirmed"},
  {month:"November",focus:"Close design and operating gaps",items:["Implement and validate segmentation after switches are ready","Resolve remaining MDM issues with IT","Activate the additional 10 Netskope licences","Collect and validate evidence for recorded ML3 controls"],gate:"Segmentation accepted; evidence owners working"},
  {month:"December",focus:"Assure and close",items:["Run penetration testing and red-team work only after segmentation acceptance","Remediate assurance findings and retain closure evidence","Complete control-owner attestations and evidence review","Issue final ML3 readiness decision and residual-risk exceptions"],gate:"Evidence-backed closure by 31 December"},
];

export default function ExecutiveAssurance(){
  const {summary,data,error,sharedReady}=useSamaMaturity();
  const maturityGaps=summary.ml1+summary.ml2;
  const feasible = initiativeById.switches.targetKind === "unconfirmed" ? "At risk" : "Conditional";
  return <div className="assurance">
    <section className="assurance-hero">
      <div><span>CEO CYBERSECURITY ASSURANCE · 13 OCTOBER 2026</span><h1>Recorded maturity is improving.<br/>Evidence and infrastructure decide readiness.</h1><p>The current workbook and shared assessment are reconciled to 249 controls. Recorded ML3 coverage is a management measure; verified compliance remains unconfirmed until evidence is reviewed.</p><div className="assurance-actions"><Link href="/sama">Open full control register <ArrowRight size={15}/></Link><Link href="/ceo-timeline">View dependency timeline</Link></div></div>
      <aside><div className="assurance-score"><strong>{sharedReady?`${summary.progress}%`:"—"}</strong><span>recorded ML3+</span><small>{summary.ml3plus} of {summary.applicable} applicable</small></div><div className="assurance-verdict"><AlertTriangle/><span><b>31 December outlook</b>{feasible} · switch and evidence dependencies have no confirmed closure dates</span></div></aside>
    </section>

    <section className="assurance-kpis">{[
      ["Authoritative controls",summary.total,"249 unique · reconciled"],["Applicable",summary.applicable,`${summary.notApplicable} N/A excluded`],["Recorded ML3+",summary.ml3plus,"Not yet evidence-verified"],["Maturity gaps",maturityGaps,`${summary.ml1} ML1 · ${summary.ml2} ML2`],["Evidence references",referenced,"Workbook narratives / filenames"],["Verified controls",0,"Evidence files not validated"],["Operational capabilities",operational.length,"Management-reported"],["Open decisions",decisions.length,"CEO / Board / IT / HR"]
    ].map(([label,value,note])=><article key={String(label)}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>

    <section className="assurance-grid">
      <article className="assurance-card"><header><div><span>01 · CONTROL POSITION</span><h2>ML3 readiness funnel</h2></div><ShieldCheck/></header><div className="funnel"><div style={{width:"100%"}}><b>{summary.total}</b>Total controls</div><div style={{width:`${summary.applicable/summary.total*100}%`}}><b>{summary.applicable}</b>Applicable</div><div style={{width:`${summary.ml3plus/summary.total*100}%`}}><b>{summary.ml3plus}</b>Recorded ML3+</div><div className="unverified" style={{width:"22%"}}><b>0</b>Evidence-verified</div></div><p>Recorded maturity and verified compliance are intentionally separate. A maturity selection alone does not prove design, approval, implementation, or operating effectiveness.</p></article>
      <article className="assurance-card"><header><div><span>02 · DATA QUALITY</span><h2>Source and sync health</h2></div><Database/></header><ul className="quality-list"><li><CheckCircle2/><span><b>Control completeness</b>249 unique IDs; no duplicates or omissions detected</span></li><li><CheckCircle2/><span><b>Calculation repaired</b>Stale 33.9% baseline replaced by current workbook plus shared overrides</span></li><li><Clock3/><span><b>Shared register</b>{sharedReady?`Revision ${data?.revision} · ${data?.updatedAt?.slice(0,10)}`:"Unavailable"}</span></li><li className="warn"><FileWarning/><span><b>Historical baseline</b>No reliable June snapshot was supplied; quantitative June change is not asserted</span></li></ul>{error&&<p className="assurance-error">Sync warning: {error}</p>}</article>
    </section>

    <section className="assurance-section"><header><div><span>03 · MISSING REQUIREMENTS</span><h2>What still prevents a verified ML3 conclusion</h2></div><Link href="/sama">Drill into controls <ArrowRight size={14}/></Link></header><div className="requirement-grid">{[
      ["Maturity remediation",`${maturityGaps} controls`,"Close the remaining ML1/ML2 design and implementation gaps."],["Evidence validation",`${summary.applicable} applicable controls`,"Open referenced files, test operating evidence and record reviewer/date."],["Policy governance","Board decision unconfirmed","Approved versions and communication records are required."],["Technical assurance","Segmentation → PT → red team","Switch readiness is the critical path; no test date can be committed."],
    ].map(([title,count,text])=><article key={title}><span>{count}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="assurance-section"><header><div><span>04 · TECHNOLOGY PORTFOLIO</span><h2>Operational, pending and blocked</h2></div><Link href="/portfolio">View delivery register <ArrowRight size={14}/></Link></header><div className="tech-strip">{initiatives.filter(item=>["manageengine","dlp","netskope","qualys","mdm","switches","segmentation","pt","red-team"].includes(item.id)).map(item=><article key={item.id}><div><span>{item.category}</span><b className={`assurance-status ${item.status.toLowerCase().replaceAll(" ","-")}`}>{item.status}</b></div><h3>{item.name}</h3><p>{item.summary}</p><small>{item.target}</small></article>)}</div></section>

    <section className="assurance-grid">
      <article className="assurance-card"><header><div><span>05 · SINCE JUNE</span><h2>Transformation record</h2></div><Clock3/></header><div className="achievement-list"><p><b>Reported complete</b><span>ManageEngine implementation; DLP implementation</span></p><p><b>Operational</b><span>Netskope existing deployment; 10 additional licences await activation confirmation</span></p><p><b>Progressing</b><span>MDM issue resolution; recruitment with two leading candidates</span></p><p><b>Evidence limitation</b><span>No dated June assessment snapshot or validated completion packs were supplied</span></p></div></article>
      <article className="assurance-card critical-path"><header><div><span>06 · CRITICAL PATH</span><h2>Infrastructure before assurance</h2></div><GitBranch/></header><div><b>Switch confirmation</b><ArrowRight/><b>Segmentation</b><ArrowRight/><b>Penetration test</b><ArrowRight/><b>Red team</b></div><p>Switch delivery and installation remain unconfirmed. Segmentation cannot be accepted before the hardware dependency is resolved, and assurance testing cannot start before segmentation acceptance.</p></article>
    </section>

    <section className="assurance-section"><header><div><span>07 · DECEMBER ROADMAP</span><h2>Month-by-month closure plan</h2></div><span className="assurance-deadline">Deadline · 31 Dec 2026</span></header><div className="month-grid">{monthPlan.map((m,index)=><article key={m.month}><span>0{index+1}</span><h3>{m.month}</h3><strong>{m.focus}</strong><ul>{m.items.map(x=><li key={x}>{x}</li>)}</ul><small>Exit gate · {m.gate}</small></article>)}</div></section>

    <section className="assurance-section"><header><div><span>08 · EXECUTIVE DECISIONS</span><h2>Actions leadership must unlock</h2></div></header><div className="decision-list">{decisions.map((item,index)=><article key={item.id}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{item.name}</h3><p>{item.nextAction}</p></div><b>{item.owner}</b><small>{item.target}</small></article>)}</div></section>
  </div>
}
