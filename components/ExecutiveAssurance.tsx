"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, Database, FileCheck2, FileWarning, GitBranch, ShieldCheck } from "lucide-react";
import { useSamaMaturity } from "@/components/useSamaMaturity";
import { initiativeById, managementPosition } from "@/data/initiatives";

const previousBaseline = [
  ["Risk-management process","Established"], ["Change Advisory Board","Reported operational"],
  ["Policies / standards","26 reported developed"], ["Asset inventory and visitor register","Established"],
] as const;
const capabilities = ["m365","dlp","manageengine","netskope","bitraser","dipu","asset-discovery","knowbe4","assessment-dashboard"];
const technologyActions = ["switches","segmentation","qualys","mdm","netskope-licenses","windows-activation"];
const confirmations = ["email-backup","zoho","data-classification","grc-scope","asset-labels"];
const validationGaps = [
  ["3.3.14-4.g","Network packet analysis","Validate NPA/NDR capability and coverage"],
  ["3.3.15-4.a–d","Incident-response readiness","Validate team, training, forensic support and restricted workspace"],
  ["3.1.7.1","Role-based training","Validate training for Cybersecurity, IT and risk responsibilities"],
  ["3.1.6-7","Customer awareness","Validate customer-facing awareness separately from KnowBe4"],
  ["3.3.6-1–4","Secure application development","Validate approved standards, secure SDLC, monitoring and effectiveness"],
  ["3.3.8","Infrastructure assurance","Validate configurations, coverage, reviews and recovery evidence"],
  ["3.3.9 / 3.3.10","Encryption and BYOD","Validate compliance monitoring and effectiveness reviews"],
  ["3.3.16-2","Threat intelligence","Validate periodic effectiveness measurement"],
  ["3.4.1-3 / 3.4.3-2","Vendor and cloud governance","Validate control effectiveness and cloud-compliance monitoring"],
  ["3.3.11-2–6","Secure disposal","Validate DIPU certificates, BitRaser records and effectiveness checks"],
  ["3.1.1-8","Cybersecurity leadership","Reconcile the historical senior CISO appointment entry"],
] as const;

