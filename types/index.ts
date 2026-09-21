export type Status = "Completed" | "Operational" | "In Progress" | "Planned" | "Pending Approval" | "Blocked" | "On Hold" | "Overdue" | "Gap" | "Needs Verification";
export type Rating = "Critical" | "High" | "Medium" | "Low" | "Unrated";

export interface Kpi { label: string; primary: string; secondary: string; tone: "teal" | "blue" | "amber" | "red" | "violet"; section: SectionId }
export interface SamaDomain { name: string; maturity: number | null; target: number; status: Status }
export interface Control { id: string; domain: string; title: string; status: Status; owner: string; dueDate: string; gap: string; remediation: string; evidenceIds: string[] }
export interface Evidence { id: string; title: string; type: string; status: Status; controlIds: string[]; owner: string; lastReviewed: string }
export interface Risk { id: string; risk: string; description: string; asset: string; threat: string; vulnerability: string; likelihood: Rating; impact: Rating; inherent: Rating; controls: string; residual: Rating; treatment: string; owner: string; targetDate: string; status: Status; evidence: string }
export interface Solution { name: string; capability: string; status: Status; owner: string; note: string }
export interface Vendor { name: string; service: string; criticality: Rating; data: string; contract: Status; assessment: Status; regulatory: string; assurance: string; sla: string; resilience: string; residency: string; findings: string; owner: string; nextReview: string }
export interface Project { name: string; workstream: string; status: Status; progress: number | null; owner: string; dueDate: string; dependency: string }
export interface Action { issue: string; impact: string; decision: string; owner: string; deadline: string; status: Status }
export interface RoadmapLane { name: string; stages: { label: string; status: Status }[] }
export type SamaAssessmentStatus = "Completed" | "Partially Completed" | "In Progress" | "Not Started" | "Blocked / Waiting for Approval" | "Not Applicable" | "Requires Evidence / Verification";
export interface SamaControlRecord {
  id: string; familyId: string; sequence: string; domain: string; subdomain: string; name: string; requirement: string;
  applicability: string; implementation: string; status: SamaAssessmentStatus; completion: number;
  requiredEvidence: string[]; existingEvidence: string[]; missingEvidence: string[]; gap: string; requiredAction: string;
  owner: string; priority: "Critical" | "High" | "Medium" | "Low"; targetDate: string; dependencies: string[];
  notes: string; sourceMaturity: number | null; sourceStatus: string; capabilities: string[]; evidenceStatus: string;
  evidenceOwner: string; evidenceLocation: string; dateCollected: string; reviewDate: string; expirationDate: string;
}
export type SectionId = "overview" | "sama" | "sama-controls" | "sama-evidence" | "sama-remediation" | "sama-mapping" | "risks" | "stack" | "infrastructure" | "third-parties" | "people" | "resilience" | "roadmap" | "data";
