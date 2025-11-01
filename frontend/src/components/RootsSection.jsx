import React, { useEffect, useState } from "react";

export default function RootsSection({ district }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!district)
      setText("Roots — select a district to learn its history.");
    else
      setText(
        `${district} has a long-standing history of rural development and community participation, contributing greatly to the MGNREGA mission.`
      );
  }, [district]);

  return (
    <section className="roots">
      <h3>Roots</h3>
      <p>{text}</p>
    </section>
  );
}