export default function ExecutiveAssurance(){
  const {summary,data,error,sharedReady}=useSamaMaturity();
  const historicalDataQuality = {records:249, missingTargets:168, missingEvidence:53};
  return <div className="assurance">
    <section className="assurance-hero">
      <div><span>CEO CYBERSECURITY ASSURANCE · 18 OCTOBER 2026</span><h1>Progress is clear.<br/>Evidence decides ML3.</h1><p>Management reports 137 of 237 applicable controls closed. These closures remain pending independent evidence validation and are kept separate from maturity selections and verified compliance.</p><div className="assurance-actions"><Link href="/sama">Open control register <ArrowRight size={15}/></Link><Link href="/ceo-timeline">View dependency timeline</Link></div></div>
      <aside><div className="assurance-score"><strong>{managementPosition.progress}%</strong><span>management-reported closures</span><small>{managementPosition.completedControls} closed · {managementPosition.remainingControls} remaining</small></div><div className="assurance-verdict"><AlertTriangle/><span><b>ML3 target · 31 December 2026</b>Conditional on timely delivery, approvals, testing and evidence validation.</span></div></aside>
    </section>

    <section className="assurance-kpis">{[
      ["Previous update",managementPosition.previousClosed,"29 June 2026"],
      ["Current update",managementPosition.completedControls,"18 October 2026"],
      ["Added closures",`+${managementPosition.additionalClosed}`,"June–October period"],
      ["Applicable",managementPosition.applicableControls,"Management denominator"],
      ["Remaining",managementPosition.remainingControls,`${managementPosition.remainingProgress}%`],
      ["Independently verified",0,"Not yet recorded"],
      ["Detailed register",summary.total,"Separate source"],
      ["Register ML3+",summary.ml3plus,"Requires reconciliation"],
    ].map(([label,value,note])=><article key={String(label)}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>

    <section className="assurance-grid">
      <article className="assurance-card"><header><div><span>01 · BOARD COMPARISON</span><h2>50 reported closed → 137 reported closed</h2></div><ShieldCheck/></header><div className="comparison-bars"><div><span>29 JUN 2026</span><i style={{width:`${managementPosition.previousClosed/managementPosition.applicableControls*100}%`}}/><b>{managementPosition.previousClosed}</b></div><div><span>18 OCT 2026</span><i style={{width:`${managementPosition.progress}%`}}/><b>{managementPosition.completedControls}</b></div></div><p>Progress is 87 additional management-reported closures between the two actual meeting dates. Individual controls are not marked closed until the detailed register is reconciled.</p></article>
      <article className="assurance-card"><header><div><span>02 · SOURCE SEPARATION</span><h2>Three measures, three meanings</h2></div><Database/></header><ul className="quality-list"><li><CheckCircle2/><span><b>Management-reported closure</b>137 of 237 · 57.8%</span></li><li className="warn"><FileWarning/><span><b>Recorded maturity</b>{summary.ml3plus} ML3+ selections in the {summary.total}-row register</span></li><li className="warn"><FileWarning/><span><b>Independently verified compliance</b>0 recorded until evidence is reviewed</span></li><li><Clock3/><span><b>Shared register</b>{sharedReady?`Revision ${data?.revision} · ${data?.updatedAt?.slice(0,10)}`:"Unavailable"}</span></li></ul>{error&&<p className="assurance-error">Sync warning: {error}</p>}</article>
    </section>

    <section className="assurance-section"><header><div><span>03 · PREVIOUS BASELINE</span><h2>Already reported at the 29 June meeting</h2></div><span className="assurance-deadline">Not October achievements</span></header><div className="requirement-grid">{previousBaseline.map(([title,status])=><article key={title}><span>PREVIOUS BASELINE</span><h3>{title}</h3><p>{status}</p></article>)}</div></section>

    <section className="assurance-section"><header><div><span>04 · CURRENT CAPABILITIES</span><h2>Confirmed delivery and operation</h2></div><Link href="/portfolio">View portfolio <ArrowRight size={14}/></Link></header><div className="tech-strip">{capabilities.map(id=>{const item=initiativeById[id];return <article key={id}><div><span>{item.classification}</span><b className="assurance-status completed">{item.status}</b></div><h3>{item.name}</h3><p>{item.summary}</p><small>{item.evidenceRef}</small></article>})}</div><p className="p-footnote">A product or provider does not close every associated SAMA control. Operating evidence and effectiveness review remain required.</p></section>

    <section className="assurance-grid">
      <article className="assurance-card"><header><div><span>05 · DOCUMENT INVENTORY</span><h2>54 current documents</h2></div><FileCheck2/></header><div className="doc-summary"><strong>32</strong><span>policies and standards</span><div><b>26</b> policies</div><div><b>6</b> standards</div><div><b>13</b> processes / procedures</div><div><b>9</b> other documents</div></div><p>Previous board position: 26 policies/standards reported. Current folder inventory: 32 combined. The inventory does not identify six specific newly developed policies.</p></article>
      <article className="assurance-card"><header><div><span>06 · APPROVAL STATUS</span><h2>29 labelled approved · 25 pending</h2></div><FileWarning/></header><div className="approval-split"><div><strong>29</strong><span>Approved By Board</span><small>24 policies · 1 process · 4 other</small></div><div><strong>25</strong><span>Yet To Be Approved</span><small>2 policies · 6 standards · 12 processes · 5 other</small></div></div><p>Folder classification is the source of status. Signatures have not been independently validated.</p></article>
    </section>

    <section className="assurance-section"><header><div><span>07 · SIX TECHNOLOGY ACTIONS</span><h2>Track as workstreams, not six controls</h2></div></header><div className="tech-strip">{technologyActions.map(id=>{const item=initiativeById[id];return <article key={id}><div><span>{item.owner}</span><b className={`assurance-status ${item.status.toLowerCase().replaceAll(" ","-")}`}>{item.status}</b></div><h3>{item.name}</h3><p>{item.nextAction}</p><small>{item.target}</small></article>})}</div></section>

    <section className="assurance-section change-mandate"><header><div><span>08 · MANAGEMENT REQUIREMENT</span><h2>Enforce change management</h2></div><GitBranch/></header><blockquote>Every change to Muhlah systems must go through Cybersecurity review and approval in the change-management workflow before implementation.</blockquote><p>The Change Management Policy is labelled approved. Change Management Process v1.1 remains in “Yet To Be Approved.” The earlier CAB report does not prove universal workflow enforcement.</p><div className="critical-flow"><b>Approve process</b><ArrowRight/><b>Configure mandatory Cybersecurity gate</b><ArrowRight/><b>Collect change samples</b><ArrowRight/><b>Validate operation</b></div></section>

    <section className="assurance-grid">
      <article className="assurance-card"><header><div><span>09 · ARCHITECTURE & PEOPLE</span><h2>Capacity still in progress</h2></div><Clock3/></header><div className="achievement-list"><p><b>Architecture</b><span>In progress · Cybersecurity Manager · alignment objective, not a compliance claim</span></p><p><b>DFIR recruitment</b><span>Digital Forensics and Incident Response specialist · pending</span></p><p><b>Target</b><span>31 December 2026 · conditional on approvals, delivery and evidence</span></p></div></article>
      <article className="assurance-card"><header><div><span>10 · NEEDS CONFIRMATION</span><h2>Do not treat as confirmed deficiencies</h2></div><FileWarning/></header><div className="achievement-list">{confirmations.map(id=><p key={id}><b>{initiativeById[id].name}</b><span>{initiativeById[id].nextAction}</span></p>)}</div></article>
    </section>

    <section className="assurance-section"><header><div><span>11 · SECURITY TESTS & EXERCISES</span><h2>Authorise, execute, remediate, validate</h2></div></header><div className="tech-strip">{["pt","red-team","ddos-exercise"].map(id=>{const item=initiativeById[id];return <article key={id}><div><span>{item.owner}</span><b className={`assurance-status ${item.status.toLowerCase().replaceAll(" ","-")}`}>{item.status}</b></div><h3>{item.name}</h3><p>{item.summary}</p><small>{item.evidenceRef}</small></article>})}</div><p className="p-footnote">Oracle’s published cloud testing policy prohibits DoS attacks and simulations against Oracle Cloud Services. Confirm a provider-permitted approach before technical DDoS testing. <a href="https://www.oracle.com/corporate/security-practices/testing/cloud/" target="_blank" rel="noreferrer">Oracle Cloud Security Testing Policy</a>.</p></section>

    <section className="assurance-section"><header><div><span>12 · CSF ITEMS TO VALIDATE</span><h2>Older findings requiring current evidence</h2></div><span className="assurance-deadline">Not automatically current gaps</span></header><div className="validation-grid">{validationGaps.map(([ref,title,action])=><article key={ref}><span>{ref}</span><h3>{title}</h3><p>{action}</p><small>Current evidence reference · unconfirmed</small></article>)}</div></section>

    <section className="assurance-grid">
      <article className="assurance-card"><header><div><span>13 · HISTORICAL DATA QUALITY</span><h2>Recalculate before reuse</h2></div><Database/></header><div className="doc-summary"><strong>{historicalDataQuality.records}</strong><span>historical control records</span><div><b>{historicalDataQuality.missingTargets}</b> missing target dates</div><div><b>{historicalDataQuality.missingEvidence}</b> missing evidence references</div></div><p>The older snapshot also had blank Current Status and Action Plan fields. These are historical findings, not current executive metrics.</p></article>
      <article className="assurance-card critical-path"><header><div><span>14 · ML3 DEPENDENCY</span><h2>Evidence-backed closure sequence</h2></div><GitBranch/></header><div><b>Switches</b><ArrowRight/><b>Segmentation acceptance</b><ArrowRight/><b>PT / red team</b><ArrowRight/><b>Remediation</b><ArrowRight/><b>Evidence validation</b><ArrowRight/><b>Final assessment</b></div><p>Document approvals, architecture, DFIR recruitment and change-management enforcement run alongside this sequence.</p></article>
    </section>

    <section className="assurance-section"><header><div><span>15 · CONDITIONAL TARGET</span><h2>ML3 target · 31 December 2026</h2></div><span className="assurance-deadline">Conditional · not guaranteed</span></header><div className="month-grid"><article><span>01</span><h3>Deliver</h3><strong>Infrastructure and technology</strong><ul><li>Confirm switches and activate licences</li><li>Complete segmentation, Qualys, MDM and Windows activation</li><li>Complete architecture and recruitment actions</li></ul><small>Gate · delivery evidence accepted</small></article><article><span>02</span><h3>Approve & enforce</h3><strong>Governance</strong><ul><li>Approve 25 pending documents</li><li>Approve the change process</li><li>Enforce Cybersecurity approval in workflow</li></ul><small>Gate · approvals and operating samples retained</small></article><article><span>03</span><h3>Assure</h3><strong>Testing and evidence</strong><ul><li>Perform authorised tests</li><li>Remediate and close findings</li><li>Validate evidence and reconcile 137 controls</li></ul><small>Gate · independent final ML3 assessment</small></article></div></section>
  </div>;
}
