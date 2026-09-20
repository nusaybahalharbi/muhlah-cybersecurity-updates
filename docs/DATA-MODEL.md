# Data Model

Typed interfaces cover SAMA controls and evidence, risks, projects, vendors, solutions, management actions, roadmap stages, and executive KPIs. Status values are controlled so that `Operational`, `In Progress`, `Planned`, `Gap`, `On Hold`, and `Needs Verification` are not conflated.

Evidence records reference one or more control IDs. Controls contain evidence IDs, ownership, due date, gap, and remediation. Risk ratings are deliberately `Unrated` until authorised owners assign them.

Future entities should add incidents, vulnerabilities, employee/resource records, hiring candidates, certifications, procurement approvals, policy versions, JML cases, awareness campaigns, and resilience tests as separate tables with row-level access controls and audit history.
