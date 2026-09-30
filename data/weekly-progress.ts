export type WeeklyUpdate = {
  id: string;
  category: string;
  title: string;
  status: "Completed" | "In progress" | "Awaiting document" | "Awaiting approval";
  summary: string;
  nextStep?: string;
};

// Operational update supplied by Muhlah. Completion is reported, not an audit conclusion.
export const weeklyUpdates: WeeklyUpdate[] = [
  { id: "manageengine", category: "Endpoint management", title: "ManageEngine implemented", status: "Completed", summary: "ManageEngine was implemented, and all reported implementation issues were resolved." },
  { id: "hiring", category: "People & capability", title: "Three candidate interviews completed", status: "Completed", summary: "Conducted three candidate interviews during the past week." },
  { id: "dlp", category: "Data protection", title: "DLP deployed in Muhlah", status: "Completed", summary: "Data Loss Prevention (DLP) was implemented in Muhlah’s environment." },
  { id: "netskope", category: "License capacity", title: "Ten additional Netskope licenses", status: "In progress", summary: "The existing 25 licenses were insufficient. A purchase order was issued, and procurement is proceeding for 10 additional licenses.", nextStep: "Complete the purchase and confirm activation. Planned capacity after activation: 35 licenses." },
  { id: "qualys", category: "Vendor documentation", title: "Qualys compliance document pending", status: "Awaiting document", summary: "Awaiting the compliance document from Qualys to proceed with the non-objection process.", nextStep: "Receive the compliance document, then proceed with the non-objection process." },
  { id: "policies", category: "Governance", title: "Policies awaiting board approval", status: "Awaiting approval", summary: "All policies are awaiting approval from the board.", nextStep: "Obtain and record the board’s policy approvals." },
];
