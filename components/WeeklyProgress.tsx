import { ArrowDown, ArrowUpRight, Check, Clock3, ShieldCheck } from "lucide-react";
import { weeklyUpdates } from "@/data/weekly-progress";

export default function WeeklyProgress() {
  const completed = weeklyUpdates.filter(update => update.status === "Completed");
  const pending = weeklyUpdates.filter(update => update.status.startsWith("Awaiting"));

  return <main className="weekly-page">
    <section className="weekly-hero" aria-labelledby="weekly-title">
      <div className="weekly-kicker"><span className="weekly-dot" /> MUHLAH / CYBERSECURITY <span>PAST WEEK</span></div>
      <div className="weekly-hero-content">
        <div><p className="weekly-eyebrow">DELIVERY. VISIBILITY. NEXT STEPS.</p><h1 id="weekly-title">Cybersecurity<br /><em>weekly progress.</em></h1><p className="weekly-intro">Stronger controls. Growing capability. A clear view of what moved forward and what needs attention.</p><a className="weekly-jump" href="#weekly-updates">Explore this week’s updates <ArrowDown size={16} /></a></div>
        <aside className="weekly-brief" aria-label="Weekly summary"><ShieldCheck size={32} /><span>THIS WEEK AT A GLANCE</span><strong>{completed.length}<small>completed workstreams</small></strong><p>ManageEngine, candidate interviews and DLP implementation.</p><div><b>01</b><span>Procurement in progress</span></div><div><b>{String(pending.length).padStart(2, "0")}</b><span>External dependencies</span></div></aside>
      </div>
    </section>

    <a className="weekly-jump" href="/ceo-timeline" style={{margin: "24px 0", display: "inline-flex"}}>View the CEO delivery timeline · October–December 2026 <ArrowUpRight size={16}/></a>
    <section className="weekly-metrics" aria-label="Key weekly figures">
      <article><span>DELIVERY</span><strong>02<small>implementations</small></strong><p>ManageEngine &amp; DLP</p></article>
      <article><span>PEOPLE</span><strong>03<small>interviews</small></strong><p>Candidate interviews completed</p></article>
      <article><span>CAPACITY</span><strong>+10<small>licenses requested</small></strong><p>Netskope PO issued · purchase in progress</p></article>
      <article><span>DEPENDENCIES</span><strong>02<small>pending items</small></strong><p>Qualys document &amp; board approval</p></article>
    </section>

    <section id="weekly-updates" className="weekly-updates" aria-labelledby="updates-title">
      <header className="weekly-section-title"><div><span>01 / WORKSTREAM UPDATES</span><h2 id="updates-title">Progress across the programme</h2></div><p>Six updates. One clear picture.</p></header>
      <div className="weekly-card-grid">{weeklyUpdates.map((update, index) => <article className="weekly-card" key={update.id}>
        <div className="weekly-card-top"><span className="weekly-number">{String(index + 1).padStart(2, "0")}</span><span className={`weekly-status ${update.status === "Completed" ? "is-complete" : "is-pending"}`}>{update.status === "Completed" ? <Check size={13} /> : <Clock3 size={13} />}{update.status}</span></div>
        <span className="weekly-category">{update.category}</span><h3>{update.title}</h3><p>{update.summary}</p>
        {update.nextStep && <div className="weekly-next"><span>NEXT STEP <ArrowUpRight size={13} /></span><p>{update.nextStep}</p></div>}
      </article>)}</div>
    </section>

    <section className="weekly-focus" aria-labelledby="focus-title"><div><span>02 / FOLLOW-UP FOCUS</span><h2 id="focus-title">Keep the next steps moving.</h2><p>Close the open dependencies to move procurement and governance forward.</p></div><ol><li><span>01</span><div><strong>Qualys documentation</strong><p>Receive the compliance document for the non-objection process.</p></div></li><li><span>02</span><div><strong>Netskope capacity</strong><p>Complete procurement and confirm activation of the 10 additional licenses.</p></div></li><li><span>03</span><div><strong>Board policy approval</strong><p>Follow up on approval of all policies and record the decisions.</p></div></li></ol></section>
    <p className="weekly-source">Source: Muhlah’s supplied weekly operational update. Reported completion does not imply regulatory compliance or independent assurance.</p>
  </main>;
}
