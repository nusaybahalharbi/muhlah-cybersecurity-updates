# Data Model

Typed interfaces cover SAMA controls and evidence, risks, projects, vendors, solutions, management actions, roadmap stages, and executive KPIs. `data/sama-controls.json` preserves all 249 controls imported from `SAMA-CSF-SelfAssessment AUG 24.xlsx`, including the requirement, recorded maturity, comments/evidence references, target date and dashboard governance context.

Each SAMA record contains implementation, assessment status, weighted progress, required/available/missing evidence, gap, remediation action, owner, priority, target, dependencies, evidence metadata and source-row traceability. Risk ratings are deliberately `Unrated` until authorised owners assign them.

SAMA reporting separates the workbook's recorded maturity from the management assessment-progress indicator. Blank source statuses remain blank and are never converted into confirmed closure. Not Applicable requirements are excluded from ML3 coverage. Constraints are surfaced as named dependencies or required approvals. This is a management readiness view, not a compliance certification.

Future entities should add incidents, vulnerabilities, employee/resource records, hiring candidates, certifications, procurement approvals, policy versions, JML cases, awareness campaigns, and resilience tests as separate tables with row-level access controls and audit history.
