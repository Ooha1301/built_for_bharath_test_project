import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [district, setDistrict] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Detect user's location automatically
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {

            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            

            const locationData = await res.json();
            const detectedDistrict =
              locationData.city ||
              locationData.locality ||
              locationData.principalSubdivision ||
              "Unknown";

            setDistrict(detectedDistrict);
            fetchData(detectedDistrict);
          } catch (error) {
            console.error("Error detecting location:", error);
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoading(false);
        }
      );
      // console.log("Fetched data:", result);
    } else {
      console.warn("Geolocation not supported by this browser.");
      setLoading(false);
    }
  }, []);

  // ✅ Fetch data from backend
  const fetchData = async (districtName) => {
    try {
      setLoading(true);
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const res = await fetch(`${API_BASE_URL}/api/mgnrega/${district}`);

      const result = await res.json();
console.log("Fetched data:", result);

if (result?.data?.summary) {
  setData({
    person_days: result.data.summary.total_persondays,
    households_completed: result.data.summary.households_completed,
    wages_paid: result.data.summary.total_wages_paid,
  });
} else {
  setData(null);
}

    } catch (error) {
      console.error("Error fetching MGNREGA data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Manual search
  const handleSearch = (e) => {
    e.preventDefault();
    if (district.trim()) fetchData(district);
  };

  return (
    <div
      className="dashboard-container"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {/* Header */}
      <h1 style={{ color: "#065f46", fontSize: "32px", marginBottom: "8px" }}>
        MGNREGA Dashboard
      </h1>
      <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "30px" }}>
        Empowering rural India — location:{" "}
        <strong>{district || "Detecting..."}</strong>
      </p>

      {/* Search Section */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          placeholder="Enter district name"
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "250px",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#065f46",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Search
        </button>
      </form>

      {/* Data Section */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          padding: "25px",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {loading ? (
          <p style={{ color: "#6b7280" }}>Detecting location and fetching data...</p>
        ) : data ? (
          <>
            <h2 style={{ color: "#065f46", marginBottom: "20px" }}>
              {district} — Performance
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div style={{ flex: "1 1 150px" }}>
                <h4 style={{ color: "#374151", marginBottom: "6px" }}>
                  Total person-days
                </h4>
                <p style={{ fontWeight: "bold", color: "#111827" }}>
                  {data.person_days || "—"}
                </p>
              </div>
              <div style={{ flex: "1 1 150px" }}>
                <h4 style={{ color: "#374151", marginBottom: "6px" }}>
                  Households completed
                </h4>
                <p style={{ fontWeight: "bold", color: "#111827" }}>
                  {data.households_completed || "—"}
                </p>
              </div>
              <div style={{ flex: "1 1 150px" }}>
                <h4 style={{ color: "#374151", marginBottom: "6px" }}>
                  Wages paid
                </h4>
                <p style={{ fontWeight: "bold", color: "#111827" }}>
                  {data.wages_paid || "—"}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p style={{ color: "#6b7280" }}>No data found for this district.</p>
        )}
      </div>

      {/* Root Section */}
      <footer
        style={{
          marginTop: "40px",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "20px",
          textAlign: "center",
          maxWidth: "700px",
        }}
      >
        <h3 style={{ color: "#065f46", marginBottom: "8px" }}>Roots</h3>
        <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
          {district
            ? `${district} has a long-standing history of rural development and community participation, contributing greatly to the MGNREGA mission.`
            : "Detecting your district’s history..."}
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
