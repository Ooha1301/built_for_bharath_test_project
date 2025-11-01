import React, { useState } from "react";

export default function SearchBar({ onSearch, onDetectLocation }) {
  const [value, setValue] = useState("");

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const resp = await fetch(
          `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/geocode?lat=${latitude}&lng=${longitude}`
        );
        const json = await resp.json();
        const name = json.district || json.name;
        if (name) onDetectLocation(name);
        else alert("Could not determine your district.");
      },
      () => alert("Failed to get location."),
      { timeout: 8000 }
    );
  };

  return (
    <div className="searchbar">
      <input
        placeholder="Enter district name (e.g., Nalgonda)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input"
        onKeyDown={(e) => e.key === "Enter" && onSearch(value.trim())}
      />
      <div className="buttons">
        <button className="btn primary" onClick={() => onSearch(value.trim())}>
          Search
        </button>
        <button className="btn" onClick={detectLocation}>
          Detect my location
        </button>
      </div>
    </div>
  );
}
