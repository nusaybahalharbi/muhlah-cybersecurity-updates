# Dashboard Update Procedure

1. Validate the source, owner, effective date, and supporting evidence.
2. Update the relevant record in `data/dashboard.ts`.
3. Keep uncertain facts as `Needs Verification`; keep unassessed risk fields as `Unrated`.
4. Do not convert approved or procured work into `Operational` until implementation evidence exists.
5. Run `npm run lint` and `npm run build`.
6. Review the executive view, detail view, search results, and management attention queue.
7. Commit with a short description and reviewer/context reference.

For future database integration, preserve the interfaces in `types/index.ts` as API contracts or generate equivalent schemas from the database.
