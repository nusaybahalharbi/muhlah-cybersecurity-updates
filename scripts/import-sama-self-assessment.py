"""Import the authoritative SAMA self-assessment workbook into dashboard JSON.

Usage: python scripts/import-sama-self-assessment.py <source.xlsx>
"""

import json
import re
import sys
from pathlib import Path

import openpyxl


SOURCE = Path(sys.argv[1])
TARGET = Path(__file__).resolve().parents[1] / "data" / "sama-controls.json"

CAPABILITIES = {
    "Cyber Security Awareness": ["KnowBe4"],
    "Cyber Security Training": ["KnowBe4", "Professional training and certifications"],
    "Asset Management": ["ManageEngine ServiceDesk Plus"],
    "Infrastructure Security": ["Netskope", "Fortinet / FortiGate", "Application whitelisting"],
    "Application Security": ["Netskope", "Secure SDLC / SAST", "Application whitelisting"],
    "Bring Your Own Device (BYOD)": ["BlackBerry UEM", "Microsoft Conditional Access"],
    "Secure Disposal of Information Assets": ["BitRaser", "DIPU secure disposal"],
    "Vulnerability Management": ["Qualys"],
    "Cyber Security Incident Management": ["Cognna", "DFIR capability"],
    "Cyber Security Event Management": ["Cognna", "SOC monitoring", "Threat hunting"],
    "Threat Management": ["CTM360", "Cognna", "Threat hunting"],
    "Cyber Security Architecture": ["Architecture governance", "SABSA / TOGAF development"],
    "Identity and Access Management": ["Microsoft Entra ID", "BlackBerry UEM"],
}

OWNERS = {
    "Cyber Security Governance": "Cybersecurity / Executive Management",
    "Cyber Security Strategy": "Cybersecurity / Board",
    "Cyber Security Policy": "Cybersecurity",
    "Cyber Security Roles and Responsibilities": "Cybersecurity / HR",
    "Cyber Security Awareness": "Cybersecurity",
    "Cyber Security Training": "Cybersecurity / HR",
    "Asset Management": "IT / Cybersecurity",
    "Vulnerability Management": "Cybersecurity / IT",
    "Cyber Security Architecture": "Cybersecurity / IT",
    "Cyber Security Incident Management": "Cybersecurity",
    "Secure Disposal of Information Assets": "IT / Cybersecurity",
    "Contract and Vendor Management": "Procurement / Cybersecurity",
    "Outsourcing": "Business Owner / Compliance / Cybersecurity",
    "Cloud Computing": "IT / Cybersecurity",
}


def clean(value):
    return re.sub(r"\s+", " ", str(value or "")).strip()


def maturity_value(label):
    match = re.match(r"\s*([1-5])", clean(label))
    return int(match.group(1)) if match else None


def status_for(maturity, label):
    if clean(label).upper().startswith("NA"):
        return "Not Applicable", 0
    if maturity and maturity >= 3:
        return "Partially Completed", 60
    if maturity == 2:
        return "In Progress", 40
    if maturity == 1:
        return "Not Started", 0
    return "Requires Evidence / Verification", 20


workbook = openpyxl.load_workbook(SOURCE, data_only=True, read_only=False)
sheet = workbook["Self Assessment Tracker"]
controls = []

