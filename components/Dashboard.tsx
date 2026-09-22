"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, BadgeCheck, Building2, Check, ChevronDown, CircleAlert, FileCheck2, Menu, ShieldCheck, Users, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import samaControls from "@/data/sama-controls.json";
import { managementActions, solutions, vendors } from "@/data/dashboard";
import type { SamaControlRecord } from "@/types";
import { SamaControls } from "@/components/SamaCompliance";

const controls = samaControls as SamaControlRecord[];
const tabs = ["Executive overview", "SAMA & ML3", "Third-party risk", "Governance", "Capability & people"] as const;
type Tab = (typeof tabs)[number];

const statusMeta: Record<string, { label: string; className: string }> = {
  Completed: { label: "Closed", className: "good" },
  "Partially Completed": { label: "In progress", className: "progress" },
  "In Progress": { label: "In progress", className: "progress" },
  "Pending Approval": { label: "Pending approval", className: "attention" },
  "On Hold": { label: "On hold", className: "neutral" },
  "Blocked / Waiting for Approval": { label: "Dependency / approval", className: "watch" },
  "Not Started": { label: "Remaining", className: "neutral" },
  "Requires Evidence / Verification": { label: "Evidence required", className: "attention" },
};

function StatusPill({ status }: { status: string }) {
  const meta = statusMeta[status] ?? { label: status, className: "neutral" };
  return <span className={`status-pill ${meta.className}`}><i />{meta.label}</span>;
}

function ProgressBar({ value, tone = "primary" }: { value: number; tone?: "primary" | "good" | "attention" }) {
  return <div className={`progress-track ${tone}`}><span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <header className="section-heading"><div><span>{eyebrow}</span><h2>{title}</h2></div><p>{copy}</p></header>;
}

function MetricCard({ label, value, detail, accent }: { label: string; value: string; detail: string; accent?: string }) {
  return <article className={`metric-card ${accent ?? ""}`}><div><span>{label}</span><ArrowUpRight size={17}/></div><strong>{value}</strong><p>{detail}</p></article>;
}

function ExecutiveHeader({ active, onChange, onMenu }: { active: Tab; onChange: (tab: Tab) => void; onMenu: () => void }) {
  return <>
    <div className="confidential-bar"><span>CONFIDENTIAL · INTERNAL MUHLAH CYBERSECURITY USE ONLY</span><span>Reporting date · 22 SEP 2026</span></div>
    <header className="executive-header">
      <button className="mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20}/></button>
      <div className="brand"><span className="brand-mark">M</span><div><strong>Muhlah</strong><small>Cybersecurity Progress &amp; Compliance</small></div></div>
      <nav>{tabs.map(tab => <button key={tab} className={active === tab ? "active" : ""} onClick={() => onChange(tab)}>{tab}</button>)}</nav>
      <div className="live-state"><i/><span><b>Production active</b><small>HTTP 200</small></span></div>
    </header>
  </>;
}

function MobileNav({ open, active, onChange, onClose }: { open: boolean; active: Tab; onChange: (tab: Tab) => void; onClose: () => void }) {
  if (!open) return null;
  return <div className="mobile-nav-backdrop" onClick={onClose}><aside onClick={event => event.stopPropagation()}><header><strong>Dashboard views</strong><button onClick={onClose}><X size={18}/></button></header>{tabs.map(tab => <button key={tab} className={active === tab ? "active" : ""} onClick={() => { onChange(tab); onClose(); }}>{tab}</button>)}</aside></div>;
}

