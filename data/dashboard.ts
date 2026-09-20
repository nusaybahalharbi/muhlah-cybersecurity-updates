import { Action, Control, Evidence, Kpi, Project, Risk, RoadmapLane, SamaDomain, Solution, Vendor } from "@/types";

export const dataNotice = "Demo and planning data only. Unverified values are explicitly labelled and must not be used as an assertion of compliance.";

export const samaSummary = { total: 237, closed: null, inProgress: null, notStarted: null, blocked: null, notApplicable: null, completion: null, currentMaturity: null, targetMaturity: 3 };

export const kpis: Kpi[] = [
  { label: "SAMA CSF", primary: "Target ML3", secondary: "Current: Needs Verification", tone: "teal", section: "sama" },
  { label: "Cybersecurity Projects", primary: "7 tracked", secondary: "1 blocked; dependencies visible", tone: "blue", section: "roadmap" },
  { label: "Critical Risks", primary: "Unrated", secondary: "Assign ratings in risk register", tone: "red", section: "risks" },
  { label: "Security Solutions", primary: "9 operational", secondary: "Qualys in procurement flow", tone: "violet", section: "stack" },
  { label: "Vulnerabilities", primary: "Needs Verification", secondary: "Critical / High / Medium / Low", tone: "amber", section: "stack" },
  { label: "Incidents", primary: "Needs Verification", secondary: "Open / Closed / SLA breached", tone: "blue", section: "overview" },
  { label: "Third Parties", primary: "10 tracked", secondary: "Assessment status editable", tone: "violet", section: "third-parties" },
  { label: "Awareness", primary: "Needs Verification", secondary: "KnowBe4 campaign metrics", tone: "teal", section: "people" },
  { label: "Infrastructure", primary: "Segmentation", secondary: "Improvement in progress", tone: "amber", section: "infrastructure" },
  { label: "Documents / Evidence", primary: "Growing repository", secondary: "Readiness needs verification", tone: "blue", section: "sama" },
  { label: "Hiring", primary: "Architecture on hold", secondary: "DFIR roles planned", tone: "red", section: "people" },
  { label: "Training", primary: "Proposed", secondary: "SABSA / TOGAF evaluation", tone: "teal", section: "people" },
];

export const maturityDomains: SamaDomain[] = [
  { name: "Cryptography", maturity: 2, target: 3, status: "Needs Verification" },
  { name: "Event Management", maturity: 3, target: 3, status: "Needs Verification" },
  { name: "Threat Management", maturity: 2, target: 3, status: "Needs Verification" },
  { name: "Incident Management", maturity: null, target: 3, status: "In Progress" },
  { name: "Architecture", maturity: 1, target: 3, status: "Needs Verification" },
];

export const controls: Control[] = [
  { id: "SAMA-DEMO-001", domain: "Cybersecurity Governance", title: "Standards compliance documentation", status: "In Progress", owner: "Cybersecurity", dueDate: "Needs Verification", gap: "Documentation completeness", remediation: "Consolidate standards mapping and obtain approval", evidenceIds: ["EV-001"] },
  { id: "SAMA-DEMO-002", domain: "Cybersecurity Governance", title: "Cybersecurity audit manual and plan", status: "Gap", owner: "Cybersecurity / Internal Audit", dueDate: "Needs Verification", gap: "Formal audit documentation", remediation: "Define audit methodology, cadence and evidence requirements", evidenceIds: [] },
  { id: "SAMA-DEMO-003", domain: "Cybersecurity Architecture", title: "Architecture HLD / LLD", status: "Gap", owner: "Cybersecurity", dueDate: "Needs Verification", gap: "Approved current and target architecture", remediation: "Establish governance and produce HLD/LLD", evidenceIds: ["EV-002"] },
  { id: "SAMA-DEMO-004", domain: "Cybersecurity Operations", title: "Vulnerability management process", status: "In Progress", owner: "Cybersecurity", dueDate: "Needs Verification", gap: "Platform rollout and metrics", remediation: "Implement Qualys, scanning cadence and remediation SLAs", evidenceIds: ["EV-003"] },
  { id: "SAMA-DEMO-005", domain: "Third Party", title: "Contract and vendor management", status: "In Progress", owner: "Cybersecurity / Procurement", dueDate: "Needs Verification", gap: "Consistent security review evidence", remediation: "Standardize assessments and review calendar", evidenceIds: ["EV-004"] },
  { id: "SAMA-DEMO-006", domain: "Cloud Security", title: "Cloud computing process", status: "In Progress", owner: "Cybersecurity / Technology", dueDate: "Needs Verification", gap: "Formal cloud control lifecycle", remediation: "Document ownership, assurance, logging and review", evidenceIds: ["EV-005"] },
];

