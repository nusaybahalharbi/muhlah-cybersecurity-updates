# Shared assessment

`/api/assessment` reads and writes the Upstash Redis database connected to the Vercel project. Configure server-only `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`). The integration supplies the KV names automatically. Never expose credentials through NEXT_PUBLIC variables.

Reads preserve the dashboard’s existing viewer access. Writes require the existing HttpOnly PIN-authenticated editor cookie and validate origin, control ID, maturity, revision and mutation ID. The Redis Lua operation atomically checks revision, updates the control and appends the latest 100 change records. Stale revisions return 409 and never overwrite the winner. Immediate retries with the same mutation ID are idempotent.

All assessment screens subscribe to one client store. Updates use server-confirmed state, refresh on window focus and poll every 15 seconds while visible. Storage failures are explicit; editing is disabled without a loaded shared snapshot. Production never writes browser localStorage or an ephemeral server filesystem. Existing browser-only data is not deleted, but is not automatically published over the shared assessment.

The storage key includes a fingerprint of source maturity/applicability. Importing a changed workbook starts a separate assessment and retains the old database record. Plan any desired migration explicitly; do not silently overwrite newer workbook records with stale browser overrides.

Run `node --experimental-strip-types --test tests/sama-maturity.test.mjs tests/portfolio.test.mjs` for calculations and portfolio constraints. The opt-in `tests/shared-assessment-live.mjs` requires TEST_BASE_URL and SAMA_TEST_PIN. It tests save/read in independent HTTP sessions, refresh, invalid/unauthenticated writes, stale revisions and idempotency, then restores the original maturity. Never log or commit PINs.

Initiative updates belong in `data/initiatives.ts`; all project views and mapping read that register. Vendor assurance remains separately modelled. Governance and Capability & People are no longer application views.