function Overview({ onChange }: { onChange: (tab: Tab) => void }) {
  const closed = controls.filter(control => control.sourceStatus.toLowerCase().includes("closed")).length;
  const inProgress = controls.filter(control => [2,3].includes(control.sourceMaturity ?? 0)).length;
  const remaining = controls.filter(control => control.sourceMaturity === 1).length;
  return <main>
    <section className="executive-hero">
      <div className="hero-copy"><span className="overline">EXECUTIVE GOVERNANCE REPORT</span><h1>Cybersecurity readiness,<br/>made decision-ready.</h1><p>A concise view of Muhlah&apos;s SAMA CSF alignment, maturity trajectory, governance priorities and assurance evidence.</p><div className="hero-tags"><span><ShieldCheck size={15}/>SAMA CSF aligned</span><span><Building2 size={15}/>Saudi fintech</span><span><FileCheck2 size={15}/>Evidence-led reporting</span></div></div>
      <div className="hero-progress"><div className="hero-progress-head"><span>Overall assessment progress</span><b>30%</b></div><ProgressBar value={30}/><div className="hero-progress-meta"><div><strong>ML3</strong><span>Target maturity</span></div><div><strong>80</strong><span>Controls recorded ML3</span></div><div><strong>249</strong><span>Controls tracked</span></div></div><button onClick={() => onChange("SAMA & ML3")}>Review SAMA position <ArrowUpRight size={16}/></button></div>
    </section>
    <section className="metric-grid"><MetricCard label="SAMA assessment" value="30%" detail="Overall assessment activity · target ML3" accent="primary"/><MetricCard label="Awareness coverage" value="100%" detail="All employees completed KnowBe4" accent="good"/><MetricCard label="Control workstream" value={`${inProgress}`} detail={`${closed} confirmed closed · ${remaining} recorded ML1`} accent="blue"/><MetricCard label="Management decisions" value={`${managementActions.length}`} detail="Approval, dependency or ownership items" accent="attention"/></section>
    <section className="executive-grid">
      <article className="card maturity-summary"><div className="card-title"><div><span>SAMA CSF READINESS</span><h2>Path to Maturity Level 3</h2></div><button onClick={() => onChange("SAMA & ML3")}><ArrowUpRight size={18}/></button></div><div className="ml-layout"><div className="ml-ring"><div><span>ML</span><strong>3</strong><small>Target</small></div></div><div className="ml-copy"><strong>Assessment is 30% progressed</strong><p>Progress represents evidence-weighted assessment activity, not a regulatory certification or confirmed maturity rating.</p><ProgressBar value={30}/><div><span>Current validated maturity</span><b>Needs verification</b></div></div></div><div className="gap-callouts"><span><i/>Architecture governance &amp; HLD/LLD</span><span><i/>Vulnerability management approval &amp; evidence</span><span><i/>BCM/DR operating evidence</span></div></article>
      <article className="card decision-card"><div className="card-title"><div><span>LEADERSHIP FOCUS</span><h2>Management attention &amp; dependencies</h2></div><b>{managementActions.length}</b></div><div className="decision-list">{managementActions.slice(0,4).map((item, index) => <div key={item.issue}><span className="decision-index">0{index + 1}</span><div><strong>{item.issue}</strong><p>{item.decision}</p></div><StatusPill status={item.status}/></div>)}</div></article>
    </section>
    <section className="signal-grid"><article className="signal-card"><span className="signal-icon good"><Users/></span><div><small>HUMAN RISK</small><h3>Awareness complete</h3><p>KnowBe4 training completed by all employees. Completion evidence remains part of the audit trail.</p></div><strong>100%</strong></article><article className="signal-card"><span className="signal-icon blue"><ShieldCheck/></span><div><small>PROJECT GOVERNANCE</small><h3>Lifecycle risk assurance</h3><p>Internal and external cybersecurity assessments tracked at project initiation and closure.</p></div><StatusPill status="In Progress"/></article><article className="signal-card"><span className="signal-icon neutral"><BadgeCheck/></span><div><small>SYSTEM ASSURANCE</small><h3>Production &amp; source aligned</h3><p>Live production response verified. GitHub includes the latest assessment updates.</p></div><span className="sync-detail"><b>HTTP 200</b><small>9e259b2 · 89943d6</small></span></article></section>
  </main>;
}

