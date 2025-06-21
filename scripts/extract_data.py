import pdfplumber
import os
import re
import json

# Improved biomarker regex patterns
BIOMARKERS = {
    "Total Cholesterol": r"(?i)total\s*cholesterol\s*[:\s]*([\d.]+)",
    "LDL": r"(?i)ldl\s*(cholesterol)?\s*[:\s]*([\d.]+)",
    "HDL": r"(?i)hdl\s*(cholesterol)?\s*[:\s]*([\d.]+)",
    "Triglycerides": r"(?i)triglycerides?\s*[:\s]*([\d.]+)",
    "Creatinine": r"(?i)creatinine\s*[:\s]*([\d.]+)",
    "Vitamin D": r"(?i)vitamin\s*d\s*[:\s]*([\d.]+)",
    "Vitamin B12": r"(?i)vitamin\s*b\s*12\s*[:\s]*([\d.]+)",
    "HbA1c": r"(?i)(hba1c|glycohemoglobin)\s*[:\s]*([\d.]+)"
}

def extract_biomarkers(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = "\n".join(page.extract_text() for page in pdf.pages if page.extract_text())

    print(f"\n📄 Extracting from: {pdf_path}")
    print("="*60)
    print(text[:1000])  # Show only first 1000 characters for readability
    print("="*60)

    result = {
        "file": os.path.basename(pdf_path),
        "date": None,  # Add logic if date available in reports
        "biomarkers": {}
    }

    for name, pattern in BIOMARKERS.items():
        match = re.search(pattern, text)
        if match:
            value = match.group(1) if len(match.groups()) == 1 else match.group(2)
            try:
                value = float(value)
                result["biomarkers"][name] = value
            except (ValueError, TypeError):
                print(f"⚠️  Could not convert value '{value}' for {name} in {pdf_path}")

    return result

def process_all_pdfs(folder="data"):
    extracted = []
    for filename in os.listdir(folder):
        if filename.lower().endswith(".pdf"):
            full_path = os.path.join(folder, filename)
            data = extract_biomarkers(full_path)
            extracted.append(data)
    return extracted

if __name__ == "__main__":
    all_data = process_all_pdfs("data")
    output_path = "extracted/biomarker_data.json"
    with open(output_path, "w") as f:
        json.dump(all_data, f, indent=2)
    print(f"\n✅ Extracted data saved to {output_path}")