export const evidence: Evidence[] = [
  { id: "EV-001", title: "Policy and standards repository index", type: "Document", status: "In Progress", controlIds: ["SAMA-DEMO-001"], owner: "Cybersecurity", lastReviewed: "Needs Verification" },
  { id: "EV-002", title: "Architecture improvement working pack", type: "Architecture", status: "Planned", controlIds: ["SAMA-DEMO-003"], owner: "Cybersecurity", lastReviewed: "Needs Verification" },
  { id: "EV-003", title: "Qualys approval / procurement record", type: "Approval", status: "Needs Verification", controlIds: ["SAMA-DEMO-004"], owner: "Cybersecurity / Finance", lastReviewed: "Needs Verification" },
  { id: "EV-004", title: "Department and vendor risk assessment records", type: "Assessment", status: "In Progress", controlIds: ["SAMA-DEMO-005"], owner: "Cybersecurity", lastReviewed: "Needs Verification" },
  { id: "EV-005", title: "Cloud provider assurance and SOC 2 evidence", type: "Assurance", status: "In Progress", controlIds: ["SAMA-DEMO-006"], owner: "Cybersecurity / Technology", lastReviewed: "Needs Verification" },
];

export const risks: Risk[] = [
  ["R-001","Incomplete network segmentation","Internal network boundaries require improvement","Corporate network","Lateral movement","Limited segmentation / historically single VLAN","Unrated","Unrated","Unrated","FortiGate and endpoint controls","Unrated","Implement managed switching, VLANs and validation","Technology / Cybersecurity","Needs Verification","In Progress","Network design and validation records"],
  ["R-002","WAF improvement area","Public web/application protection capability requires review","Public applications","Web application attack","WAF status not fully established","Unrated","Unrated","Unrated","Cloud-native and application controls","Unrated","Confirm architecture and implement proportionate WAF controls","Technology / Cybersecurity","Needs Verification","Gap","Configuration and monitoring evidence"],
  ["R-003","Architecture maturity","Cybersecurity architecture governance and artifacts require development","Enterprise technology","Design inconsistency","Limited approved HLD/LLD and target architecture","Unrated","Unrated","Unrated","Security reviews and existing controls","Unrated","Training, governance and architecture artifacts","Cybersecurity","Needs Verification","In Progress","Architecture pack"],
  ["R-004","Vulnerability management rollout","Selected platform is not yet confirmed operational","Technology estate","Unremediated vulnerabilities","Incomplete scanning and remediation lifecycle","Unrated","Unrated","Unrated","Existing monitoring and security testing","Unrated","Complete Qualys implementation and metrics","Cybersecurity / Technology","Needs Verification","In Progress","Procurement and scan evidence"],
  ["R-005","PT / Red Team dependency","Meaningful internal testing depends on segmentation readiness","Internal network","Control weakness remains unvalidated","Infrastructure prerequisite","Unrated","Unrated","Unrated","Planned VA and security monitoring","Unrated","Segmentation → VA → PT / Red Team","Cybersecurity / Technology","Needs Verification","Blocked","Dependency approval"],
  ["R-006","BYOD device compliance","Unmanaged devices could attempt access to corporate services","Identity and endpoints","Unauthorized access / data loss","Device compliance coverage needs verification","Unrated","Unrated","Unrated","MFA, Conditional Access, UEM and DLP capabilities","Unrated","Enforce compliant device access policy","IT / Cybersecurity","Needs Verification","In Progress","Access policy evidence"],
  ["R-007","Third-party dependency","Critical services rely on external providers","Critical services","Vendor disruption or control failure","Assurance depth varies by provider","Unrated","Unrated","Unrated","Contracts, assessments and SOC reports where available","Unrated","Risk-tiered assurance and review calendar","Business Owners / Cybersecurity","Needs Verification","In Progress","Vendor assessments"],
  ["R-008","BCM / DR maturity","Resilience documentation and testing require continued development","Critical business services","Service disruption","BIA, plans and test evidence need maturation","Unrated","Unrated","Unrated","Provider resilience and existing plans","Unrated","Complete BIA, BCP, DR plans and exercises","BCM / Technology / Cybersecurity","Needs Verification","In Progress","BIA and exercise evidence"],
  ["R-009","Asset visibility","Asset inventory completeness requires verification","Technology estate","Unmanaged asset exposure","Approximately 50 discoverable assets; authoritative inventory unclear","Unrated","Unrated","Unrated","Endpoint, network and service tools","Unrated","Reconcile inventory and add discovery / NDR","IT / Cybersecurity","Needs Verification","In Progress","Asset inventory"],
].map(r => ({ id:r[0], risk:r[1], description:r[2], asset:r[3], threat:r[4], vulnerability:r[5], likelihood:r[6], impact:r[7], inherent:r[8], controls:r[9], residual:r[10], treatment:r[11], owner:r[12], targetDate:r[13], status:r[14], evidence:r[15] } as Risk));

