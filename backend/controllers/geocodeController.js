import fetch from "node-fetch";

export const reverseGeocode = async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng)
    return res.status(400).json({ error: "Latitude and longitude required" });

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    const district =
      data.address?.county ||
      data.address?.state_district ||
      data.address?.state ||
      "Unknown";

    res.json({ district });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Reverse geocoding failed" });
  }
};
