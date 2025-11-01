import React from "react";

export default function LocationResult({ district, response }) {
  const payload = response.data || response;
  const summary = payload.summary || payload;

  return (
    <section className="result-card">
      <h2>{district || "District"} — Performance</h2>

      <div className="grid">
        <div className="stat">
          <div className="label">Total person-days</div>
          <div className="value">
            {summary.total_persondays || "—"}
          </div>
        </div>
        <div className="stat">
          <div className="label">Households completed</div>
          <div className="value">{summary.households_completed || "—"}</div>
        </div>
        <div className="stat">
          <div className="label">Wages paid</div>
          <div className="value">{summary.total_wages_paid || "—"}</div>
        </div>
      </div>

      <div className="note">
        <small>Data source: data.gov.in</small>
      </div>
    </section>
  );
}