export const solutions: Solution[] = [
  { name:"Cognna", capability:"SOC / SOCaaS, SIEM monitoring, alerts and incident visibility", status:"Operational", owner:"Cybersecurity", note:"Operational scope and SLA should be periodically verified." },
  { name:"Netskope", capability:"SWG, web/cloud controls, real-time protection, restrictions and relevant IPS", status:"Operational", owner:"Cybersecurity / IT", note:"Policy scope includes cloud and web application governance." },
  { name:"KnowBe4", capability:"Security awareness and phishing training", status:"Operational", owner:"Cybersecurity", note:"Campaign metrics remain editable." },
  { name:"CTM360", capability:"External attack surface, digital risk and brand protection", status:"Operational", owner:"Cybersecurity", note:"Coverage and open findings require routine review." },
  { name:"BlackBerry UEM", capability:"MDM, BYOD controls, device enrolment and identity integration", status:"Operational", owner:"IT / Cybersecurity", note:"Compliance enforcement status needs verification." },
  { name:"Microsoft Security", capability:"DLP, sensitivity labels, email controls, external sender warning, Conditional Access / Intune", status:"Operational", owner:"IT / Cybersecurity", note:"Top Secret, Secret, Confidential, Internal, Public." },
  { name:"Fortinet / FortiGate", capability:"Perimeter firewall, VPN and secure connectivity", status:"Operational", owner:"IT", note:"Target state includes managed switching and segmentation." },
  { name:"BitRaser", capability:"Secure data and device wiping", status:"Operational", owner:"IT / Cybersecurity", note:"Maintain destruction evidence." },
  { name:"ManageEngine ServiceDesk Plus", capability:"IT/security service workflows, JML and operational processes", status:"Operational", owner:"IT", note:"Workflow coverage should be reviewed." },
  { name:"Qualys", capability:"Vulnerability scanning, prioritisation, reporting and remediation tracking", status:"In Progress", owner:"Cybersecurity", note:"Editable lifecycle: Approved / Procurement / Implementation / Operational." },
];

export const projects: Project[] = [
  { name:"Network segmentation", workstream:"Infrastructure", status:"In Progress", progress:null, owner:"IT / Cybersecurity", dueDate:"Needs Verification", dependency:"Managed switches and VLAN design" },
  { name:"Qualys rollout", workstream:"Vulnerability Management", status:"In Progress", progress:null, owner:"Cybersecurity", dueDate:"Needs Verification", dependency:"Procurement / implementation" },
  { name:"WAF improvement", workstream:"Application Security", status:"Planned", progress:null, owner:"Technology / Cybersecurity", dueDate:"Needs Verification", dependency:"Architecture decision" },
  { name:"Internal VA", workstream:"Assurance", status:"Planned", progress:null, owner:"Cybersecurity", dueDate:"Needs Verification", dependency:"Segmentation readiness" },
  { name:"PT / Red Team", workstream:"Assurance", status:"Blocked", progress:null, owner:"Cybersecurity", dueDate:"Needs Verification", dependency:"Segmentation → VA" },
  { name:"Architecture HLD / LLD", workstream:"Architecture", status:"In Progress", progress:null, owner:"Cybersecurity", dueDate:"Needs Verification", dependency:"Governance and capability development" },
  { name:"BIA / BCP / DR maturity", workstream:"Resilience", status:"In Progress", progress:null, owner:"BCM / Technology", dueDate:"Needs Verification", dependency:"Business ownership" },
];

