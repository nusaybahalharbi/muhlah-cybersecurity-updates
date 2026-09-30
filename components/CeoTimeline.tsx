"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, CheckCircle2, Flag, GitBranch, Printer } from "lucide-react";
import { timelineMilestones } from "@/data/ceo-timeline";

export default function CeoTimeline() {
  const [criticalOnly, setCriticalOnly] = useState(false);
  return <main className="ceo-timeline">
    <section className="ceo-hero">
      <div className="ceo-kicker">MUHLAH / CEO DELIVERY TIMELINE / Q4 2026</div>
      <div className="ceo-hero-grid"><div><h1>Clear the blockers.<br/><em>Close the year stronger.</em></h1><p>A dependency-led route from today’s open items to a December decision. Every milestone has a target, an owner and a clear definition of done.</p></div><aside><Flag size={24}/><span>PROGRAMME TARGET</span><strong>31 DEC<span>2026</span></strong><small>Conditional delivery plan<br/>Dates require owner confirmation</small></aside></div>
      <div className="ceo-actions"><a href="#delivery-path">Follow the delivery path <ArrowDown size={15}/></a><button onClick={() => window.print()}><Printer size={15}/> Print CEO brief</button></div>
    </section>
    <section className="ceo-reality"><span>DECEMBER FEASIBILITY</span><h2>Possible as a target. Not yet assured.</h2><p>Switch delivery, non-objection timing, board approval, provider availability and remediation effort are not confirmed. If these gates slip, completing everything by December may be impossible. These are proposed targets, not confirmed commitments.</p><strong>Immediate leadership ask: confirm switch delivery, reserve test windows and secure approval dates.</strong></section>
    <section className="ceo-chain" aria-label="Critical delivery dependencies"><header><GitBranch size={18}/><span>THE SEQUENCE THAT SETS THE PACE</span></header><ol>{["Switches", "Segmentation", "Internal VA", "Penetration test", "Red team", "Retest & close"].map((item, i) => <li key={item}><b>{String(i + 1).padStart(2, "0")}</b><span>{item}</span>{i < 5 && <ArrowRight size={16}/>}</li>)}</ol><p>Qualys documentation → non-objection → approved scanning readiness feeds the internal VA gate. Design, scope and provider booking can progress in parallel.</p></section>
    <section id="delivery-path"><header className="ceo-path-heading"><div><span>OCTOBER — DECEMBER 2026</span><h2>Three months. One connected plan.</h2></div><button aria-pressed={criticalOnly} onClick={() => setCriticalOnly(!criticalOnly)}>{criticalOnly ? "Show all workstreams" : "Focus on critical path"}</button></header>
      <div className="ceo-months">{(["October", "November", "December"] as const).map((month, i) => <section className="ceo-month" key={month}><header><span>{String(i + 10).padStart(2, "0")}</span><div><h2>{month}</h2><p>{["Unlock & build the foundations", "Validate & strengthen the controls", "Exercise, retest & report"][i]}</p></div></header><div className="ceo-milestones">{timelineMilestones.filter(item => item.month === month && (!criticalOnly || item.critical)).sort((a, b) => Number(a.target.slice(0, 2)) - Number(b.target.slice(0, 2))).map(item => <article key={item.id} className={`ceo-milestone ${item.critical ? "critical" : ""}`}><div className="ceo-milestone-meta"><span>{item.target} · TARGET</span><b>{item.critical ? "CRITICAL PATH" : "PARALLEL WORK"}</b></div><h3>{item.title}</h3><span className="ceo-state">{item.state}</span><p>{item.detail}</p>{item.depends && <div className="ceo-dependency"><GitBranch size={14}/><span><b>Unlocks after</b>{item.depends}</span></div>}<details><summary>Owner &amp; completion gate</summary><p><b>Proposed owner:</b> {item.owner}</p><p><b>Done when:</b> {item.exit}</p></details></article>)}</div></section>)}</div>
    </section>
    <section className="ceo-established"><CheckCircle2/><div><span>ALREADY DELIVERED — KEEP THE EVIDENCE CURRENT</span><h2>ManageEngine and DLP are implemented.</h2><p>ManageEngine implementation issues were reported resolved. DLP is deployed. Netskope is operational, with ten additional licenses pending. Three candidate interviews are complete; selection and hiring remain open.</p></div></section>
    <p className="ceo-source">Planning baseline: 30 September 2026. Latest Muhlah updates take precedence over older portfolio entries. Additional workstreams come from the existing programme register and require owner validation. This timeline is a delivery plan, not a live completion feed or an assertion that all SAMA controls will reach ML3 by December.</p>
  </main>;
}

