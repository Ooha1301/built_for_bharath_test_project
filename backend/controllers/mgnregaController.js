export const getDistrictData = async (req, res) => {
  try {
    const { district } = req.params;
    // later: check cache or API
    const dummy = {
      summary: {
        total_persondays: 120450,
        households_completed: 3400,
        total_wages_paid: "₹5.2 Cr",
      },
      source: "mock",
    };
    res.json({ district, data: dummy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