export const vendors: Vendor[] = [
  ["Stitch","Fintech application technology / cloud services","High","Application and customer-related data","Needs Verification","In Progress","Review SAMA outsourcing / non-objection applicability","SOC 2 evidence available","Needs Verification","DR capabilities tracked","Saudi / Google Cloud context—verify","Open findings need verification","Technology / Cybersecurity","Needs Verification"],
  ["Oracle","OCI cloud infrastructure","High","Infrastructure and service data","Needs Verification","In Progress","Review applicability","Cloud assurance documentation","Needs Verification","Vendor DR tracked","Needs Verification","Needs Verification","Technology","Needs Verification"],
  ["Cognna","SOC / SOCaaS","High","Security telemetry","Needs Verification","In Progress","Review applicability","Needs Verification","Needs Verification","Service continuity tracked","Needs Verification","Needs Verification","Cybersecurity","Needs Verification"],
  ["Qualys","Vulnerability management","High","Asset and vulnerability metadata","In Progress","In Progress","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Implementation pending","Cybersecurity","Needs Verification"],
  ["Netskope","Cloud and web security","High","Web and cloud activity metadata","Needs Verification","In Progress","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Cybersecurity / IT","Needs Verification"],
  ["KnowBe4","Awareness and phishing training","Medium","User training metadata","Needs Verification","In Progress","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Cybersecurity","Needs Verification"],
  ["CTM360","Digital risk / brand protection","Medium","External exposure data","Needs Verification","In Progress","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Cybersecurity","Needs Verification"],
  ["BlackBerry","UEM / MDM","High","Device and identity metadata","Needs Verification","In Progress","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Needs Verification","IT / Cybersecurity","Needs Verification"],
  ["ManageEngine / Alnafitha","Service management","Medium","Workflow and asset data","Needs Verification","In Progress","Review applicability","Needs Verification","Needs Verification","Needs Verification","Needs Verification","Needs Verification","IT","Needs Verification"],
  ["Excellent Solutions","Outsourced call center","High","PII / financial data access","Needs Verification","In Progress","Review outsourcing / non-objection requirements","Control evidence required","Needs Verification","Vendor BCP / DR required","Needs Verification","Needs Verification","Business Owner / Cybersecurity","Needs Verification"],
].map(v => ({ name:v[0], service:v[1], criticality:v[2], data:v[3], contract:v[4], assessment:v[5], regulatory:v[6], assurance:v[7], sla:v[8], resilience:v[9], residency:v[10], findings:v[11], owner:v[12], nextReview:v[13] } as Vendor));

export const managementActions: Action[] = [
  { issue:"Network segmentation prerequisite", impact:"Delays meaningful internal VA and PT / Red Team validation", decision:"Confirm delivery ownership, dates and dependencies", owner:"COO / Technology", deadline:"Needs Verification", status:"In Progress" },
  { issue:"Qualys implementation", impact:"Vulnerability metrics and remediation governance remain incomplete", decision:"Complete procurement / implementation path", owner:"Finance / Cybersecurity", deadline:"Needs Verification", status:"Pending Approval" },
  { issue:"WAF improvement decision", impact:"Public application protection requires a confirmed target control", decision:"Approve proportionate WAF architecture and plan", owner:"Technology / Cybersecurity", deadline:"Needs Verification", status:"Planned" },
  { issue:"Architecture capability", impact:"HLD/LLD and target architecture maturity are constrained", decision:"Approve professional development and architecture governance plan", owner:"Management / HR", deadline:"Needs Verification", status:"Pending Approval" },
  { issue:"Senior Cybersecurity Architect role", impact:"Dedicated architecture capacity deferred", decision:"Maintain hold or revisit resourcing decision", owner:"Board / Management", deadline:"Needs Verification", status:"On Hold" },
];

export const roadmap: RoadmapLane[] = [
  { name:"Governance", stages:[{label:"Policies",status:"In Progress"},{label:"Evidence",status:"In Progress"},{label:"Risk",status:"In Progress"},{label:"SAMA ML3",status:"Planned"}] },
  { name:"Infrastructure", stages:[{label:"Managed switching",status:"Planned"},{label:"Segmentation",status:"In Progress"},{label:"NDR",status:"Planned"},{label:"Validation",status:"Planned"}] },
  { name:"Vulnerability", stages:[{label:"Qualys",status:"In Progress"},{label:"Scanning",status:"Planned"},{label:"Remediation",status:"Planned"},{label:"Metrics",status:"Planned"}] },
  { name:"Application", stages:[{label:"SDLC",status:"In Progress"},{label:"SAST",status:"In Progress"},{label:"VA",status:"Planned"},{label:"WAF",status:"Gap"},{label:"PT",status:"Blocked"}] },
  { name:"Architecture", stages:[{label:"Governance",status:"In Progress"},{label:"SABSA / TOGAF",status:"Proposed" as never},{label:"HLD / LLD",status:"Planned"},{label:"Target architecture",status:"Planned"}] },
  { name:"Resilience", stages:[{label:"BIA",status:"In Progress"},{label:"BCP",status:"In Progress"},{label:"DR",status:"In Progress"},{label:"Testing",status:"Planned"}] },
  { name:"People", stages:[{label:"Hiring",status:"On Hold"},{label:"Training",status:"Pending Approval"},{label:"Awareness",status:"Operational"},{label:"Specialist capability",status:"Planned"}] },
];

export const progressTrend = [{period:"Q4 25",value:18},{period:"Q1 26",value:24},{period:"Q2 26",value:31},{period:"Q3 26",value:null}];
export const evidenceReadiness = [{name:"Ready",value:0},{name:"In progress",value:5},{name:"Missing / unmapped",value:232}];
export const procurement = ["DLP","Secure wiping","Awareness","Red Team","Email security","Vulnerability Assessment","GRC","BIA / BCM","vCISO / advisory","SOC","Brand protection","PT / VA","Network segmentation","Managed switches","WAF","Asset discovery","NDR","Application whitelisting","Future ML4 improvements"];
