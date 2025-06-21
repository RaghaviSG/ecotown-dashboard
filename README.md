# 📊 Biomarker Time Series Dashboard

An interactive healthcare dashboard that extracts, visualizes, and interprets key *biomarkers* from health reports using AI-powered insights and clinical standards.

---

## 🔬 Project Objective

To build a web-based tool that:
- Extracts biomarker data from patient health reports (PDF)
- Displays interactive time series visualizations
- Provides real-time clinical interpretations & recommendations

---

## 🧠 Biomarkers Tracked

- Total Cholesterol  
- LDL  
- HDL  
- Triglycerides  
- Creatinine  
- Vitamin D  
- Vitamin B12  
- HbA1c  

All biomarkers are validated against clinical ranges based on healthcare standards.

---

## 🛠️ Tech Stack

| Layer         | Technology Used               |
|---------------|-------------------------------|
| Data Parsing  | Python + pdfplumber           |
| Visualization | JavaScript + Plotly.js        |
| UI Styling    | HTML + CSS                    |
| Hosting       | GitHub Pages                  |
| Insights      | JS-based AI logic for summaries |

---

## ✨ Key Features

- ✅ Multi-series interactive time series chart
- ✅ Individual biomarker summary cards (Max, Min, Avg)
- ✅ AI-style clinical interpretations with suggestions
- ✅ Mobile-responsive layout
- ✅ Date range selector: all, last 3, latest
- ✅ Easy data management via biomarker_data.json

---

## 📂 Folder Structure


📁 ecotown-dashboard/
├── 📁 dashboard/
│   ├── index.html            # Main dashboard layout
│   ├── style.css             # Dashboard styling
│   ├── script.js             # Chart logic + AI insights
│   └── biomarker_data.json   # Extracted biomarker values
│
├── 📁 data/
│   ├── report_1.pdf
│   ├── report_2.pdf
│   ├── report_3.pdf
│   └── report_4.pdf
│
├── 📁 extracted/
│   └── (JSON/CSV output files if any)
│
├── 📁 scripts/
│   └── extract_data.py       # Python script for PDF parsing
│
├── 📁 venv/                   # Python virtual environment (optional)


---

## 🚀 Run Locally

1. *Clone the repo*
bash
git clone https://github.com/yourusername/biomarker-dashboard.git


2. *Open the dashboard*
   - Open dashboard/index.html in your browser

3. *To update data*
   - Add new PDFs in /data/
   - Run extract_data.py to regenerate biomarker_data.json

---

## 📖 Clinical Interpretation Guide

| Biomarker       | Normal Range     |
|-----------------|------------------|
| LDL             | < 100 mg/dL      |
| HDL             | 40–60 mg/dL      |
| Triglycerides   | < 150 mg/dL      |
| Creatinine      | 0.6–1.3 mg/dL    |
| Vitamin D       | 20–50 ng/mL      |
| Vitamin B12     | 200–900 pg/mL    |
| HbA1c           | 4–5.6%           |

If a value is abnormal, the dashboard will:
- Highlight it as *Low* or *High*
- Show trend direction
- Suggest AI-style clinical recommendations

---

## 🌐 Live Demo

📍 [https://yourusername.github.io/biomarker-dashboard](https://yourusername.github.io/biomarker-dashboard)

Replace the above link with your real GitHub Pages URL

---

## 📹 Demo Video (Optional)

> Upload a 5-minute walkthrough to YouTube or Loom and link it here.

---

## 🔮 Future Enhancements

- [ ] Export summary as PDF  
- [ ] Upload PDF directly from dashboard  
- [ ] Patient login system  
- [ ] FHIR / EHR integration  

---

## 👨‍⚕️ Use Cases

- Doctors tracking chronic patient biomarkers  
- Labs automating report data  
- Startups building health MVPs  
- Healthcare-focused internship projects ✅

---

## 📜 License

MIT License — Free to use, modify, and distribute.

---

Built with dedication to secure an internship in the healthcare AI field.