for row_number, row in enumerate(sheet.iter_rows(min_row=3, max_col=13, values_only=True), start=3):
    _, domain_code, domain, subdomain_code, subdomain, control_code, requirement, current_status, maturity_label, action_plan, target_date, comments, _ = row
    if not control_code or not requirement:
        continue

    control_id = clean(control_code)
    maturity = maturity_value(maturity_label)
    status, completion = status_for(maturity, maturity_label)
    comment = clean(comments)
    action = clean(action_plan)
    capabilities = CAPABILITIES.get(clean(subdomain), [])
    evidence = [comment] if comment else []
    gap = "Current maturity is below the ML3 target." if maturity and maturity < 3 else "Validate the recorded maturity against approved evidence and operating effectiveness."
    required_action = action or ("Close the maturity gap, assign evidence and validate operating effectiveness." if maturity and maturity < 3 else "Validate and link the evidence supporting the recorded maturity.")
    dependencies = []

    if clean(subdomain) == "Vulnerability Management":
        dependencies = ["Final implementation step", "SAMA No Objection / NOC", "Validated scanning and remediation evidence"]
        status, completion = "In Progress", 40
        required_action = "Complete the final Qualys implementation step and validate scanning, remediation and reporting evidence."
    elif clean(subdomain) == "Cyber Security Architecture":
        dependencies = ["Architecture certification and development plan", "IT HLD/LLD inputs", "Target-state governance"]
    elif clean(subdomain) in {"Infrastructure Security", "Vulnerability Management"}:
        dependencies = ["Network segmentation", "Asset visibility", "Validated operating evidence"]
    elif clean(subdomain) == "Cyber Security Incident Management":
        dependencies = ["DFIR analyst hiring", "Approved incident procedures", "Exercise and incident evidence"]
    elif clean(subdomain) == "Cyber Security in Project Management":
        dependencies = ["Project assessment register", "Initiation evidence", "Risk-owner approval"]

    implementation = comment or "No implementation narrative is recorded in the workbook; control evidence requires validation."
    if clean(subdomain) == "Cyber Security Awareness":
        implementation = "KnowBe4 cybersecurity awareness has been completed for all employees. The completion export and effectiveness metrics should remain linked as evidence."
        evidence = ["KnowBe4 awareness completed for all employees — confirmed by Head of Cybersecurity; platform export requires attachment"]
    elif clean(subdomain) == "Cyber Security in Project Management":
        implementation = "A cybersecurity risk assessment is issued before each project and requires approval. For third-party projects, both internal and external assessments are completed, including a questionnaire completed by the third party."
        evidence = ["Pre-project cybersecurity risk assessment, approval record, internal assessment and third-party completed external questionnaire — confirmed by Head of Cybersecurity; records require attachment"]
    elif clean(subdomain) in {"Cyber Security Event Management", "Threat Management"}:
        implementation = f"{implementation} Operational SOC monitoring and threat-hunting capability are confirmed; current service and activity evidence should remain linked."
    elif clean(subdomain) == "Infrastructure Security":
        implementation = f"{implementation} Netskope is implemented across all Muhlah devices and applicable third-party devices. Application whitelisting is operational."
    elif clean(subdomain) == "Secure Disposal of Information Assets":
        implementation = f"{implementation} BitRaser and DIPU secure-disposal capabilities are in place; disposal and destruction records should remain linked."
    elif clean(subdomain) == "Cyber Security Architecture":
        implementation = f"{implementation} The Head of Cybersecurity plans to complete architecture certification and apply the capability within Muhlah; certification is not yet recorded as completed."

    controls.append({
        "id": control_id,
        "familyId": clean(subdomain_code),
        "sequence": control_id.split("-")[-1],
        "domain": clean(domain),
        "subdomain": clean(subdomain),
        "name": clean(subdomain),
        "requirement": clean(requirement),
        "applicability": "Not Applicable" if status == "Not Applicable" else "Applicable",
        "implementation": implementation,
        "status": status,
        "completion": completion,
        "requiredEvidence": ["Approved control documentation", "Current operating evidence", "Control-owner validation"],
        "existingEvidence": evidence,
        "missingEvidence": [] if evidence else ["Control-specific evidence has not been linked"],
        "gap": gap,
        "requiredAction": required_action,
        "owner": OWNERS.get(clean(subdomain), "Cybersecurity / Control Owner"),
        "priority": "High" if clean(subdomain) in {"Cyber Security Architecture", "Vulnerability Management", "Infrastructure Security", "Cyber Security Incident Management", "Cloud Computing"} else "Medium",
        "targetDate": target_date.isoformat() if hasattr(target_date, "isoformat") else clean(target_date) or "Needs Verification",
        "dependencies": dependencies,
        "notes": f"Source: SAMA-CSF-SelfAssessment AUG 24.xlsx, row {row_number}. Workbook status: {clean(current_status) or 'blank'}. Workbook maturity: {clean(maturity_label) or 'blank'}.",
        "sourceMaturity": maturity,
        "sourceStatus": clean(current_status) or "Blank",
        "capabilities": capabilities,
        "evidenceStatus": "Referenced — validate" if evidence else "Missing",
        "evidenceOwner": OWNERS.get(clean(subdomain), "Cybersecurity / Control Owner"),
        "evidenceLocation": "Referenced in workbook" if evidence else "Not linked",
        "dateCollected": "",
        "reviewDate": "Needs Verification",
        "expirationDate": "Needs Verification",
    })

TARGET.write_text(json.dumps(controls, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"written": len(controls), "target": str(TARGET)}, ensure_ascii=False))
