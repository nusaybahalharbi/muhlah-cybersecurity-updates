import type { Vendor } from "@/types";

export const vendors: Vendor[] = [
  ["Stitch","Fintech application technology / cloud services","High","Application and customer-related data","Needs Verification","In Progress","Review SAMA outsourcing / non-objection applicability","SOC 2 evidence available","Needs Verification","DR capabilities tracked","Saudi / Google Cloud context—verify","Open findings need verification","Technology / Cybersecurity","Needs Verification"],
  ["Oracle","OCI cloud infrastructure","High","Infrastructure and service data","Needs Verification","In Progress","Review applicability","Cloud assurance documentation","Needs Verification","Vendor DR tracked","Needs Verification","Needs Verification","Technology","Needs Verification"],
  ["Cognna","SOC / SOCaaS","High","Security telemetry","Needs Verification","Completed","Review applicability","Needs Verification","Needs Verification","Service continuity tracked","Needs Verification","Needs Verification","Cybersecurity","Needs Verification"],
  ["Qualys","Vulnerability management","High","Asset and vulnerability metadata","In Progress","In Progress","NDA under legal review; submit SAMA non-objection request after approval","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Implementation pending legal review and SAMA approval","Cybersecurity / Legal / Compliance","After SAMA decision"],
  ["Netskope","Cloud and web security","High","Web and cloud activity metadata","Needs Verification","Completed","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Cybersecurity / IT","Needs Verification"],
  ["KnowBe4","Awareness and phishing training","Medium","User training metadata","Needs Verification","Completed","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Cybersecurity","Needs Verification"],
  ["CTM360","Digital risk / brand protection","Medium","External exposure data","Needs Verification","Completed","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Cybersecurity","Needs Verification"],
  ["BlackBerry","UEM / MDM","High","Device and identity metadata","Needs Verification","In Progress","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Needs Verification","IT / Cybersecurity","Needs Verification"],
  ["ManageEngine / Alnafitha","Service management","Medium","Workflow and asset data","Needs Verification","Completed","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Needs Verification","IT","Needs Verification"],
  ["Excellent Solutions","Outsourced call center","High","PII / financial data access","Needs Verification","Completed","Review outsourcing / non-objection requirements","Control evidence required","Needs Verification","Vendor BCP / DR required","Needs Verification","Needs Verification","Business Owner / Cybersecurity","Needs Verification"],
].map(v => ({ name:v[0], service:v[1], criticality:v[2], data:v[3], contract:v[4], assessment:v[5], regulatory:v[6], assurance:v[7], sla:v[8], resilience:v[9], residency:v[10], findings:v[11], owner:v[12], nextReview:v[13] } as Vendor));



