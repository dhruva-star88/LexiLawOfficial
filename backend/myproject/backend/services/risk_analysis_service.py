import json
from .text_extractor import extract_text
from .groq_client import generate_structured_analysis


def analyze_document(document):

    # 1️⃣ Extract text
    text = extract_text(document.file.path)

    # 2️⃣ Generate structured JSON using LLM
    structured_response = generate_structured_analysis(text)

    # Ensure valid JSON
    if isinstance(structured_response, str):
        structured_response = json.loads(structured_response)

    clauses = structured_response.get("clauses", [])

    # 3️⃣ Compute deterministic risk score
    risk_weights = {
        "LOW": 1,
        "MEDIUM": 2,
        "MEDIUM-HIGH": 3,
        "HIGH": 4
    }

    total = 0
    high_risk_count = 0

    for clause in clauses:
        level = clause.get("risk_level", "LOW").upper()
        weight = risk_weights.get(level, 1)
        total += weight

        if level == "HIGH":
            high_risk_count += 1

    if clauses:
        normalized_score = round((total / (len(clauses) * 4)) * 10, 1)
    else:
        normalized_score = 0.0

    # Determine overall risk
    if normalized_score >= 7:
        overall = "High"
    elif normalized_score >= 4:
        overall = "Medium"
    else:
        overall = "Low"

    return {
        "overall_risk": overall,
        "risk_score": normalized_score,
        "high_risk_items": high_risk_count,
        "clauses": clauses
    }