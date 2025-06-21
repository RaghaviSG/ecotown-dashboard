const clinicalRanges = {
  "Total Cholesterol": [125, 200],
  "LDL": [0, 100],
  "HDL": [40, 60],
  "Triglycerides": [0, 150],
  "Creatinine": [0.6, 1.3],
  "Vitamin D": [20, 50],
  "Vitamin B12": [200, 900],
  "HbA1c": [4, 5.6]
};

let allData = [];
let allBiomarkers = [];

fetch("biomarker_data.json")
  .then(res => res.json())
  .then(data => {
    allData = data;
    allBiomarkers = Object.keys(data[0].biomarkers || {});

    drawChart("all");
    updateCards("all");
    showInterpretation("all");

    document.getElementById("dateRange").addEventListener("change", e => {
      drawChart(e.target.value);
      updateCards(e.target.value);
      showInterpretation(e.target.value);
    });
  });

function filterData(range) {
  if (range === "last") return [allData[allData.length - 1]];
  if (range === "recent") return allData.slice(-3);
  return allData;
}

function drawChart(range) {
  const dataSet = filterData(range);
  const x = dataSet.map((_, i) => `Report ${i + 1}`);
  const palette = ["#0d6efd", "#198754", "#dc3545", "#6f42c1", "#20c997", "#fd7e14", "#0dcaf0", "#ffc107"];

  const traces = allBiomarkers.map((biomarker, i) => ({
    x,
    y: dataSet.map(r => r.biomarkers[biomarker] ?? null),
    name: biomarker,
    mode: "lines+markers",
    type: "scatter",
    line: {
      shape: "spline",
      color: palette[i % palette.length],
      width: 3
    },
    marker: {
      size: 6,
      symbol: "circle",
      color: palette[i % palette.length]
    },
    hovertemplate: `<b>${biomarker}</b><br>%{x}: %{y}<extra></extra>`
  }));

  const layout = {
    title: "Biomarker Time Series (Interactive View)",
    xaxis: { title: "Reports", tickfont: { size: 12 } },
    yaxis: { title: "Biomarker Value", tickfont: { size: 12 } },
    hovermode: "closest",
    plot_bgcolor: "#ffffff",
    paper_bgcolor: "#ffffff",
    legend: { orientation: "h", x: 0, y: -0.2 },
    margin: { t: 60, b: 60 }
  };

  Plotly.newPlot("chartContainer", traces, layout, { responsive: true });
}

function updateCards(range) {
  const dataSet = filterData(range);
  const container = document.getElementById("biomarkerCards");
  container.innerHTML = "";

  allBiomarkers.forEach(biomarker => {
    const values = dataSet.map(d => d.biomarkers[biomarker]).filter(v => v != null);
    if (values.length > 0) {
      const max = Math.max(...values);
      const min = Math.min(...values);
      const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

      const card = document.createElement("div");
      card.className = "biomarker-card";
      card.innerHTML = `
        <strong>${biomarker}</strong><br>
        Max: ${max} | Min: ${min} | Avg: ${avg}
      `;
      container.appendChild(card);
    }
  });
}

function showInterpretation(range) {
  const dataSet = filterData(range);
  const summary = document.getElementById("clinicalSummary");

  const insights = [];

  const recommendations = {
    "Total Cholesterol": "Consider reducing saturated fat and increasing physical activity.",
    "LDL": "Consider dietary changes, physical exercise, or lipid-lowering therapy.",
    "HDL": "Maintain regular exercise and healthy fats intake.",
    "Triglycerides": "Reduce sugar and refined carbs, consider omega-3 intake.",
    "Creatinine": "Evaluate kidney function, monitor hydration and blood pressure.",
    "Vitamin D": "Consider supplements and 15–30 min daily sunlight exposure.",
    "Vitamin B12": "Consider oral supplementation or B12-rich foods like meat and eggs.",
    "HbA1c": "Monitor glucose, maintain low-carb diet, and increase physical activity."
  };

  allBiomarkers.forEach(biomarker => {
    const vals = dataSet.map(r => r.biomarkers[biomarker]).filter(v => v != null);
    if (vals.length === 0) return;

    const first = vals[0];
    const last = vals.at(-1);
    const diff = last - first;
    const changePercent = ((diff / first) * 100).toFixed(1);
    const [low, high] = clinicalRanges[biomarker] || [null, null];

    let status = "Normal";
    if (low != null && high != null) {
      if (last < low) status = "Low";
      else if (last > high) status = "High";
    }

    let insight = `<strong>${biomarker}</strong>: `;
    if (Math.abs(changePercent) >= 5) {
      const trend = diff > 0 ? "increased" : "decreased";
      insight += `${trend} by ${Math.abs(changePercent)}% since first report. `;
    }

    insight += `Currently <strong>${status}</strong> at ${last}. `;

    if (status !== "Normal" && recommendations[biomarker]) {
      insight += `<em>Recommendation:</em> ${recommendations[biomarker]}`;
    }

    insights.push(`<li>${insight}</li>`);
  });

  summary.innerHTML = insights.length
    ? `<ul>${insights.join("")}</ul>`
    : "No significant biomarker trends or abnormalities detected.";
}