function SamaView() {
  const domains = useMemo(() => {
    const grouped = new Map<string, SamaControlRecord[]>();
    controls.forEach(control => grouped.set(control.domain, [...(grouped.get(control.domain) ?? []), control]));
    return [...grouped].map(([name, rows]) => { const applicable = rows.filter(row => row.sourceMaturity !== null); const ml3 = rows.filter(row => row.sourceMaturity === 3).length; return { name: name.replace("Cyber Security", "Cybersecurity"), total: rows.length, closed: rows.filter(row => row.sourceStatus.toLowerCase().includes("closed")).length, progress: rows.filter(row => [2,3].includes(row.sourceMaturity ?? 0)).length, remaining: rows.filter(row => row.sourceMaturity === 1).length, notApplicable: rows.filter(row => row.sourceMaturity === null).length, ml3, score: applicable.length ? Math.round((ml3 / applicable.length) * 100) : 0 }; });
  }, []);
  const statusData = [
    { name: "Recorded ML3", value: controls.filter(c => c.sourceMaturity === 3).length, color: "#21836f" },
    { name: "Recorded ML2", value: controls.filter(c => c.sourceMaturity === 2).length, color: "#2777c7" },
    { name: "Recorded ML1", value: controls.filter(c => c.sourceMaturity === 1).length, color: "#d69f43" },
    { name: "Not applicable", value: controls.filter(c => c.sourceMaturity === null).length, color: "#8d99a6" },
  ];
  return <main>
    <SectionHeading eyebrow="SAMA CSF & ML3" title="Maturity and compliance trajectory" copy="All 249 controls from the supplied SAMA self-assessment workbook. Recorded maturity is shown separately from validated closure."/>
    <section className="sama-topline"><article><span>Assessment progress</span><strong>30%</strong><ProgressBar value={30}/><small>Management assessment progress; not a certification result</small></article><article><span>Target maturity</span><strong>ML3</strong><p>80 of 236 applicable controls are recorded at ML3 in the workbook (34%).</p></article><article><span>Workbook coverage</span><strong>249</strong><p>80 ML3 · 137 ML2 · 19 ML1 · 13 not applicable.</p></article></section>
    <section className="executive-grid sama-charts"><article className="card"><div className="card-title"><div><span>DOMAIN READINESS</span><h2>Assessment progress by domain</h2></div></div><div className="chart-container"><ResponsiveContainer width="100%" height="100%"><BarChart data={domains} layout="vertical" margin={{ left: 8, right: 22 }}><CartesianGrid stroke="#e8edf2" horizontal={false}/><XAxis type="number" domain={[0,100]} tickFormatter={value => `${value}%`} axisLine={false} tickLine={false} fontSize={11}/><YAxis type="category" dataKey="name" width={160} axisLine={false} tickLine={false} fontSize={11}/><Tooltip formatter={(value) => `${value}%`} cursor={{fill:"#f5f8fa"}}/><Bar dataKey="score" fill="#173b57" radius={[0,5,5,0]} barSize={20}/></BarChart></ResponsiveContainer></div></article><article className="card"><div className="card-title"><div><span>CONTROL POSITION</span><h2>Assessment distribution</h2></div></div><div className="donut-layout"><ResponsiveContainer width={210} height={210}><PieChart><Pie data={statusData} dataKey="value" innerRadius={66} outerRadius={90} paddingAngle={2}>{statusData.map(item => <Cell key={item.name} fill={item.color}/>)}</Pie></PieChart></ResponsiveContainer><div className="chart-legend">{statusData.map(item => <div key={item.name}><i style={{background:item.color}}/><span>{item.name}</span><b>{item.value}</b></div>)}</div></div></article></section>
    <section className="card domain-table"><div className="card-title"><div><span>DOMAIN DETAIL</span><h2>SAMA CSF domain position</h2></div></div><div className="table-scroll"><table><thead><tr><th>Domain</th><th>Total controls</th><th>Confirmed closed</th><th>ML2 / ML3</th><th>ML1 remaining</th><th>ML3 coverage</th></tr></thead><tbody>{domains.map(domain => <tr key={domain.name}><td><strong>{domain.name}</strong></td><td>{domain.total}</td><td>{domain.closed}</td><td>{domain.progress}</td><td>{domain.remaining}</td><td><div className="table-progress"><ProgressBar value={domain.score}/><b>{domain.score}%</b></div></td></tr>)}</tbody></table></div></section>
    <section className="ml3-gaps"><SectionHeading eyebrow="PRIORITY GAPS" title="What remains to reach ML3" copy="The largest governance and assurance themes requiring closure, approval, or validated operating evidence."/><div>{[["01","Architecture governance","Approve HLD/LLD, target-state architecture and recurring governance."],["02","Vulnerability management","Complete NOC dependency, formalise cadence and evidence remediation closure."],["03","Resilience assurance","Complete BIA, BCP, recovery objectives and tested DR evidence."],["04","Evidence completeness","Link approved artefacts and operating records to every applicable control."]].map(gap => <article key={gap[0]}><span>{gap[0]}</span><h3>{gap[1]}</h3><p>{gap[2]}</p></article>)}</div></section>
    <details className="control-disclosure"><summary>Open detailed SAMA control register <ChevronDown size={17}/></summary><div><SamaControls/></div></details>
  </main>;
}

