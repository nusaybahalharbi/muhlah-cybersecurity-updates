# Data Model

Typed interfaces cover SAMA controls and evidence, risks, projects, vendors, solutions, management actions, roadmap stages, and executive KPIs. `data/sama-controls.json` preserves all 147 atomic requirements imported from the supplied workbook, including the original requirement, information request, assessment narrative, gap, maturity, recommendation, status and timeframe context.

Each SAMA record contains implementation, assessment status, weighted progress, required/available/missing evidence, gap, remediation action, owner, priority, target, dependencies, evidence metadata and source-row traceability. Risk ratings are deliberately `Unrated` until authorised owners assign them.

SAMA weighted progress uses Completed 100%, Partially Completed 60%, In Progress 40%, Blocked / Waiting for Approval 30%, Requires Evidence / Verification 20%, and Not Started 0%. Not Applicable requirements are excluded. This is a management progress metric, not a compliance certification.

Future entities should add incidents, vulnerabilities, employee/resource records, hiring candidates, certifications, procurement approvals, policy versions, JML cases, awareness campaigns, and resilience tests as separate tables with row-level access controls and audit history.
