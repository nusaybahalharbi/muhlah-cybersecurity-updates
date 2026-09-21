# Muhlah Cybersecurity Updates

> **CONFIDENTIAL – INTERNAL MUHLAH CYBERSECURITY USE ONLY**

Centralized cybersecurity governance, SAMA CSF readiness, security operations, infrastructure modernization, risk, compliance, project, and management reporting dashboard for Muhlah, a Saudi fintech.

## Overview

The Muhlah Cybersecurity Command Center gives the Cybersecurity Department, CEO, executive management, and Cybersecurity Committee a single decision-ready view of posture, delivery, risk, evidence, resources, and management attention.

All initial content is planning/demo data derived from the project brief. Unverified facts are marked **Needs Verification** and risk ratings are **Unrated**. The application does not claim regulatory compliance or completed work without evidence.

## Features

- Executive KPI command center and management decision queue
- Workbook-backed SAMA CSF module with all 147 control requirements across 36 families and four domains
- Executive SAMA progress, control-level assessment, evidence management, remediation and technology mapping
- Dynamic risk register and unrated risk matrix
- Security stack, procurement portfolio, and vulnerability-management lifecycle
- Network modernization and PT/Red Team dependency roadmap
- Cloud, application, identity, endpoint, and BYOD assurance views
- Third-party risk and outsourced call-center controls
- BIA, BCP, DR, RTO/RPO, testing, and cyber-recovery tracking
- JML workflow, awareness campaigns, hiring, and professional development
- Integrated roadmap, global search, status badges, charts, and responsive layouts
- Typed, maintainable data layer ready for a future authenticated API/database

## Architecture

Next.js App Router, TypeScript, Tailwind CSS, Recharts, and Lucide. UI code is under `components/`; editable business records are under `data/`; shared contracts are under `types/`. See `docs/ARCHITECTURE.md` and `docs/DATA-MODEL.md`.

## Local installation

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. For production validation:

```bash
npm run lint
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` and replace placeholders only in the local/runtime environment. Do not commit `.env.local`.

The authentication variables are architecture placeholders; production authentication is not implemented in this initial release.

## Data updates

Update validated operational records in `data/dashboard.ts` and SAMA assessment records in `data/sama-controls.json`. Preserve the controlled statuses and use `Requires Evidence / Verification` for uncertainty. Do not mark a capability compliant because a product or contract exists. See `docs/UPDATING.md`.

## SAMA assessment methodology

The source workbook contains 147 atomic control requirements grouped into 36 control families. Progress is calculated across applicable requirements using: Completed 100%, Partially Completed 60%, In Progress 40%, Blocked / Waiting for Approval 30%, Requires Evidence / Verification 20%, and Not Started 0%. Not Applicable controls are excluded. The result is a remediation progress indicator—not a regulatory certification or formal compliance opinion.

## Security requirements

- Keep the GitHub repository private.
- Do not expose the dashboard publicly.
- Do not commit credentials, secrets, internal IPs, VPN details, technical vulnerabilities, personal employee information, sensitive diagrams, or commercial amounts.
- Add enterprise SSO/MFA, authorisation, audit logging, encryption, private networking, and approved data residency before production use.

See `docs/SECURITY.md`.

## Deployment

No public deployment is configured or authorised. Deployment requires explicit approval and must be private by default. See `docs/DEPLOYMENT.md`.

## Contribution and update process

1. Create a focused branch.
2. Validate source data and evidence with the responsible owner.
3. Update typed records without overstating maturity or completion.
4. Run lint and build checks.
5. Request Cybersecurity review.
6. Merge with a meaningful commit and retain traceability.

## Roadmap

Future releases should add enterprise authentication, role-based access, durable storage, change history, workflow approvals, exports, API integrations, notifications, and restricted operational drill-downs. See `docs/FUTURE-INTEGRATION.md` and the repository issues/milestones.