function VendorView() {
  const assessed = vendors.filter(v => ["Completed", "Operational"].includes(v.assessment)).length;
  const pending = vendors.length - assessed;
  return <main><SectionHeading eyebrow="THIRD-PARTY ASSURANCE" title="Vendor risk and dependency oversight" copy="Executive visibility into criticality, assessment status, assurance documentation and outstanding remediation."/><section className="metric-grid vendor-metrics"><MetricCard label="Providers tracked" value={`${vendors.length}`} detail="Critical technology and service relationships"/><MetricCard label="Assessment complete" value={`${assessed}`} detail="Based on current validated vendor records" accent="good"/><MetricCard label="Pending / in progress" value={`${pending}`} detail="Assessment or evidence work remains" accent="attention"/><MetricCard label="Open findings" value="Needs review" detail="Ratings not fabricated without owner validation" accent="blue"/></section><section className="card vendor-card"><div className="card-title"><div><span>VENDOR PORTFOLIO</span><h2>Risk-tiered assurance status</h2></div><span className="method-note">Commercial amounts excluded</span></div><div className="vendor-list"><div className="vendor-row vendor-head"><span>Provider / service</span><span>Risk tier</span><span>Assessment</span><span>Assurance focus</span><span>Next review</span></div>{vendors.map(vendor => <div className="vendor-row" key={vendor.name}><span><strong>{vendor.name}</strong><small>{vendor.service}</small></span><span><b className={`tier ${vendor.criticality.toLowerCase()}`}>{vendor.criticality}</b></span><span><StatusPill status={vendor.assessment}/></span><span><strong>{vendor.assurance}</strong><small>{vendor.regulatory}</small></span><span>{vendor.nextReview}</span></div>)}</div></section><section className="callout-panel"><CircleAlert/><div><span>EXECUTIVE NOTE</span><h3>Third-party ratings remain evidence dependent</h3><p>Risk tiers, findings and SAMA outsourcing applicability should be confirmed by accountable business owners before committee reporting.</p></div></section></main>;
}

function GovernanceView() {
  return <main><SectionHeading eyebrow="GOVERNANCE & HUMAN RISK" title="Control ownership and assurance cadence" copy="Board-level indicators for workforce readiness, project security gates, reporting integrity and management decisions."/><section className="governance-hero"><article><span>SECURITY AWARENESS</span><strong>100%</strong><h3>All employees completed</h3><ProgressBar value={100} tone="good"/><p>KnowBe4 completion is confirmed. Platform export and effectiveness metrics should remain linked as evidence.</p></article><article><span>PROJECT SECURITY</span><strong>2×</strong><h3>Mandatory assessment gates</h3><div className="phase-flow"><div><b>01</b><span>Project initiation</span><small>Internal + external assessment</small></div><i/><div><b>02</b><span>Project closure</span><small>Internal + external assessment</small></div></div><p>Assessment reports, approvals and risk-treatment closure remain traceable per project.</p></article></section><section className="card governance-table"><div className="card-title"><div><span>DECISION REGISTER</span><h2>Management action and dependencies</h2></div></div>{managementActions.map(item => <div className="governance-row" key={item.issue}><div><strong>{item.issue}</strong><p>{item.impact}</p></div><span><small>Required decision / dependency</small>{item.decision}</span><span><small>Owner</small>{item.owner}</span><StatusPill status={item.status}/></div>)}</section><section className="assurance-strip"><div><Check/><span><small>PRODUCTION</small><b>Active · HTTP 200</b></span></div><div><Check/><span><small>SOURCE CONTROL</small><b>GitHub synchronized</b></span></div><div><Check/><span><small>CONTROL SOURCE</small><b>249 SAMA controls imported</b></span></div></section></main>;
}

