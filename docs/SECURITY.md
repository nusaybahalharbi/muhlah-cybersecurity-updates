# Security Considerations

This repository and any deployment must remain private. The current UI contains planning/demo content only and is not a substitute for access control.

- Never commit credentials, tokens, passwords, VPN details, internal IP addresses, exploit detail, personal employee data, commercial amounts, or restricted diagrams.
- Keep secrets only in `.env.local` or an approved secret manager.
- Use enterprise SSO, MFA, least privilege, session timeout, audit logging, and environment separation before production use.
- Restrict operational vulnerability and incident detail to authorised users; executive views should use aggregation.
- Validate hosting region, data residency, backup, retention, recovery, and supplier assurance.
- Run dependency/security scanning and peer review before each release.
- Do not make a deployment publicly accessible by default.
