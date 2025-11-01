// import React, { useEffect, useState } from "react";
// import SearchBar from "./components/SearchBar";
// import LocationResult from "./components/LocationResult";
// import RootsSection from "./components/RootsSection";
// import API from "./services/api";

// export default function App() {
//   const [district, setDistrict] = useState("");
//   const [data, setData] = useState(null);
//   const [language, setLanguage] = useState("en");

//   // 🌐 Auto-detect location & language
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const resp = await fetch(
//             `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/geocode?lat=${latitude}&lng=${longitude}`
//           );
//           const json = await resp.json();
//           if (json?.district) {
//             setDistrict(json.district);
//             detectLanguage(json.state || json.country);
//             fetchData(json.district);
//           }
//         } catch (err) {
//           console.error("Geolocation failed:", err);
//         }
//       });
//     }
//   }, []);

//   // 🌍 Simple language detection
//   const detectLanguage = (region) => {
//     const langMap = {
//       "Andhra Pradesh": "te", // Telugu
//       Karnataka: "kn", // Kannada
//       Tamilnadu: "ta",
//       Kerala: "ml",
//       "West Bengal": "bn",
//       default: "en",
//     };
//     setLanguage(langMap[region] || langMap.default);
//   };

//   // 🔍 Search or detected district data fetch
//   const fetchData = async (districtName) => {
//     if (!districtName) return;
//     try {
//       const res = await API.get(`/data?district=${districtName}`);
//       setData(res.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   return (
//     <div className="page">
//       <header className="header">
//         <div className="brand">
//           <h1>MGNREGA Dashboard</h1>
//           <p className="subtitle">
//             Empowering rural India — language: {language.toUpperCase()}
//           </p>
//         </div>
//       </header>

//       <main className="container">
//         <SearchBar
//           onSearch={(name) => {
//             setDistrict(name);
//             fetchData(name);
//           }}
//           onDetectLocation={(name) => {
//             setDistrict(name);
//             fetchData(name);
//           }}
//         />

//         {data ? (
//           <LocationResult district={district} response={data} />
//         ) : (
//           <p className="loading">Please search or allow location access...</p>
//         )}

//         <RootsSection district={district} />
//       </main>

//       <footer className="footer">
//         &copy; {new Date().getFullYear()} MGNREGA Dashboard — District Insights
//       </footer>
//     </div>
//   );
// }
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
