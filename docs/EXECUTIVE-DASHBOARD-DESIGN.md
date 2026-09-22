# Executive Progress & Compliance Dashboard

## Positioning

This experience is an executive reporting dashboard for Muhlah's Board, CEO, CISO, Cybersecurity Committee and senior leadership. It reports readiness, maturity, evidence and decisions. It is deliberately not presented as a SOC console or operational command platform.

## Layout architecture

1. **Executive header** — confidentiality label, reporting date, four concise views and production health.
2. **Executive overview** — assessment headline, ML3 target, four leadership KPIs, decision queue and assurance signals.
3. **SAMA & ML3** — assessment progress, evidence position, domain-level controls and the principal gaps to ML3.
4. **Third-party risk** — provider count, assessment state, criticality, assurance focus and review status.
5. **Governance** — awareness coverage, project initiation/closure gates, management decisions and system assurance.
6. **Control drill-down** — the 249-control register remains available through progressive disclosure.

## Visual system

- **Primary navy `#12364E`**: executive authority, headings and ML3 context.
- **Teal `#0C7A73`**: measured progress, current focus and positive assurance.
- **Blue `#2777C7`**: active work in progress.
- **Amber `#C7871E`**: evidence, approval or management attention required.
- **Red `#B64A4A`**: overdue or urgent management attention only; dependencies remain explicitly named and are not presented as invented risk severity.
- **Green `#21836F`**: verified completion or healthy production status.
- **Typography**: Geist, with large sentence-case headlines, compact uppercase section labels and restrained body copy.
- **Spacing**: 14–18px card gaps, 20–30px card padding and a 1440px maximum content width.

## Status logic

| Dashboard state | Visual treatment | Meaning |
| --- | --- | --- |
| Closed / Completed | Green | Implemented and evidenced where stated |
| In progress / Partially completed | Blue | Active work or partial implementation |
| Evidence required / Pending approval | Amber | Requires proof, approval or management action |
| Dependency | Amber | Progress relies on a named approval, prerequisite or external party |
| Remaining / On hold | Neutral grey | Not started or intentionally paused |

## React component structure

```text
Dashboard
├── ExecutiveHeader
├── MobileNav
├── Overview
│   ├── ExecutiveHero
│   ├── MetricCard × 4
│   ├── MaturitySummary
│   ├── ManagementAttention
│   └── AssuranceSignals
├── SamaView
│   ├── ProgressTopline
│   ├── DomainBarChart
│   ├── StatusDonut
│   ├── DomainTable
│   ├── ML3GapCards
│   └── SamaControls (progressive disclosure)
├── VendorView
│   ├── VendorMetrics
│   └── VendorPortfolio
└── GovernanceView
    ├── AwarenessCoverage
    ├── ProjectSecurityGates
    ├── DecisionRegister
    └── SystemAssurance
```

The implementation uses React client components for tab state and interactive Recharts visualisations. Source data remains in `data/`; no assessment data is embedded in chart components. Tailwind v4 is available for utility extension, while the executive design tokens and responsive component rules live in `app/globals.css`.

## Responsive behavior

- Desktop: four-column KPIs, two-column analytical panels and full vendor/domain tables.
- Tablet: two-column KPIs, stacked analytical panels and reduced table columns.
- Mobile: single-column cards, drawer navigation and horizontally safe data presentation.

## Accuracy controls

- The 30% value is labelled assessment progress, not regulatory certification.
- ML3 is shown as a target, not an achieved maturity rating.
- Risk ratings and vendor findings remain unassigned where evidence is unavailable.
- Awareness is shown as 100% based on the confirmed employee-completion statement, with evidence attachment still called out.
- Production and source alignment indicators are separated from compliance status.