function CapabilityView() {
  const achievements = [
    ["Governance established", "Independent cybersecurity reporting, CEO oversight and a CCO-chaired Cybersecurity Committee."],
    ["SAMA assessment expanded", "All 249 controls are now represented with domain, subdomain, maturity, evidence reference and dependencies."],
    ["Human risk coverage", "KnowBe4 awareness completed for all employees, with completion evidence retained for assurance."],
    ["Project security gates", "A risk assessment and approval are required before each project; third parties complete internal and external assessment inputs."],
    ["Security visibility improved", "SOC monitoring and threat hunting are operational, with Netskope implemented across Muhlah and applicable third-party devices."],
    ["Endpoint execution controlled", "Application whitelisting is implemented, supported by established endpoint and secure-disposal capabilities."],
    ["Evidence repository strengthened", "Documentation, risk assessments and control evidence have materially increased across departments."],
  ];
  const hiring = [
    ["DFIR Analyst", "In Progress", "Active hiring to build incident response and forensic depth"],
    ["SOC / DFIR L2 capability", "Planned", "Strengthen investigation and escalation coverage"],
    ["Senior Cybersecurity Architect", "On Hold", "Board decision; capability supported through training in the interim"],
    ["Architecture development", "Planned", "Complete architecture certification and apply the capability within Muhlah"],
  ];
  return <main>
    <SectionHeading eyebrow="DELIVERY & CAPABILITY" title="Achievements, solutions and workforce" copy="The security capabilities introduced, progress delivered and people decisions needed to sustain the programme."/>
    <section className="achievement-grid">{achievements.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2,"0")}</span><BadgeCheck/><h3>{title}</h3><p>{copy}</p></article>)}</section>
    <section className="card solution-portfolio"><div className="card-title"><div><span>SECURITY SOLUTIONS INTRODUCED</span><h2>Capability portfolio</h2></div><b>{solutions.length}</b></div><div className="solution-list">{solutions.map(solution => <article key={solution.name}><div><ShieldCheck/><span><strong>{solution.name}</strong><small>{solution.capability}</small></span></div><StatusPill status={solution.status}/><p>{solution.note}</p></article>)}</div></section>
    <section className="card hiring-card"><div className="card-title"><div><span>WORKFORCE PLAN</span><h2>Hiring and capability development</h2></div></div>{hiring.map(([role,status,purpose]) => <div className="hiring-row" key={role}><div><strong>{role}</strong><p>{purpose}</p></div><StatusPill status={status}/></div>)}</section>
  </main>;
}

export default function Dashboard() {
  const [active, setActive] = useState<Tab>("Executive overview");
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="dashboard-shell"><ExecutiveHeader active={active} onChange={setActive} onMenu={() => setMenuOpen(true)}/><MobileNav open={menuOpen} active={active} onChange={setActive} onClose={() => setMenuOpen(false)}/>{active === "Executive overview" && <Overview onChange={setActive}/>} {active === "SAMA & ML3" && <SamaView/>}{active === "Third-party risk" && <VendorView/>}{active === "Governance" && <GovernanceView/>}{active === "Capability & people" && <CapabilityView/>}<footer className="executive-footer"><span>CONFIDENTIAL · INTERNAL MUHLAH CYBERSECURITY USE ONLY</span><span>Progress reflects current assessment data and must not be interpreted as regulatory certification.</span></footer></div>;
}
