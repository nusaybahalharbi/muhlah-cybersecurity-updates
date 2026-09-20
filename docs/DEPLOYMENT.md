# Deployment

No deployment is included in the initial repository.

Before any deployment:

1. Obtain explicit Cybersecurity and management approval.
2. Select a private hosting environment with approved Saudi regulatory and data-residency posture.
3. Implement enterprise SSO/MFA and deny unauthenticated access at the edge and application layers.
4. Configure secrets outside source control.
5. Enable audit logs, monitoring, backups, secure headers, dependency scanning, and tested recovery.
6. Validate that demo data has been replaced or clearly labelled.
7. Run `npm ci`, `npm run lint`, and `npm run build` in CI.
